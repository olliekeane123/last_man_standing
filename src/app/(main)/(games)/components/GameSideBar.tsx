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
import { getGameByIdAction } from "@/lib/actions/game.actions"
import isSuccessfulAction from "@/lib/actions/utils/isSuccessfulAction"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { Home, Crown, SquarePlus, UserPlus, Scale } from "lucide-react"
import Link from "next/link"

type GameSideBarProps = {
    gameId: string
}
const sidebarItems = [
    {
        title: "Home",
        suffix: "",
        icon: Home,
    },
    {
        title: "Leaderboard",
        suffix: "/leaderboard",
        icon: Crown,
    },
    {
        title: "Picks",
        suffix: "/picks",
        icon: SquarePlus,
    },
    {
        title: "Rules",
        suffix: "/rules",
        icon: Scale,
    },
    {
        title: "Invite",
        suffix: "/invite",
        icon: UserPlus,
    },
]

export async function GameSideBar({ gameId }: GameSideBarProps) {
    const items = sidebarItems.map((item) => ({
        ...item,
        url: `/games/${gameId}${item.suffix}`,
    }))

    const gameResponse = await getGameByIdAction(gameId)

    if (!isSuccessfulAction(gameResponse)) throw new Error("")

    const game = gameResponse.data

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>Last Man Standing</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>{game.title}</SidebarGroupLabel>
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
