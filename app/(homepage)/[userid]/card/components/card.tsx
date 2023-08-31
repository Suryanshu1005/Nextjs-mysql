"use client";

import { DataTable } from "@/components/canvas/data-table";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { Suggestion } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Dessert, PenIcon, PenTool, WorkflowIcon } from "lucide-react";
import { SuggestionColumn, columns } from "../../(homepage)/suggestions/components/column";
import { CellAction } from "../../(homepage)/suggestions/components/cell-action";
import DataCard from "./data-card";

interface SuggestionClientProps {
    data: SuggestionColumn[],
}

export const CardDemo: React.FC<SuggestionClientProps> = ({ data, ...props }) => {

    const params = useParams()
    const router = useRouter()

    console.log("datainsuggestion", data)
    return (
        <>
            <div className="mb-10">
                <div className="flex flex-row gap-2">
                    {data.map((item) => (
                        <div className="flex">
                            <Card className={cn("w-[330px]")} {...props}>
                                <CardHeader>
                                    <CardTitle className="flex gap-3 mb-5 text-base">
                                        <PenTool size={14} className="mt-1" />
                                        {item.title}
                                    </CardTitle>
                                    <CardContent className="flex ml-[-16px] gap-2">
                                        <WorkflowIcon />
                                        {item.description}
                                    </CardContent>
                                </CardHeader>
                            </Card >  
                        </div>
                    ))}
                </div>
            </div>
            <Button
                auto
                color="secondary"
                onPress={() => router.push(`/${params.userid}/suggestions/new`)}
            >
                Add a new Suggestion
            </Button>
        </>
    )
}