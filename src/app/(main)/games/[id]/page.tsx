import { getUserGameByIdAction } from "@/lib/actions/game.actions"

type Params = Promise<{ id: string }>

type GamePageProps = {
    params: Params
}

export default async function GamePage(props: GamePageProps) {
    const params = await props.params
    const { id } = params
    const game = await getUserGameByIdAction(id)

    if (!game.success) {
        return <div>Error.</div>
    }

    return <div>You&apos;re on the game page: {game.userGame?.game.title}</div>
}
