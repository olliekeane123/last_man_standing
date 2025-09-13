import prisma from "@/lib/prisma"
import { FixtureTableData } from "@/lib/types/fixture"
import TopBar from "@/app/(main)/components/TopBar"
import { DataTable } from "./DataTable"

interface AdminPageProps {
    searchParams: Promise<{
        page?: string
        pageSize?: string
        sortBy?: string
        sortOrder?: "asc" | "desc"
    }>
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
    const { page = "1", pageSize: pageSizeParam = "20", sortBy = "matchday", sortOrder = "asc" } = await searchParams

    const currentPage = parseInt(page)
    const pageSize = parseInt(pageSizeParam)

    const totalFixtureCount = await prisma.fixture.count()
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
        orderBy: { [sortBy]: sortOrder},
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
        include: {
            homeTeam: true,
            awayTeam: true,
            gameweek: true,
        },
    })

    const fixtures: FixtureTableData[] = fixturesRawData.map((fixture) => {
        return {
            id: fixture.id,
            utcDate: fixture.utcDate.toISOString(),
            status: fixture.status,
            competition: "",
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
                <div className="p-4 max-w-7xl">
                    <DataTable data={fixtures} pagination={paginationInfo} />
                </div>
            </div>
        </>
    )
}
