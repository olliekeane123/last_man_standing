import {
    FootballFixture,
    FootballFixturesResponseSchema,
} from "@/lib/types/schemas/footballApiSchemas"
import { getEnv } from "@/lib/env"
import { COMPETITIONS } from "@/lib/competitions"
import { footballDataRequest } from "@/lib/external-api/footballData/client"


// NOT IN USE (USING FETCH BY COMPETITION BELOW)
export default async function fetchAllFixtures(): Promise<FootballFixture[]> {
    const env = getEnv()
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

export async function fetchFixturesForCompetition(
    competitionCode: number
): Promise<FootballFixture[]> {
    const data = await footballDataRequest(
        `competitions/${competitionCode}/matches`
    )
    const parsed = FootballFixturesResponseSchema.safeParse(data)
    if (!parsed.success) {
        console.error("Validation errors:", parsed.error)
        throw new Error("Invalid API response structure")
    }
    return parsed.data.matches
}
