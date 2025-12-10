import { SidebarProvider } from "@/components/ui/sidebar"
import { ManagementSideBar } from "@/app/(main)/components/ManagementSideBar"
import { GameNavBar } from "@/app/(main)/components/GameNavbar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <ManagementSideBar />
            <main className="w-full">
                <GameNavBar />
                <div className="px-4">{children}</div>
            </main>
        </SidebarProvider>
    )
}
