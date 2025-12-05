import Link from "next/link"
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/nextjs"
import { ModeToggle } from "./ModeToggle"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function Navbar() {
    return (
        <nav className="p-4 flex items-center justify-between">
            {/* LEFT */}
            <SidebarTrigger className="rounded-xl" />
            {/* RIGHT */}
            <div className="flex items-center gap-4">
                <Link href="/home">Dashboard</Link>
                {/* THEME MENU */}
                <ModeToggle />
                {/* USER MENU */}
                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton />
                        <SignUpButton>
                            <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </nav>
    )
}
