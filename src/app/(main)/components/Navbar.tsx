import Link from "next/link";

export function Navbar() {
    return (
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
            <Link href="/home">
                <span className="bg-blue-300 text-xl font-bold">Home</span>
            </Link>
            <Link href="/games">
                <span className="bg-blue-300 text-xl font-bold">My Games</span>
            </Link>
            <Link href="/games/create">
                <span className="bg-blue-300 text-xl font-bold">Create Game</span>
            </Link>
            <Link href="/games/create">
                <span className="bg-blue-300 text-xl font-bold">Join Game</span>
            </Link>
            <Link href="/games/create">
                <span className="bg-blue-300 text-xl font-bold">Create Game</span>
            </Link>
        </nav>
    )
}