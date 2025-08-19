import { env } from "@/lib/env"
import { COMPETITIONS } from "@/lib/competitions"
import {
    FootballTeam,
    FootballTeamsResponseSchema,
} from "@/lib/schemas/footballApiSchemas"

export default async function fetchTeams(): Promise<
    (FootballTeam & { compId: number })[]
> {
    try {
        const teamPromises = COMPETITIONS.map(async ({ id }) => {
            const response = await fetch(
                `https://api.football-data.org/v4/competitions/${id}/teams`,
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
            const parsed = FootballTeamsResponseSchema.safeParse(rawData)

            if (!parsed.success) {
                console.error("Validation errors:", parsed.error)
                throw new Error("Invalid API response structure")
            }

            const teamsWithComps = parsed.data.teams.map((team) => {
                return {
                    ...team,
                    compId: id,
                }
            })

            return teamsWithComps
        })

        const allTeams = await Promise.all(teamPromises)
        const allTeamsFlattened = allTeams.flat()

        return allTeamsFlattened
    } catch (error) {
        console.error("Failed to fetch teams:", error)
        throw error
    }
}
