import { Competition } from "@/lib/types/schemas/footballApiSchemas"

export const COMPETITIONS: Competition[] = [
    {
        id: 2021, // Premier League ID
        name: "Premier League",
        code: "PL",
        type: "LEAGUE",
        emblem: "https://crests.football-data.org/PL.png",
    },
    {
        id: 2016, // Championship ID
        name: "Championship",
        code: "ELC",
        type: "LEAGUE",
        emblem: "https://crests.football-data.org/ELC.png",
    },
]
