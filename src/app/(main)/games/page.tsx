import { getAllGamesByUserAction } from "@/lib/actions/game.actions"
import Link from "next/link"

export default async function Game() {
    const games = await getAllGamesByUserAction()

    if (!games.success) {
        return <div>Error.</div>
    }

    return games.success && games!.games!.length > 0 ? (
        <div>
            {games.games?.map((game) => (
                <Link href={`/games/${game.id}`} key={game.id}>
                    <h1>{game.title}</h1>
                </Link>
            ))}
        </div>
    ) : (
        <div>No games</div>
    )
}
