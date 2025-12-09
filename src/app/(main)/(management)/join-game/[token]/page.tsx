import {
    enrollUserInGameAction,
    verifyGameInviteTokenAction,
} from "@/lib/actions/game.actions"
import { getAuthenticatedUser } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"

type JoinPageProps = {
    params: Promise<{ token: string }>
}

export default async function JoinGame({ params }: JoinPageProps) {
    const { token } = await params

    const invite = await verifyGameInviteTokenAction(token)

    if (!invite) {
        redirect(`/invite-status?error=invalid`)
    } else if (invite.expiresAt < new Date()) {
        redirect(`/invite-status?error=expired`)
    }

    const { gameId } = invite

    // NOTE: Ensure getAuthenticatedUser() handles the case where the user is not logged in
    // (e.g., redirects to /sign-in). Assuming it returns a valid User object otherwise.
    const user = await getAuthenticatedUser()

    const enrolled = await enrollUserInGameAction(user.id, gameId)

    if (!enrolled) {
        redirect(`/invite-status?error=game-not-found`)
    }

    redirect(`/games/${gameId}`)
}
