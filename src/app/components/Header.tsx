import Image from "next/image"

export default function Header() {
    return (
        <header>
            <nav className="flex justify-between items-center border-b mb-4 px-6 py-3">
                <div className="flex items-center">
                    <Image src="/vercel.svg" width={50} height={50} alt="Logo" />
                    <span>GoalLine Games</span>
                </div>
                <p>Login</p>
            </nav>
        </header>
    )
}
