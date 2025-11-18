export type FixtureTableData = {
    id: string
    utcDate: string
    status: FixtureStatus
    competition: string
    homeTeam: string
    awayTeam: string
    matchday: number
    gameweek: number | "null"
}

export type FixtureStatus = "SCHEDULED" | "TIMED" | "IN_PLAY" | "PAUSED" | "FINISHED" | "SUSPENDED" | "POSTPONED" | "CANCELLED" | "AWARDED"

export const ALL_FIXTURE_STATUSES = [
    "SCHEDULED",
    "TIMED",
    "IN_PLAY",
    "PAUSED",
    "FINISHED",
    "SUSPENDED",
    "POSTPONED",
    "CANCELLED",
    "AWARDED",
] as const;