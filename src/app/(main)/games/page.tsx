import { getAllGamesByUserAction } from "@/lib/actions/game.actions"
import Link from "next/link"

export default async function Game() {
    const games = await getAllGamesByUserAction()

    if (!games.success) {
        return <div>Error.</div>
    }

    return games.success && games!.games!.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
            {games.games?.map((game) => (
                <Link href={`/games/${game.id}`} key={game.id}>
                    <div className="bg-primary-foreground p-4 h-40 rounded-xl">
                        <h1>{game.title}</h1>
                        {/* <p>{game.gameStatus}</p> */}
                    </div>
                </Link>
            ))}
        </div>
    ) : (
        <div>No games</div>
    )
}
