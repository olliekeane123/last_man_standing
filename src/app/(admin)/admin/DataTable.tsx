"use client"

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "./DataTablePagination"
import { useTableParams } from "./hooks/useTableParams"
import { FixtureTableData } from "@/lib/types/fixture"
import { createColumns } from "./createColumns"
import { useState } from "react"
import EditFixtureDialog from "./EditFIxtureDialog"
import FiltersBar from "./FiltersBar"

type PaginationInfo = {
    currentPage: number
    totalPages: number
    pageSize: number
    totalCount: number
    hasNextPage: boolean
    hasPreviousPage: boolean
}

type DataTableProps = {
    data: FixtureTableData[]
    pagination: PaginationInfo
}

export function DataTable({ data, pagination }: DataTableProps) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState<FixtureTableData | null>(
        null
    )

    const { params, updateParams } = useTableParams()

    const columns = createColumns(params, updateParams, handleEdit)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
        pageCount: pagination.totalPages,
    })

    function handleEdit(row: FixtureTableData) {
        setSelectedRow(row)
        setDialogOpen(true)
    }

    return (
        <div className="w-2xl lg:w-5xl xl:w-7xl">
            <EditFixtureDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                selectedRow={selectedRow}
            />
            <FiltersBar />
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <DataTablePagination pagination={pagination} />
            </div>
        </div>
    )
}
