"use server"

import {
    syncAllFixturesService,
    updateFixture,
} from "@/lib/services/fixtureService"
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

export async function editFixtureDataAction(
    newData: Partial<FixtureTableData>
) {
    try {
        const updatedFixture = await updateFixture(newData)

        return { success: true, updatedFixture }
    } catch (error) {
        console.error("Edit fixture data failed:", error)
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to update fixture",
        }
    }
}
