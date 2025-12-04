import prisma from "@/lib/prisma"
import type { Fixture } from "@prisma/client"

type RoundCluster = {
    competitionId: string
    fixtures: Fixture[]
    start: Date
    end: Date
}

type LMSGameweek = {
    start: Date
    end: Date
    roundClusters: RoundCluster[]
}

export async function seedGameweeks() {
    try {
        const allFixtures: Fixture[] = await prisma.fixture.findMany({
            orderBy: { utcDate: "asc" },
            include: { homeTeam: true, awayTeam: true, Competition: true },
        })

        if (allFixtures.length < 2) {
            throw new Error(
                "Unable to retrieve first and last fixtures for timeline"
            )
        }

        const clusters = buildRoundClusters(allFixtures)

        const gameweeks = mergeClustersIntoGameweeks(clusters)

        await saveGameweeks(gameweeks)
    } catch (error) {
        console.error("Error seeding gameweeks:", error)
        throw error
    }
}

function buildRoundClusters(fixtures: Fixture[]): RoundCluster[] {
    const byCompetition = new Map<string, Fixture[]>()

    // Group fixtures by competition
    for (const fixture of fixtures) {
        const array = byCompetition.get(fixture.competitionId as string) ?? []

        array.push(fixture)

        byCompetition.set(fixture.competitionId as string, array)
    }

    const clusters: RoundCluster[] = []

    for (const [competitionId, compFixtures] of byCompetition.entries()) {
        compFixtures.sort((a, b) => a.utcDate.getTime() - b.utcDate.getTime())

        let current: RoundCluster | null = null

        for (const fixture of compFixtures) {
            if (!current) {
                current = {
                    competitionId,
                    fixtures: [fixture],
                    start: fixture.utcDate,
                    end: fixture.utcDate,
                }
                continue
            }

            const gapHours =
                (fixture.utcDate.getTime() - current?.end.getTime()) / 36e5

            if (gapHours > 72) {
                clusters.push(current)
                current = {
                    competitionId,
                    fixtures: [fixture],
                    start: fixture.utcDate,
                    end: fixture.utcDate,
                }
            } else {
                current.fixtures.push(fixture)
                current.end = fixture.utcDate
            }
        }
        if (current) clusters.push(current)
    }

    return clusters
}

function mergeClustersIntoGameweeks(clusters: RoundCluster[]): LMSGameweek[] {
    clusters.sort((a, b) => a.start.getTime() - b.start.getTime())

    const gameweeks: LMSGameweek[] = []
    let current: LMSGameweek | null = null

    for (const cluster of clusters) {
        if (!current) {
            current = {
                start: cluster.start,
                end: cluster.end,
                roundClusters: [cluster],
            }
            continue
        }

        const overlaps =
            cluster.start.getTime() <=
            current.end.getTime() + 24 * 60 * 60 * 1000

        if (overlaps) {
            current.end = new Date(
                Math.max(current.end.getTime(), cluster.end.getTime())
            )
            current.roundClusters.push(cluster)
        } else {
            gameweeks.push(current)
            current = {
                start: cluster.start,
                end: cluster.end,
                roundClusters: [cluster],
            }
        }
    }

    if (current) {
        gameweeks.push(current)
    }

    return gameweeks
}

async function saveGameweeks(gameweeks: LMSGameweek[]) {
    try {
        let number = 1

        for (const gw of gameweeks) {
            const deadline = calculateDeadline(gw)

            const created = await prisma.gameweek.upsert({
                where: { gameweekNumber: number },
                update: {
                    deadline,
                    isActive: false,
                },
                create: {
                    gameweekNumber: number,
                    deadline,
                    isActive: false,
                },
            })

            for (const cluster of gw.roundClusters) {
                for (const fixture of cluster.fixtures) {
                    await prisma.fixture.update({
                        where: { id: fixture.id },
                        data: { gameweekId: created.id },
                    })
                }
            }

            number++
        }
    } catch (error) {
        throw error
    }
}

function calculateDeadline(gw: LMSGameweek): Date {
    // 2 hours before earliest fixture
    const firstFixtureStart = gw.start
    const deadline = new Date(firstFixtureStart.getTime() - 2 * 60 * 60 * 1000)
    return deadline
}

;(async () => {
    await seedGameweeks()
})()

// OLD CODE THAT CREATES GAMEWEEKS FROM REAL WEEKS (NOT OFFICIAL MATCHWEEKS)

/* 

    type WeekWindow = {
        start: Date
        deadline: Date
        fixtures: Fixture[]
    }


    // This would go inside the main seed function

    const firstFixture = allFixtures[0]

    const lastFixture = allFixtures[allFixtures.length - 1]

    const firstDeadline = getThursdayMidnightOfSameWeek(firstFixture.utcDate)

    const lastDeadline = getThursdayMidnightOfSameWeek(lastFixture.utcDate)

    const weeksWindows: WeekWindow[] =
        generateWeeksArrayFromFirstAndLastDeadlines(firstDeadline, lastDeadline)

    assignFixturesToWeekWindows(allFixtures, weeksWindows)

    const validGameweeks = weeksWindows.filter((gw) => gw.fixtures.length > 0)

    console.log(validGameweeks[1])



function getThursdayMidnightOfSameWeek(date: Date) {
    const dateCopy = new Date(date.getTime())

    const daysBetweenThursday = dateCopy.getDay() - 4
    const thursdayFirstWeek = new Date(
        dateCopy.setDate(dateCopy.getDate() - daysBetweenThursday)
    )

    thursdayFirstWeek.setHours(23, 59, 59, 999)

    return thursdayFirstWeek
}

function generateWeeksArrayFromFirstAndLastDeadlines(
    firstDeadline: Date,
    lastDeadline: Date
) {
    const weekWindows = []

    const firstDeadlineCopy = new Date(firstDeadline.getTime())
    const firstWeekStart = new Date(
        firstDeadlineCopy.setDate(firstDeadlineCopy.getDate() - 7)
    ) // Activate gameweek one a week before deadline

    for (
        let currentDate = firstWeekStart;
        currentDate.getTime() <= lastDeadline.getTime();
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 7))
    ) {
        const start = new Date(currentDate.getTime())

        const deadlineCalculation = new Date(start.getTime())
        const deadline = new Date(
            deadlineCalculation.setDate(deadlineCalculation.getDate() + 7)
        )

        weekWindows.push({
            start: start,
            deadline: deadline,
            fixtures: [],
        })
        if (weekWindows.length > 52) {
            throw new Error(
                "Generate week windows array failed: Number of weeks exceeded 52"
            )
        }
    }

    return weekWindows
}

function assignFixturesToWeekWindows(
    fixtures: Fixture[],
    weekWindowsArray: WeekWindow[]
) {
    for (const fixture of fixtures) {
        for (const weekWindow of weekWindowsArray) {
            if (
                fixture.utcDate >= weekWindow.start &&
                fixture.utcDate <= weekWindow.deadline
            ) {
                weekWindow.fixtures.push(fixture)
            }
        }
    }
} */
