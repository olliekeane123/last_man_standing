import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { Home, CrownIcon, Crown, SquarePlus } from "lucide-react"
import Link from "next/link"

const items = [
    {
        title: "Home",
        url: "/home",
        icon: Home,
    },
    {
        title: "My Games",
        url: "/games",
        icon: Crown,
    },
    {
        title: "Create Game",
        url: "/games/create",
        icon: SquarePlus,
    },
    {
        title: "Join Game",
        url: "/games/join",
        icon: CrownIcon,
    },
]

export function ManagementSideBar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader></SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarRail></SidebarRail>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu></DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
/* 
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
            <Link href="/home">
                <span className="bg-blue-300 text-xl font-bold">Home</span>
            </Link>
            <Link href="/games">
                <span className="bg-blue-300 text-xl font-bold">My Games</span>
            </Link>
            <Link href="/games/create">
                <span className="bg-blue-300 text-xl font-bold">
                    Create Game
                </span>
            </Link>
            <Link href="/games/join">
                <span className="bg-blue-300 text-xl font-bold">Join Game</span>
            </Link>
            <Link href="/games/create">
                <span className="bg-blue-300 text-xl font-bold">Settings</span>
            </Link>
        </nav>
 */
