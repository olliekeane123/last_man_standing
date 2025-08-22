import Image from "next/image"

export async function TeamFixtureCard({
    homeTeam,
    awayTeam,
}: {
    homeTeam: {
        id: string
        name: string
        shortName?: string | null
        crest?: string | null
    }
    awayTeam: {
        id: string
        name: string
        shortName?: string | null
        crest?: string | null
    }
}) {
     return (
        <div className="flex items-center gap-4 p-4 border rounded-lg">
            {/* Home Team */}
            <div className="flex items-center gap-2">
                {homeTeam.crest && (
                    <Image
                        src={homeTeam.crest}
                        width={30}
                        height={30}
                        alt={`${homeTeam.shortName || homeTeam.name} crest`}
                        className="object-contain"
                    />
                )}
                <span>{homeTeam.shortName || homeTeam.name}</span>
            </div>

            <span className="mx-2">vs</span>

            {/* Away Team */}
            <div className="flex items-center gap-2">
                <span>{awayTeam.shortName || awayTeam.name}</span>
                {awayTeam.crest && (
                    <Image
                        src={awayTeam.crest}
                        width={30}
                        height={30}
                        alt={`${awayTeam.shortName || awayTeam.name} crest`}
                        className="object-contain"
                    />
                )}
            </div>
        </div>
    )
}
