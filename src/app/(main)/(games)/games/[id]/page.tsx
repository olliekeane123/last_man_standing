import { TeamFixtureCard } from "@/app/(main)/components/TeamFixtureCard"
import {
    getActiveGameWeekWithFixturesAction,
    getUserGameByIdAction,
} from "@/lib/actions/game.actions"

type Params = Promise<{ id: string }>

type GamePageProps = {
    params: Params
}

export default async function GamePage(props: GamePageProps) {
    const params = await props.params
    const { id } = params
    const game = await getUserGameByIdAction(id)
    const gameWeek = await getActiveGameWeekWithFixturesAction()

    if (!game.success) {
        return <div>Error.</div>
    }

    return (
        <div>
            <p>You&apos;re on the game page: {game.userGame?.game.title}</p>
            {gameWeek.gameWeek?.fixtures.map((fixture) => (
                <TeamFixtureCard
                    homeTeam={fixture.homeTeam}
                    awayTeam={fixture.awayTeam}
                    key={fixture.id}
                />
            ))}
        </div>
    )
}
