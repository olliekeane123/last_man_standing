"use server"

import { auth } from "@clerk/nextjs/server"
import { getUserByClerkId } from "../utils/userClerk"

export async function getAuthenticatedUser() {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw new Error("Unable to retrieve user from clerk")
        }
        const { user } = await getUserByClerkId(userId)
        if (!user) {
            throw new Error("Unable to retrieve user from database")
        }

        return user
    } catch (error) {
        throw error
    }
}
