import { SidebarProvider } from "@/components/ui/sidebar"
import { ManagementSideBar } from "@/app/(main)/components/ManagementSideBar"
import { Navbar } from "@/app/(main)/components/Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <ManagementSideBar />
            <main className="w-full">
                <Navbar />
                <div className="px-4">{children}</div>
            </main>
        </SidebarProvider>
    )
}
