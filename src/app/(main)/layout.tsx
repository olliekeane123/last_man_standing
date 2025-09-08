import { Navbar } from "./components/Navbar"
import TopBar from "./components/TopBar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <TopBar />
            <Navbar />
            <div className="flex flex-col justify-center items-center">{children}</div>
        </div>
    )
}
