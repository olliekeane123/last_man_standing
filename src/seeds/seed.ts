import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "../../.env.local") })

import { syncFixtures } from "@/lib/cron/syncFixtures"
import { syncTeams } from "@/lib/cron/syncTeams"
import { seedCompetitions } from "@/seeds/lib/seedCompetitions"

async function seed() {
    console.log("Beginning seeding")

    await seedCompetitions()
    console.log("Competitions seeded")

    await syncTeams()
    console.log("Teams seeded")

    await syncFixtures()
    console.log("Fixtures seeded")

    console.log("Seed completed")
}

async function main() {
    try {
        await seed()
    } catch (error) {
        console.error("Seed failed:", error)
        process.exit(1)
    } finally {
        process.exit(0)
    }
}

main()
