import { MatchweekFixtures } from "../components/MatchweekFixtures"
import { getUserByClerkId } from "@/lib/actions/user"
import { auth } from "@clerk/nextjs/server"

export default async function Dashboard() {
    const { userId } = await auth()
    if (!userId) {
        throw new Error("Can't access clerk Id, user must be signed in")
    }

    const { user } = await getUserByClerkId(userId)

    if (!user) {
        // Handle the case where the user is in Clerk but not your DB
        // This is where your on-demand sync would kick in
        return <div>User not found in database.</div>
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center space-y-6">
            <div>Welcome, {user.email}</div>
                <MatchweekFixtures />
            </div>
        </div>
    )
}
