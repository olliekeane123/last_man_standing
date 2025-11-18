import { FixtureStatus } from "../types/fixture"
import { UnparsedTableParams } from "../types/tableParams"

export function parseTableParams(searchParams: UnparsedTableParams) {
    const currentPage = parseInt((searchParams.page as string) || "1")
    const pageSize = parseInt((searchParams.pageSize as string) || "20")
    const sortBy = (searchParams.sortBy as string) || "matchday"
    const sortOrder = (searchParams.sortOrder as "asc" | "desc") || "asc"
     let statuses = searchParams.status 
        ? Array.isArray(searchParams.status) 
            ? searchParams.status 
            : [searchParams.status]
        : []

    statuses = statuses
        .map((status) => status.toUpperCase())
        .filter((status): status is FixtureStatus => 
            ["SCHEDULED", "TIMED", "IN_PLAY", "PAUSED", "FINISHED", "SUSPENDED", "POSTPONED", "CANCELLED", "AWARDED"].includes(status)
        )

    return {
        currentPage,
        pageSize,
        sortBy,
        sortOrder,
        statuses
    }
}
