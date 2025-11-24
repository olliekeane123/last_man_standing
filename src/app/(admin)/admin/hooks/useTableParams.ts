import { TableParams } from "@/lib/types/tableParams"
import { useRouter, useSearchParams } from "next/navigation"

export function useTableParams() {
    const router = useRouter()
    const searchParams = useSearchParams()

    function getCurrentParams(): TableParams {
        const page = parseInt(searchParams.get("page") || "1")
        const pageSize = parseInt(searchParams.get("pageSize") || "20")
        const sortBy = searchParams.get("sortBy") || "matchday"
        const sortOrder =
            (searchParams.get("sortOrder") as "asc" | "desc") || "asc"
        const status = searchParams.getAll("status")
        const dateStart = searchParams.get("dateStart") || undefined
        const dateEnd = searchParams.get("dateEnd") || undefined

        return {
            page,
            pageSize,
            sortBy,
            sortOrder,
            status,
            dateStart,
            dateEnd
        }
    }

    function updateParams(updates: Partial<TableParams>) {
        const params = new URLSearchParams(searchParams.toString())

        Object.entries(updates).forEach(([key, value]) => {
            if (value === undefined || value === null) {
                params.delete(key)
            } else if (Array.isArray(value)) {
                params.delete(key)

                value.forEach((item) => {
                    params.append(key, item.toString())
                })
            } else {
                params.set(key, value.toString())
            }
        })

        router.push(`?${params.toString()}`)
    }

    function navigateToPage(page: number) {
        updateParams({ page })
    }

    return {
        params: getCurrentParams(),
        updateParams,
        navigateToPage,
    }
}
