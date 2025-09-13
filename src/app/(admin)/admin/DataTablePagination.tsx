import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useTableParams } from "./hooks/useTableParams"

type PaginationInfo = {
    currentPage: number
    totalPages: number
    pageSize: number
    totalCount: number
    hasNextPage: boolean
    hasPreviousPage: boolean
}

interface DataTablePaginationProps extends React.ComponentProps<"div"> {
    pagination: PaginationInfo
    pageSizeOptions?: number[]
}

export function DataTablePagination({
    pagination,
    pageSizeOptions = [10, 20, 30, 40, 50],
    className,
    ...props
}: DataTablePaginationProps) {
    const { updateParams, navigateToPage } = useTableParams()

    const handlePageSizeChange = (newPageSize: string) => {
        const pageSize = parseInt(newPageSize)
        updateParams({ pageSize, page: 1 })
    }

    const startItem = (pagination.currentPage - 1) * pagination.pageSize + 1
    const endItem = Math.min(
        pagination.currentPage * pagination.pageSize,
        pagination.totalCount
    )

    return (
        <div
            className={cn(
                "flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8",
                className
            )}
            {...props}
        >
            <div className="flex-1 whitespace-nowrap text-muted-foreground text-sm">
                Showing {startItem} to {endItem} of {pagination.totalCount}{" "}
                entries
            </div>
            <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                <div className="flex items-center space-x-2">
                    <p className="whitespace-nowrap font-medium text-sm">
                        Rows per page
                    </p>
                    <Select
                        value={pagination.pageSize.toString()}
                        onValueChange={handlePageSizeChange}
                    >
                        <SelectTrigger className="h-8 w-[4.5rem] [&[data-size]]:h-8">
                            <SelectValue
                                placeholder={pagination.pageSize.toString()}
                            />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {pageSizeOptions.map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={pageSize.toString()}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-center font-medium text-sm">
                    Page {pagination.currentPage} of {pagination.totalPages}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        aria-label="Go to first page"
                        variant="outline"
                        size="icon"
                        className="hidden size-8 lg:flex"
                        onClick={() => navigateToPage(1)}
                        disabled={!pagination.hasPreviousPage}
                    >
                        <ChevronsLeft />
                    </Button>
                    <Button
                        aria-label="Go to previous page"
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() =>
                            navigateToPage(pagination.currentPage - 1)
                        }
                        disabled={!pagination.hasPreviousPage}
                    >
                        <ChevronLeft />
                    </Button>
                    <Button
                        aria-label="Go to next page"
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() =>
                            navigateToPage(pagination.currentPage + 1)
                        }
                        disabled={!pagination.hasNextPage}
                    >
                        <ChevronRight />
                    </Button>
                    <Button
                        aria-label="Go to last page"
                        variant="outline"
                        size="icon"
                        className="hidden size-8 lg:flex"
                        onClick={() => navigateToPage(pagination.totalPages)}
                        disabled={!pagination.hasNextPage}
                    >
                        <ChevronsRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}
