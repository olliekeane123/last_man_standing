"use server"

import { CreateGameFormData } from "../types/game"
import {
    createGameService,
    getAllGamesByUserService,
    getUserGameByIdService,
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
        console.error("Failed to fetch game by ID:", error)
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to fetch game by ID",
        }
    }
}
