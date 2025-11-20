"use client"

import { syncAllFixturesAction } from "./actions"


export function SyncFixturesButton() {
        return (
        <form action={syncAllFixturesAction}>
            <button type="submit">Sync Fixtures</button>
        </form>
    )
}
