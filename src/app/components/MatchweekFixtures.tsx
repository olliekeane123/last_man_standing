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
        <div>
            {fixtures.map((fixture) => (
                <TeamFixtureCard
                    homeTeam={fixture.homeTeam}
                    awayTeam={fixture.awayTeam}
                    key={fixture.id}
                />
            ))}
        </div>
    )
}
