"use server"

import { auth } from "@clerk/nextjs/server"
import { CreateGameFormData } from "../types/game"
import { getUserByClerkId } from "@/lib/utils/userClerk"
import {
    createGameService,
    getAllGamesByUserService,
} from "../services/gameService"
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context"

export async function createGameAction({ title }: CreateGameFormData) {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw new Error("Unable to retrieve user from clerk")
        }
        const { user } = await getUserByClerkId(userId)
        if (!user) {
            throw new Error("Unable to retrieve user from database")
        }

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
        const { userId } = await auth()

        if (!userId) {
            throw new Error("Unable to retrieve user from clerk")
        }
        const { user } = await getUserByClerkId(userId)
        if (!user) {
            throw new Error("Unable to retrieve user from database")
        }

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
