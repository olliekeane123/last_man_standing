import prisma from "@/lib/prisma"
import { FixtureStatus, FixtureTableData } from "@/lib/types/fixture"
import TopBar from "@/app/(main)/components/TopBar"
import { DataTable } from "./DataTable"
import { parseTableParams } from "@/lib/utils/parseTableParams"
import { SyncFixturesButton } from "./SyncFixturesButton"

interface AdminPageProps {
    searchParams: Promise<{
        page?: string
        pageSize?: string
        sortBy?: string
        sortOrder?: "asc" | "desc"
        status?: string[]
    }>
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
    const params = await searchParams

    const { currentPage, pageSize, sortBy, sortOrder, statuses } =
        parseTableParams(params)

    const where = {
        status: {},
    }

    if (statuses.length > 0) {
        where.status = { in: statuses }
    }

    const totalFixtureCount = await prisma.fixture.count({ where })
    const totalPages = Math.ceil(totalFixtureCount / pageSize)

    const paginationInfo = {
        currentPage,
        totalPages,
        pageSize,
        totalCount: totalFixtureCount,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
    }

    const fixturesRawData = await prisma.fixture.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
        include: {
            homeTeam: true,
            awayTeam: true,
            gameweek: true,
            Competition: true,
        },
    })

    const fixtures: FixtureTableData[] = fixturesRawData.map((fixture) => {
        return {
            id: fixture.id,
            utcDate: fixture.utcDate.toISOString(),
            status: fixture.status as FixtureStatus,
            competition: fixture.Competition?.name || "",
            homeTeam: fixture.homeTeam.name,
            awayTeam: fixture.awayTeam.name,
            matchday: fixture.matchday,
            gameweek: fixture.gameweek?.gameweekNumber || "null",
        }
    })

    return (
        <>
            <TopBar />
            <div className="flex justify-center">
                <DataTable data={fixtures} pagination={paginationInfo} />
            </div>
            <SyncFixturesButton />
        </>
    )
}
