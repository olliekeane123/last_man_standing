import { SidebarProvider } from "@/components/ui/sidebar"
import { GameSideBar } from "@/app/(main)/(games)/components/GameSideBar"
import { GameNavBar } from "@/app/(main)/components/GameNavbar"
import { PropsWithChildren } from "react"

interface GameLayoutPropsWithChildren extends PropsWithChildren {
    params: Promise<{ id: string }>
}

export default async function GameLayout({
    children,
    params,
}: GameLayoutPropsWithChildren) {
    const { id } = await params

    return (
        <SidebarProvider>
            <GameSideBar gameId={id} />
            <main className="w-full">
                <GameNavBar />
                <div className="px-4">{children}</div>
            </main>
        </SidebarProvider>
    )
}
