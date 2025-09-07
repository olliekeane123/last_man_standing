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

export async function getAllGamesByUserService(userId: string) {
    const userGames = await prisma.userGame.findMany({
        where: {
            userId,
        },
        include: {
            game: true,
        },
    })

    const games = userGames.map(userGame => userGame.game)

    return games
}
