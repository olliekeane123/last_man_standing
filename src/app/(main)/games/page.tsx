import { getAllGamesByUser } from "@/lib/actions/game.actions"

const games = await getAllGamesByUser()

export default async function Game() {
    async function wait(){
        new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    await wait()
    
    if (!games.success) {
        return <div>Error.</div>
    }

    return games.success && games!.games!.length > 0 ? (
        <div>
            {games.games?.map((game) => (
                <h1 key={game.id}>{game.title}</h1>
            ))}
        </div>
    ) : (
        <div>No games</div>
    )
}
