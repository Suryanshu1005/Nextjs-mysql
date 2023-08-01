import { SuggestionClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { SuggestionColumn } from "./components/column";

const Homepage = async ({
  params
}: {
  params: { userid: string }
}) => {

  const suggestions = await prismadb.suggestion.findMany({
    where: {
      userId: params.userid
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedSuggestions: SuggestionColumn[] = suggestions.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-1">
      <div className="flex-col space-y-4 p-8 pt-6">
        <SuggestionClient data={formattedSuggestions} />
      </div>
    </div>
  )
}

export default Homepage;
