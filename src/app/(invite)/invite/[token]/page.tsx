import {
    enrollUserInGameAction,
    verifyGameInviteTokenAction,
} from "@/lib/actions/game.actions"
import { getAuthenticatedUser } from "@/lib/actions/user.actions"
import ClientRedirector from "@/app/(invite)/invite/[token]/ClientRedirector"

type JoinPageProps = {
    params: Promise<{ token: string }>
}

export default async function JoinGame({ params }: JoinPageProps) {
    const { token } = await params

    let redirectPath = "" // Initialize the path

    try {
        // --- 1. ALL SERVER-SIDE LOGIC RUNS HERE ---
        const invite = await verifyGameInviteTokenAction(token)

        if (!invite) {
            redirectPath = `/invite/invite-status?error=invalid`
        } else if (invite.expiresAt < new Date()) {
            redirectPath = `/invite/invite-status?error=expired`
        } else {
            const { gameId } = invite

            // NOTE: Ensure getAuthenticatedUser does not throw an unhandled error
            // if the user is not logged in, or wrap it in a try/catch.
            const user = await getAuthenticatedUser()

            const enrolled = await enrollUserInGameAction(user.id, gameId)

            if (!enrolled) {
                redirectPath = `/invite/invite-status?error=game-not-found`
            } else {
                redirectPath = `/games/${gameId}`
            }
        }
    } catch (error) {
        // Catch any unexpected error during server logic (e.g., DB error, Clerk error)
        console.error("Critical error during join logic:", error)
        redirectPath = `/invite/invite-status?error=internal-error`
    }

    // --- 2. RENDER CLIENT COMPONENT TO HANDLE REDIRECT ---
    // The Server Component is now guaranteed to return JSX, allowing hydration to start
    // without the immediate, conflicting redirect signal.
    //Okay, I ask because I'm wondering about potential workarounds that don't make the redirect a client side function.
    return <ClientRedirector redirectUrl={redirectPath} />
}
