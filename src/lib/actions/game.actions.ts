"use server"

import {
    CreateGameFormData,
    GameActionResponse,
    GameInviteActionResponse,
    UserGameActionResponse,
} from "../types/game"
import {
    createGameService,
    getActiveGameWeekWithFixturesService,
    getAllGamesByUserService,
    getGameByIdService,
    getUserGameByIdService,
    getOrCreateValidGameInviteService,
    getGameInviteByTokenService,
    enrollUserInGameService,
} from "../services/gameService"
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context"
import { getAuthenticatedUser } from "./user.actions"
import { ActionResponse } from "../types/action"
import { Prisma } from "@prisma/client"

export async function createGameAction({
    title,
}: CreateGameFormData): Promise<ActionResponse<GameActionResponse>> {
    try {
        const user = await getAuthenticatedUser()

        const game = await createGameService(title, user.id)
        return {
            success: true,
            data: game,
        }
    } catch (error) {
        console.error("Failed to create game:", error)
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to create game",
        }
    }
}

export async function getAllGamesByUserAction(): Promise<
    ActionResponse<GameActionResponse[]>
> {
    try {
        const user = await getAuthenticatedUser()

        const games = await getAllGamesByUserService(user.id)
        return {
            success: true,
            data: games,
        }
    } catch (error) {
        if (isDynamicServerError(error)) {
            throw error
        } // THROWS ERROR WHICH ALLOWS NEXTJS TO KNOW PAGE IS DYNAMIC
        console.error("Failed to fetch user's games:", error)
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to fetch user's games",
        }
    }
}

export async function getUserGameByIdAction(
    gameId: string
): Promise<ActionResponse<UserGameActionResponse>> {
    try {
        const user = await getAuthenticatedUser()

        const userGame = await getUserGameByIdService(gameId, user.id)

        if (!userGame) throw new Error("User Game not found")

        return {
            success: true,
            data: userGame,
        }
    } catch (error) {
        console.error("Failed to fetch User Game by ID:", error)
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to fetch User Game by ID",
        }
    }
}

export async function getGameByIdAction(
    gameId: string
): Promise<ActionResponse<GameActionResponse>> {
    try {
        const game = await getGameByIdService(gameId)

        if (!game) throw new Error("Game not found")

        return {
            success: true,
            data: game,
        }
    } catch (error) {
        console.error("Failed to fetch Game by ID:", error)
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to fetch Game by ID",
        }
    }
}

export async function getOrCreateValidGameInviteAction(
    gameId: string
): Promise<ActionResponse<GameInviteActionResponse>> {
    try {
        const user = await getAuthenticatedUser()

        const gameInvite = await getOrCreateValidGameInviteService(
            gameId,
            user.id
        )
        return {
            success: true,
            data: gameInvite,
        }
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to fetch/create Game Invite",
        }
    }
}

export async function verifyGameInviteTokenAction(
    token: string
): Promise<GameInviteActionResponse> {
    try {
        const gameInvite = await getGameInviteByTokenService(token)
        if (!gameInvite) throw new Error("Unable to find token in database")

        return gameInvite
    } catch (error) {
        throw error
    }
}

export async function enrollUserInGameAction(userId: string, gameId: string) {
    try {
        const userGame = await enrollUserInGameService(userId, gameId)
        if (userGame === null) {
            throw new Error(
                "Invalid Game ID or User ID provided for enrollment."
            )
        }
        return userGame
    } catch (error) {
        console.error("Enrollment failed due to unexpected error:", error)
        throw new Error("Failed to enroll user in game due to a server error.")
    }
}

export async function getActiveGameWeekWithFixturesAction() {
    try {
        const now = new Date()
        const gameWeek = await getActiveGameWeekWithFixturesService(now)

        if (!gameWeek) throw new Error("Unable to find Game Week")

        return {
            success: true,
            data: gameWeek,
        }
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to fetch active Gameweek",
        }
    }
}
