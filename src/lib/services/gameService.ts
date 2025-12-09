import prisma from "@/lib/prisma"
import { generateInviteToken } from "../utils/generateInviteToken"
import generateTokenExpiryDate from "../utils/generateTokenExpiryDate"
import { Prisma } from "@prisma/client"

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

export async function getOrCreateValidGameInviteService(
    gameId: string,
    userId: string
) {
    const existingInvite = await prisma.gameInvite.findUnique({
        where: { userId_gameId: { userId, gameId } },
    })

    const now = new Date()

    if (existingInvite) {
        if (existingInvite.expiresAt < now) {
            await prisma.gameInvite.delete({
                where: { id: existingInvite.id },
            })
        } else {
            return existingInvite
        }
    }

    const newToken = generateInviteToken()
    const newExpiresAt = generateTokenExpiryDate()

    const newGameInvite = await prisma.gameInvite.create({
        data: {
            userId,
            gameId,
            token: newToken,
            expiresAt: newExpiresAt,
        },
    })

    return newGameInvite
}

export async function enrollUserInGameService(userId: string, gameId: string) {
    try {
        const userGame = await prisma.userGame.upsert({
            where: { userId_gameId: { userId, gameId } },
            update: {},
            create: { userId, gameId },
        })

        return userGame
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2003"
        ) {
            // This happens if the userId or gameId doesn't exist.
            // Since the userId should be valid (from auth), we assume it's the gameId.
            console.error(
                `Foreign Key Violation: Game or User ID is invalid. Game ID: ${gameId}`
            )
            return null
        }
        throw error
    }
}

export async function getGameInviteByTokenService(token: string) {
    const gameInvite = await prisma.gameInvite.findUnique({ where: { token } })
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
