import prismadb from "@/lib/prismadb";
import { CardDemo } from "./components/card";
import { SuggestionColumn } from "../(homepage)/suggestions/components/column";
import { format } from "date-fns";


const CardPage = async ({
    params
  }: {
    params: { userid: string, suggestionId : string }
  }) => {
  
    const suggestions = await prismadb.suggestion.findMany({
      where: {
        userId: params.userid
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  
    const formattedSuggestions: SuggestionColumn[] = suggestions.map((item, key) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }))
    return ( 
        <div className="flex ml-10 mt-10">
            <CardDemo data={formattedSuggestions}  />
        </div>
     );
}
 
export default CardPage;