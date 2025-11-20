"use server"

import { syncAllFixtures } from "@/lib/services/fixtureService"

export async function syncAllFixturesAction() {
    try {
        await syncAllFixtures()
        console.log("Manual fixture sync completed successfully")
    } catch (error) {
        console.error("Manual fixture sync failed:", error)
        throw error
    }
}
