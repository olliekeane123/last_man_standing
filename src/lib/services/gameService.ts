import prisma from "@/lib/prisma"

export async function createGameService(title: string, adminId: string) {
    const newGameAndUserGame = await prisma.$transaction(async (tx) => {
        const newGame = await tx.game.create({
            data: {
                title,
                adminId,
            },
        })

        const newUserGame = await tx.userGame.create({
            data: {
                userId: adminId,
                gameId: newGame.id,
            },
        })

        return { newGame, newUserGame }
    })

    return newGameAndUserGame.newGame
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

    const games = userGames.map((userGame) => userGame.game)

    return games
}

export async function getUserGameByIdService(gameId: string, userId: string) {
    const userGame = await prisma.userGame.findUnique({
        where: {
            userId_gameId: {
                userId,
                gameId,
            },
        },
        include: {
            game: true,
        },
    })

    return userGame
}
