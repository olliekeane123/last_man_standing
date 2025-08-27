import { auth } from "@clerk/nextjs/server"

// Not currently in use as clerk middleware is protecting admin pages
export async function isAdmin() {
    try {
        const { sessionClaims } = await auth()
        
        return (
            sessionClaims?.metadata?.isAdmin === true ||
            sessionClaims?.metadata?.role === "admin"
        )
    } catch (error) {
        console.error("Error checking admin status:", error)
        return false
    }
}
