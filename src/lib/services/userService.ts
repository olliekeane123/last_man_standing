import prisma from "@/lib/prisma"
import { CreateUserData } from "@/lib/types/user"

// Currently not in use as using upsert service for creation
export async function createUserService(userData: CreateUserData) {
    return prisma.user.create({
        data: userData,
    })
}

export async function upsertUserService(userData: CreateUserData) {
    return prisma.user.upsert({
        where: { clerkId: userData.clerkId },
        update: userData,
        create: userData,
    })
}

export async function hardDeleteUserService(clerkId: string) {
    return prisma.user.delete({
        where: { clerkId },
    })
}

export async function getUserByClerkIdService(clerkId: string) {
    const user = await prisma.user.findUnique({
        where: { clerkId },
    })

    return user
}
