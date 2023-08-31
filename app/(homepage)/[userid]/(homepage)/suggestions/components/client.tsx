"use client";

import { DataTable } from "@/components/canvas/data-table";
import { SuggestionColumn, columns } from "./column";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";

interface SuggestionClientProps {
    data: SuggestionColumn[]
}

export const SuggestionClient: React.FC<SuggestionClientProps> = ({ data }) => {

    const params = useParams()
    const router = useRouter()
    return (
        <div>
            <div>
                <h2 className="font-bold text-lg ">Total Suggestions {data.length}</h2>
            </div>
            <DataTable searchKey="title" columns={columns} data={data} />
                <Button
                key={1}
                 auto
                  color="secondary"
                  onPress={() => router.push(`/${params.userid}/suggestions/new`)}
                  >
                    Add a new Suggestion
                </Button>
        </div>
    )
}