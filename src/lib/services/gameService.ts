import prisma from "@/lib/prisma"

export async function createGameService(title: string, adminId: string) {
    const newGame = await prisma.game.create({
        data: {
            title,
            adminId,
        },
    })

    return newGame
}
