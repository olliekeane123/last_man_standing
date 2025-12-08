"use server"

import { CreateGameFormData } from "../types/game"
import {
    createGameService,
    getActiveGameWeekWithFixturesService,
    getAllGamesByUserService,
    getGameByIdService,
    getUserGameByIdService,
    getOrCreateValidGameInviteService,
} from "../services/gameService"
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context"
import { getAuthenticatedUser } from "./user.actions"

export async function createGameAction({ title }: CreateGameFormData) {
    try {
        const user = await getAuthenticatedUser()

        const game = await createGameService(title, user.id)
        return {
            success: true,
            game,
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

export async function getAllGamesByUserAction() {
    try {
        const user = await getAuthenticatedUser()

        const games = await getAllGamesByUserService(user.id)
        return {
            success: true,
            games,
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

export async function getUserGameByIdAction(gameId: string) {
    try {
        const user = await getAuthenticatedUser()

        const userGame = await getUserGameByIdService(gameId, user.id)

        return {
            success: true,
            userGame,
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

export async function getGameByIdAction(gameId: string) {
    try {
        const game = await getGameByIdService(gameId)

        return {
            success: true,
            game,
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

export async function getOrCreateValidGameInviteAction(gameId: string) {
    try {
        const user = await getAuthenticatedUser()

        const gameInvite = await getOrCreateValidGameInviteService(
            gameId,
            user.id
        )
        return {
            success: true,
            gameInvite,
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

export async function getActiveGameWeekWithFixturesAction() {
    try {
        const now = new Date()
        const gameWeek = await getActiveGameWeekWithFixturesService(now)

        return {
            success: true,
            gameWeek,
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
