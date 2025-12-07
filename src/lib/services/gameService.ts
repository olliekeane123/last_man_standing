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

export async function getGameByIdService(gameId: string) {
    const game = await prisma.game.findUnique({
        where: { id: gameId },
    })
    return game
}

export async function createGameInviteService(
    gameId: string,
    userId: string,
    token: string,
    expiresAt: Date
) {
    const gameInvite = await prisma.gameInvite.create({
        data: { token, userId, gameId, expiresAt },
    })

    return gameInvite
}

export async function getActiveGameWeekWithFixturesService(now: Date) {
    const gameWeek = await prisma.gameweek.findFirst({
        where: { deadline: { gt: now } },
        orderBy: { deadline: "asc" },
        include: { fixtures: { include: { homeTeam: true, awayTeam: true } } },
    })

    return gameWeek
}
