import { z } from "zod"

const AreaSchema = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    flag: z.url(),
})

const CompetitionSchema = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    type: z.string(),
    emblem: z.url(),
})

const CoachSchema = z.object({
    id: z.number(),
    name: z.string(),
    dateOfBirth: z.string().nullable(),
    nationality: z.string().nullable(),
    contract: z
        .object({
            start: z.string(),
            until: z.string(),
        })
        .optional(),
})

const PlayerSchema = z.object({
    id: z.number(),
    name: z.string(),
    position: z.string(),
    dateOfBirth: z.string().nullable(),
    nationality: z.string().nullable(),
})

const FixtureSchema = z.object({
    area: AreaSchema,
    competition: CompetitionSchema,
    season: z.object({
        id: z.number(),
        startDate: z.string(),
        endDate: z.string(),
        currentMatchday: z.number(),
        winner: z.null().optional(),
    }),
    id: z.number(),
    utcDate: z.string(),
    status:z.enum(["SCHEDULED", "TIMED", "IN_PLAY", "PAUSED", "EXTRA_TIME", "PENALTY_SHOOTOUT", "FINISHED", "SUSPENDED", "POSTPONED", "CANCELLED", "AWARDED"]),
    matchday: z.number(),
    stage: z.enum(["FINAL", "THIRD_PLACE", "SEMI_FINALS", "QUARTER_FINALS", "LAST_16", "LAST_32", "LAST_64", "ROUND_4", "ROUND_3", "ROUND_2", "ROUND_1", "GROUP_STAGE", "PRELIMINARY_ROUND", "QUALIFICATION", "QUALIFICATION_ROUND_1", "QUALIFICATION_ROUND_2", "QUALIFICATION_ROUND_3", "PLAYOFF_ROUND_1", "PLAYOFF_ROUND_2", "PLAYOFFS", "REGULAR_SEASON", "CLAUSURA", "APERTURA", "CHAMPIONSHIP", "RELEGATION", "RELEGATION_ROUND"]),
    group: z.string().nullable(),
    lastUpdated: z.string(),
    homeTeam: z.object({
        id: z.number(),
        name: z.string(),
        shortName: z.string(),
        tla: z.string().optional(),
        crest: z.url().optional(),
    }),
    awayTeam: z.object({
        id: z.number(),
        name: z.string(),
        shortName: z.string(),
        tla: z.string().optional(),
        crest: z.url().optional(),
    }),
    score: z.object({
        winner: z.string().nullable(),
        duration: z.enum(["REGULAR", "EXTRA_TIME", "PENALTY_SHOOTOUT"]).nullable(),
        fullTime: z.object({
            home: z.number().nullable(),
            away: z.number().nullable()
        }),
        halfTime: z.object({
            home: z.number().nullable(),
            away: z.number().nullable()
        })
    }),
    odds: z.object({
        msg: z.string()
    }),
    referees: z.array(z.object({
        id: z.number(),
        name: z.string().optional(),
        type: z.string().optional(),
        nationality: z.string().optional()
    })),
})

export const FootballTeamSchema = z.object({
    id: z.number(),
    name: z.string(),
    shortName: z.string(),
    tla: z.string().optional(),
    crest: z.url().optional(),
    website: z.url().optional().nullable(),
    founded: z.number().optional().nullable(),
    clubColors: z.string().optional(),
    venue: z.string().optional(),
    area: AreaSchema.optional(),
    coach: CoachSchema.optional(),
    squad: z.array(PlayerSchema).optional(),
})

export const FootballTeamsResponseSchema = z.object({
    count: z.number(),
    filters: z.object({
        season: z.string(),
    }),
    competition: CompetitionSchema,
    season: z.object({
        id: z.number(),
        startDate: z.string(),
        endDate: z.string(),
        currentMatchday: z.number(),
        winner: z.null().optional(),
    }),
    teams: z.array(FootballTeamSchema),
})

export const FootballFixturesResponseSchema = z.object({
    filters: z.object({
        season: z.string(),
    }),
    resultSet: z.object({
        count: z.number(),
        first: z.string().optional(),
        last: z.string(),
        played: z.number()
    }),
    competition: CompetitionSchema,
    matches: z.array(FixtureSchema)
})

export type Competition = z.infer<typeof CompetitionSchema>
export type FootballTeam = z.infer<typeof FootballTeamSchema>
export type FootballTeamsResponse = z.infer<typeof FootballTeamsResponseSchema>
export type FootballFixture = z.infer<typeof FixtureSchema>
export type FootballFixturesResponse = z.infer<typeof FootballFixturesResponseSchema>
