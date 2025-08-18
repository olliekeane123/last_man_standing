import {
    FootballFixture,
    FootballFixturesResponseSchema,
} from "@/lib/schemas/footballApiSchemas"
import { env } from "@/lib/env"
import { COMPETITIONS } from "@/lib/competitions"

export default async function fetchFixtures(): Promise<FootballFixture[]> {
    try {
        const fixturePromises = COMPETITIONS.map(async ({ code }) => {
            const response = await fetch(
                `https://api.football-data.org/v4/competitions/${code}/matches`,
                {
                    headers: {
                        "X-Auth-Token": env.FOOTBALL_DATA_ORG_API_KEY,
                    },
                }
            )

            if (!response.ok) {
                throw new Error(
                    `API request failed with status ${response.status}`
                )
            }

            const rawData = await response.json()
            const parsed = FootballFixturesResponseSchema.safeParse(rawData)

            if (!parsed.success) {
                console.error("Validation errors:", parsed.error)
                throw new Error("Invalid API response structure")
            }

            return parsed.data.matches
        })

        const allFixtures = await Promise.all(fixturePromises)
        const allFixturesFlattened = allFixtures.flat()

        return allFixturesFlattened
    } catch (error) {
        console.error("Failed to fetch fixtures:", error)
        throw error
    }
}
