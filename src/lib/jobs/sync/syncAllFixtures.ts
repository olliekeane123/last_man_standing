import { syncAllFixtures } from "@/lib/services/fixtureService";

export async function syncAllFixturesJob() {
    console.log("Starting scheduled fixture sync...")

    try {
        await syncAllFixtures()
        console.log("Scheduled fixture sync completed successfully")
    } catch (error) {
        console.error("Scheduled fixture sync failed:", error)
        throw error
    }
}