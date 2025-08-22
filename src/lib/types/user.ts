export type User = {
    id: string
    clerkId: string
    email: string
    displayName?: string
    profileImageUrl?: string
    createdAt: Date
    updatedAt: Date
}

export type CreateUserData = {
    clerkId: string
    email: string
    displayName?: string
    profileImageUrl?: string
}
