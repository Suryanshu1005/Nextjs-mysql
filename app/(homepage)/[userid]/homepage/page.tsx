"use client";

import SuggestionPage from "@/components/suggestions/suggestions"
import { Button } from "@nextui-org/react"
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Home() {

  const params = useParams()

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div>
      <div className="flex justify-start m-10">
        <Link href={`/${params.userid}/suggestions`}>
          <Button auto color="secondary">
            Add a new Suggestion
          </Button>
        </Link>
      </div>

      {/* <div className="h-[500px] items-center relative flex justify-center before:absolute before:w-[480px] before:rounded-full before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] before:dark:bg-gradient-to-br before:dark:from-transparent before:lg:h-[360px] z-[1]">
        <h1 className="relative font-bold text-3xl dark:drop-shadow-[0_0_0.3rem_#ffffff70]">Future is within us</h1> */}
    </div>
    // </div>
    // </main>
  )
}
