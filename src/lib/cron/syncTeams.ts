import fetchTeams from "@/lib/api/fetchTeams"
import prisma from "@/lib/prisma"
import { FootballTeam } from "@/lib/schemas/footballApiSchemas"

export async function syncTeams(): Promise<FootballTeam[]> {
    try {
        const allTeams = await fetchTeams()

        await prisma.$transaction(
            allTeams.map((team) =>
                prisma.team.upsert({
                    where: { apiId: team.id },
                    update: {
                        name: team.name,
                        shortName: team.shortName,
                        tla: team.tla,
                        crest: team.crest,
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
    return allTeams
    } catch (error) {
        console.error("Failed to store teams: " + error)
        throw error
    }
}
