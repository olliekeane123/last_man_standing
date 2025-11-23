import prisma from "@/lib/prisma"
import { fetchFixturesForCompetition } from "@/lib/external-api/footballData/fixtures"
import { FootballFixture } from "@/lib/types/schemas/footballApiSchemas"
import { Prisma } from "@prisma/client"
import { FixtureTableData, SyncFixtureOptions } from "../types/fixture"

export async function syncAllFixturesService(
    options: SyncFixtureOptions = { syncGameweek: false }
) {
    const { syncGameweek } = options

    const competitions = await prisma.competition.findMany()

    for (const competition of competitions) {
        try {
            console.log(
                `Seeding fixtures for competition: ${competition.name} (${competition.apiId})`
            )
            await syncAllFixturesForCompetition(competition.apiId, syncGameweek)
        } catch (error) {
            console.error(
                `Failed to seed fixtures for competition ${competition.name} (${competition.apiId}):`,
                error
            )
        }
    }
}

// TODO: SEPARATE BATCH LOGIC FROM FETCH FIXTURES BY COMPETITION
async function syncAllFixturesForCompetition(
    competitionCode: number,
    syncGameweek: boolean
): Promise<FootballFixture[]> {
    try {
        const externalFixtures = await fetchFixturesForCompetition(
            competitionCode
        )
        console.log("Include Gameweek Sync:", syncGameweek)

        const batchSize = 10
        for (let i = 0; i < externalFixtures.length; i += batchSize) {
            const batch = externalFixtures.slice(i, i + batchSize)
            console.log(
                `Processing batch ${i / batchSize + 1} of ${Math.ceil(
                    externalFixtures.length / batchSize
                )}`
            )
            await prisma.$transaction(
                async (tx) => {
                    await Promise.all(
                        batch.map((fixture) =>
                            upsertFixture(fixture, tx, syncGameweek)
                        )
                    )
                },
                {
                    timeout: 20000,
                }
            )
        }

        return externalFixtures
    } catch (error) {
        console.error("Failed to store fixtures:", error)
        throw error
    }
}

async function upsertFixture(
    rawFixtureData: FootballFixture,
    tx: Prisma.TransactionClient,
    syncGameweek: boolean
): Promise<void> {
    try {
        let gameweek: { id: string } | null = null
        if (syncGameweek) {
            gameweek = await tx.gameweek.upsert({
                where: { gameweekNumber: rawFixtureData.matchday },
                update: {},
                create: {
                    gameweekNumber: rawFixtureData.matchday,
                    deadline: new Date().toISOString(),
                },
            })
        }

        await tx.fixture.upsert({
            where: { apiId: rawFixtureData.id },
            update: {
                status: rawFixtureData.status,
                matchday: rawFixtureData.matchday,
                utcDate: new Date(rawFixtureData.utcDate),
                score: rawFixtureData.score,
                ...(gameweek && { gameweek: { connect: { id: gameweek.id } } }),
                apiLastUpdated: new Date(rawFixtureData.lastUpdated),
            },
            create: {
                apiId: rawFixtureData.id,
                Competition: {
                    connect: { apiId: rawFixtureData.competition.id },
                },
                homeTeam: {
                    connect: { apiId: rawFixtureData.homeTeam.id },
                },
                awayTeam: {
                    connect: { apiId: rawFixtureData.awayTeam.id },
                },
                utcDate: new Date(rawFixtureData.utcDate),
                status: rawFixtureData.status,
                matchday: rawFixtureData.matchday,
                score: rawFixtureData.score,
                ...(gameweek && { gameweek: { connect: { id: gameweek.id } } }),
                apiLastUpdated: new Date(rawFixtureData.lastUpdated),
            },
        })
    } catch (error) {
        throw error
    }
}

export async function updateFixture({
    id,
    ...newData
}: Partial<FixtureTableData>) {
    const { gameweek } = newData

    let newGameweek: { id: string } | null = null

    if (typeof gameweek === "number") {
        newGameweek = await prisma.gameweek.upsert({
            where: { gameweekNumber: gameweek },
            update: {},
            create: {
                gameweekNumber: gameweek,
                deadline: new Date().toISOString(),
            },
        })
    }

    await prisma.fixture.update({
        where: { id },
        data: {
            // For now we just allow updates for status and gameweek
            ...(newData.status && { status: newData.status }),
            ...(newGameweek && {
                gameweek: { connect: { id: newGameweek.id } },
            }),
        },
    })
}
