import { auth } from "@clerk/nextjs/server"



// Not currently in use as clerk middleware is protecting admin pages
export async function isAdmin() {
    try {
        const { sessionClaims } = await auth()

        if (!hasAdminMetadata(sessionClaims)) {
            return false
        }

        return (
            sessionClaims?.metadata?.isAdmin === true ||
            sessionClaims?.metadata?.role === "admin"
        )
    } catch (error) {
        console.error("Error checking admin status:", error)
        return false
    }
}

function hasAdminMetadata(
    sessionClaims: unknown
): sessionClaims is { metadata?: { isAdmin?: boolean; role: string } } {
    return typeof sessionClaims === "object" && sessionClaims !== null
}
