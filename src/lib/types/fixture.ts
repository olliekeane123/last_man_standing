export type FixtureTableData = {
    id: string
    utcDate: string
    status: string
    competition: string
    homeTeam: string
    awayTeam: string
    matchday: number
    gameweek: number | "null"
}