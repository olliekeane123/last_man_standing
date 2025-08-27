export type CreateGameFormData = {
    title: string
}

export type CreateGameData = CreateGameFormData & {
    adminId: string
}
