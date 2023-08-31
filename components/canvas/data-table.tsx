"use client"

import {
    ColumnDef,
    flexRender,
    ColumnFiltersState,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
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

// import { Button } from "./button"
// import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Input } from "../ui/input"
import Link from "next/link"
import { Button } from "@nextui-org/react"
import { useParams } from "next/navigation"
import { useCard } from "@nextui-org/react/types/card/use-card"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
    searchKey: string,
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
}: DataTableProps<TData, TValue>) {

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )

    const refer = useParams()


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        }
    })

    return (
        <div>
            <div className="grid grid-cols-2 py-4">
                <Input
                    placeholder="Search"
                    value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(searchKey)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-3xl from-amber-400 via-amber-700 border border-spacing-1 w-100 mb-10">
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
                                                    header.column.columnDef.header,
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
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}
