import { COMPETITIONS } from "@/lib/competitions"
import prisma from "@/lib/prisma"

export async function seedCompetitions() {
    try {
        await Promise.all(
            COMPETITIONS.map(({ id, ...comp }) =>
                prisma.competition.upsert({
                    where: { apiId: id },
                    update: { apiId: id, ...comp },
                    create: { apiId: id, ...comp },
                })
            )
        )
    } catch (error) {
        console.error("Unable to seed competitions: " + error)
    }
}
