"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action"

export type SuggestionColumn = {
    id : string,
    title : string,
    tags : string,
    description : string,
    createdAt : string,
}

export const columns : ColumnDef<SuggestionColumn>[] = [
    {
        accessorKey: "title",
        header : "Title"
    },
    {
        accessorKey: "description",
        header : "Description"
    },
    {
        accessorKey: "tags",
        header : "Tags"
    },
    {
        accessorKey: "createdAt",
        header: "Date"
    },
    {
        id: "actions",
        cell : ({ row }) => <CellAction data={row.original} />
    }
]

