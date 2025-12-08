import { TeamFixtureCard } from "@/app/(main)/components/TeamFixtureCard"
import {
    getActiveGameWeekWithFixturesAction,
    getUserGameByIdAction,
} from "@/lib/actions/game.actions"
import isSuccessfulAction from "@/lib/actions/utils/isSuccessfulAction"

type GamePageProps = {
    params: Promise<{ id: string }>
}

export default async function GamePage(props: GamePageProps) {
    const params = await props.params
    const { id } = params
    const gameResponse = await getUserGameByIdAction(id)
    const gameWeek = await getActiveGameWeekWithFixturesAction()

    if (!isSuccessfulAction(gameResponse) || !gameWeek) {
        return <div>Error.</div>
    }

    return (
        <div>
            <p>You&apos;re on the game page: {gameResponse.data.game.title}</p>
            {gameWeek.data?.fixtures.map((fixture) => (
                <TeamFixtureCard
                    homeTeam={fixture.homeTeam}
                    awayTeam={fixture.awayTeam}
                    key={fixture.id}
                />
            ))}
        </div>
    )
}
