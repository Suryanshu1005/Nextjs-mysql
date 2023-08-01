"use client";

import {DataTable} from "@/components/canvas/data-table";
import { SuggestionColumn, columns } from "./column";

interface SuggestionClientProps {
    data : SuggestionColumn[]
}

export const SuggestionClient: React.FC<SuggestionClientProps> = ({ data }) => {
    return (
        <>
            <div>
                <h2>Total Suggestions {data.length}</h2>
            </div>
            <DataTable  searchKey="title" columns={columns} data={data}/>
        </>
    )
}