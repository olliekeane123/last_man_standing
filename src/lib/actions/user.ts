import {
    getUserByClerkIdService,
    hardDeleteUserService,
    upsertUserService,
} from "../services/userService"
import { CreateUserData } from "../types/user"

export async function getUserByClerkId(clerkId: string) {
    try {
        const user = await getUserByClerkIdService(clerkId)

        return {
            success: true,
            user,
        }
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error ? error.message : "Failed to fetch user",
        }
    }
}

export async function upsertUserWithClerkData(userData: CreateUserData) {
    try {
        const user = await upsertUserService(userData)
        return {
            success: true,
            user,
        }
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to create user",
        }
    }
}

export async function deleteUserWithClerkId(clerkId: string) {
    try {
        const result = await hardDeleteUserService(clerkId)
        return { success: true, user: result }
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to delete user",
        }
    }
}
