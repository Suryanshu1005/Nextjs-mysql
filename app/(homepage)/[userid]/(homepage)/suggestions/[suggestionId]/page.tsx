import prismadb from "@/lib/prismadb"
import SuggestionForm from "./components/suggestion-page";

const SuggestionPage = async (
    { params }: { params:{ suggestionId : string } }
    ) => {
        const suggestion = await prismadb.suggestion.findUnique({
            where : {
                id : params.suggestionId
            }
        });

        return (
            <div className="flex-1">
                <div className="flex-col space-y-4 p-8 pt-2">
                    <SuggestionForm initialData={suggestion} />
                </div>
            </div>
        )
}

export default SuggestionPage;