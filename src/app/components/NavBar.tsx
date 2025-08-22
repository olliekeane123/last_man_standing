import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/nextjs"
import Image from "next/image"

export default function NavBar() {
    return (
        <header>
            <nav className="flex justify-between items-center border-b mb-4 px-6 py-3">
                <div className="flex items-center">
                    <Image
                        src="/vercel.svg"
                        width={50}
                        height={50}
                        alt="Logo"
                    />
                    <span>GoalLine Games</span>
                </div>
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
            </nav>
        </header>
    )
}
