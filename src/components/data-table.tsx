import * as React from "react"

import {cn} from "../lib/utils"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./table"

export interface DataTableColumn<T> {
    id: string
    header: React.ReactNode
    /**
     * Renders the cell content. It is called twice per row, once for the table
     * layout and once for the card layout (both are mounted, one hidden with
     * CSS), so it must be free of side effects and must not render an `id`, a
     * `ref` target or an autofocused control.
     */
    cell: (row: T) => React.ReactNode
    className?: string
}

export interface DataTableProps<T> {
    columns: DataTableColumn<T>[]
    rows: T[]
    rowKey: (row: T) => string | number
    className?: string
}

/**
 * Tabular data: a table from the `md` breakpoint up, one stacked card per row below it.
 *
 * Both layouts are mounted and one is hidden with CSS, which keeps the
 * responsive switch free of JavaScript and keeps table semantics on desktop.
 * As a consequence `column.cell` is called twice per row; see
 * `DataTableColumn.cell` for the constraints this places on cell content.
 */
function DataTable<T>({columns, rows, rowKey, className}: DataTableProps<T>) {
    return (
        <div className={cn("overflow-hidden rounded-lg border bg-card", className)}>
            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column.id} className={column.className}>
                                    {column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={rowKey(row)}>
                                {columns.map((column) => (
                                    <TableCell key={column.id} className={column.className}>
                                        {column.cell(row)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <ul role="list" className="divide-y md:hidden">
                {rows.map((row) => (
                    <li key={rowKey(row)} className="flex flex-col gap-2 p-4">
                        {columns.map((column) => (
                            <div
                                key={column.id}
                                className="flex items-start justify-between gap-4"
                            >
                                <span className="text-sm text-muted-foreground">
                                    {column.header}
                                </span>
                                <span className="min-w-0 text-right text-sm">
                                    {column.cell(row)}
                                </span>
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export {DataTable}
