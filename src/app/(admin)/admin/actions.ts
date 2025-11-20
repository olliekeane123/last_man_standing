"use server"

import { syncAllFixtures } from "@/lib/services/fixtureService"
import { FixtureTableData } from "@/lib/types/fixture"

export async function syncAllFixturesAction() {
    try {
        await syncAllFixtures()
        console.log("Manual fixture sync completed successfully")
    } catch (error) {
        console.error("Manual fixture sync failed:", error)
        throw error
    }
}

export async function editFixureDataAction(newFixtureData: FixtureTableData) {
    try {
        // NEED TO ADD LOGIC HERE
    } catch (error) {
        console.error("Edit fixture data failed:", error)
        throw error
    }
}