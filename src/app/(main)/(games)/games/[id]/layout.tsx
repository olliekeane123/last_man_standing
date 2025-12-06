import { SidebarProvider } from "@/components/ui/sidebar"
import { GameSideBar } from "@/app/(main)/components/GameSideBar"
import { Navbar } from "@/app/(main)/components/Navbar"

export default function Layout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { id: string }
}) {
    const gameId = params.id
    return (
        <SidebarProvider>
            <GameSideBar gameId={gameId} />
            <main className="w-full">
                <Navbar />
                <div className="px-4">{children}</div>
            </main>
        </SidebarProvider>
    )
}
