import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSideBar } from "./components/AppSideBar"
import { Navbar } from "./components/Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        
            <SidebarProvider>
                <AppSideBar />
                <main className="w-full">
                    <Navbar />
                    <div className="px-4">{children}</div>
                </main>
            </SidebarProvider>
        
    )
}
