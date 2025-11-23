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
        await updateFixture(newData)
    } catch (error) {
        console.error("Edit fixture data failed:", error)
        throw error
    }
}
