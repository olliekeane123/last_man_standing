export type UnparsedTableParams = {
    page?: string
    pageSize?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
    status?: string[] | string
}

export type TableParams = {
    page: number
    pageSize: number
    sortBy?: string
    sortOrder?: "asc" | "desc"
    status?: string[]
}
