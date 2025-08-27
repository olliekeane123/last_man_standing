"use server"

import { auth } from "@clerk/nextjs/server"
import { CreateGameFormData } from "../types/game"
import { getUserByClerkId } from "./user"
import { createGameService } from "../services/gameService"

export async function createGame({ title }: CreateGameFormData) {
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
