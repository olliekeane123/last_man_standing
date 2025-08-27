"use server"

import { auth } from "@clerk/nextjs/server"
import { CreateGameFormData } from "../types/game"
import { getUserByClerkId } from "./user"
import { createGameService } from "../services/gameService"

export async function createGame({ title }: CreateGameFormData) {
    try {
        const { userId } = await auth()
        if (userId) {
            const { user } = await getUserByClerkId(userId)
            if (user) {
                return await createGameService(title, user.id)
            } else {
                throw new Error("Unable to retrieve user from database")
            }
        } else {
            throw new Error("Unable to retrieve user from clerk")
        }
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to create game",
        }
    }
}
