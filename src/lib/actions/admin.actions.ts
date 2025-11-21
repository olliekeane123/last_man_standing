"use server"

import { syncAllFixturesService } from "@/lib/services/fixtureService"
import { FixtureTableData, SyncFixtureOptions } from "@/lib/types/fixture"

export async function syncAllFixturesAction({
    syncGameweek = false,
}: SyncFixtureOptions) {
    try {
        await syncAllFixturesService({ syncGameweek })
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
