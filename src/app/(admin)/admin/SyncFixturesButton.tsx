"use client"

import { syncAllFixturesAction } from "@/lib/actions/admin.actions"

export function SyncFixturesButton() {
    const actionHandler = async (formData: FormData) => {
        const isChecked = formData.get("syncGameweek") === "on";

        await syncAllFixturesAction({ syncGameweek: isChecked });
    };

    return (
        // The action prop now points to the local handler
        <form action={actionHandler}>
            <legend>Sync Gameweeks</legend>
            <div className="flex items-center gap-3">
                <label htmlFor="sync-toggle">
                    Include Gameweeks in sync
                </label>
                
                <input 
                    type="checkbox" 
                    id="sync-toggle" 
                    name="syncGameweek" 
                />
            </div>
            <button type="submit">Sync Fixtures</button>
        </form>
    );
}
