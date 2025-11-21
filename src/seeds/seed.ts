import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "../../.env.local") })

import { seedCompetitions } from "@/seeds/lib/seedCompetitions"
import { seedAllTeams } from "@/lib/services/teamService"
import { syncAllFixturesService } from "@/lib/services/fixtureService"

async function seed() {
    console.log("Beginning seeding")

    await seedCompetitions()
    console.log("Competitions seeded")

    await seedAllTeams()
    console.log("Teams seeded")

    await syncAllFixturesService()
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

if (require.main === module) {
    main()
}

export default main
