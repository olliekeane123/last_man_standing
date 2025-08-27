import prisma from "@/lib/prisma"
import { TeamFixtureCard } from "./TeamFixtureCard"

export async function MatchweekFixtures() {
    const fixtures = await prisma.fixture.findMany({
        where: {
            matchday: 2,
        },
        include: {
            homeTeam: true,
            awayTeam: true,
        },
    })

    return (
        <div className="flex flex-col space-y-6 pb-6">
            <h1>Matchweek 2 fixtures</h1>
            <div>
                {fixtures.map((fixture) => (
                    <TeamFixtureCard
                        homeTeam={fixture.homeTeam}
                        awayTeam={fixture.awayTeam}
                        key={fixture.id}
                    />
                ))}
            </div>
        </div>
    )
}
