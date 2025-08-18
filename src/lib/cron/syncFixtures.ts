import fetchFixtures from "@/lib/api/fetchFixtures"
import prisma from "@/lib/prisma"
import { FootballFixture } from "@/lib/schemas/footballApiSchemas"

export async function syncFixtures(): Promise<FootballFixture[]> {
    try {
        const allFixtures = await fetchFixtures()

        const batchSize = 50
        for (let i = 0; i < allFixtures.length; i += batchSize) {
            const batch = allFixtures.slice(i, i + batchSize)
            console.log(
                `Processing batch ${i / batchSize + 1} of ${Math.ceil(
                    allFixtures.length / batchSize
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

        return allFixtures
    } catch (error) {
        console.error("Failed to store fixtures:", error)
        throw error
    }
}
