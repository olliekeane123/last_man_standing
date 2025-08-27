import { fetchTeamsForCompetition } from "../external-api/footballData/teams"
import prisma from "../prisma"
import { FootballTeam } from "../types/schemas/footballApiSchemas"

export async function seedAllTeams() {
    const competitions = await prisma.competition.findMany()

    for (const competition of competitions) {
        try {
            console.log(
                `Seeding teams for competition: ${competition.name} (${competition.apiId})`
            )
            await syncAllTeamsForCompetition(competition.apiId)
        } catch (error) {
            console.error(
                `Failed to seed teams for competition ${competition.name} (${competition.apiId}):`,
                error
            )
        }
    }
}

export async function syncAllTeamsForCompetition(
    competitionCode: number
): Promise<FootballTeam[]> {
    try {
        const teams = await fetchTeamsForCompetition(competitionCode)

        await prisma.$transaction(
            teams.map((team) =>
                prisma.team.upsert({
                    where: { apiId: team.id },
                    update: {
                        name: team.name,
                        shortName: team.shortName,
                        tla: team.tla,
                        crest: team.crest,
                        competitions: {
                            connect: {
                                apiId: team.compId,
                            },
                        },
                    },
                    create: {
                        apiId: team.id,
                        name: team.name,
                        shortName: team.shortName,
                        tla: team.tla,
                        crest: team.crest,
                    },
                })
            )
        )
        return teams
    } catch (error) {
        console.error("Failed to store teams for competition:", error)
        throw error
    }
}
