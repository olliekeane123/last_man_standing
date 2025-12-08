import { $Enums } from "@prisma/client"

export type CreateGameFormData = {
    title: string
}

export type CreateGameData = CreateGameFormData & {
    adminId: string
}

export type GameActionResponse = {
    id: string
    title: string
    gameStatus: $Enums.GameStatus
    adminId: string
}

export type UserGameActionResponse = {
    game: {
        title: string
        id: string
        gameStatus: $Enums.GameStatus
        adminId: string
    }
} & {
    isKnockedOut: boolean
    joinedAt: Date
    userId: string
    gameId: string
}

export type GameInviteActionResponse = {
    id: string
    userId: string
    gameId: string
    token: string
    expiresAt: Date
}

// Not in use just now
export type GameWeekWithFixturesActionResponse = {
    fixtures: ({
        homeTeam: {
            id: string
            createdAt: Date
            updatedAt: Date
            name: string
            apiId: number
            shortName: string | null
            tla: string | null
            crest: string | null
        }
        awayTeam: {
            id: string
            createdAt: Date
            updatedAt: Date
            name: string
            apiId: number
            shortName: string | null
            tla: string | null
            crest: string | null
        }
    } & {
        id: string
        createdAt: Date
        updatedAt: Date
        apiId: number
        utcDate: Date
        status: string
        matchday: number
        competitionId: string | null
        gameweekId: string | null
        homeTeamId: string
        awayTeamId: string
        score: {
            winner: string | null
            duration: "REGULAR" | "EXTRA_TIME" | "PENALTY_SHOOTOUT" | null
            fullTime: {
                home: number | null
                away: number | null
            }
            halfTime: {
                home: number | null
                away: number | null
            }
        }
        apiLastUpdated: Date
    })[]
}
