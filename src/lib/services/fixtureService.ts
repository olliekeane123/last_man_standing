import prisma from "@/lib/prisma"
import { fetchFixturesForCompetition } from "@/lib/external-api/footballData/fixtures"
import { FootballFixture } from "@/lib/types/schemas/footballApiSchemas"

export async function syncAllFixtures() {
    const competitions = await prisma.competition.findMany()

    for (const competition of competitions) {
        try {
            console.log(
                `Seeding fixtures for competition: ${competition.name} (${competition.apiId})`
            )
            await syncAllFixturesForCompetition(competition.apiId)
        } catch (error) {
            console.error(
                `Failed to seed fixtures for competition ${competition.name} (${competition.apiId}):`,
                error
            )
        }
    }
}

export async function syncAllFixturesForCompetition(
    competitionCode: number
): Promise<FootballFixture[]> {
    try {
        const externalFixtures = await fetchFixturesForCompetition(
            competitionCode
        )

        const batchSize = 50
        for (let i = 0; i < externalFixtures.length; i += batchSize) {
            const batch = externalFixtures.slice(i, i + batchSize)
            console.log(
                `Processing batch ${i / batchSize + 1} of ${Math.ceil(
                    externalFixtures.length / batchSize
                )}`
            )
            await prisma.$transaction(
                batch.map((fixture) =>
                    prisma.fixture.upsert({
                        where: { apiId: fixture.id },
                        update: {
                            status: fixture.status,
                            matchday: fixture.matchday,
                            utcDate: new Date(fixture.utcDate),
                            score: fixture.score,
                            apiLastUpdated: new Date(fixture.lastUpdated),
                        },
                        create: {
                            apiId: fixture.id,
                            Competition: {
                                connect: { apiId: fixture.competition.id },
                            },
                            homeTeam: {
                                connect: { apiId: fixture.homeTeam.id },
                            },
                            awayTeam: {
                                connect: { apiId: fixture.awayTeam.id },
                            },
                            utcDate: new Date(fixture.utcDate),
                            status: fixture.status,
                            matchday: fixture.matchday,
                            score: fixture.score,
                            apiLastUpdated: new Date(fixture.lastUpdated),
                        },
                    })
                )
            )
        }

        return externalFixtures
    } catch (error) {
        console.error("Failed to store fixtures:", error)
        throw error
    }
}
