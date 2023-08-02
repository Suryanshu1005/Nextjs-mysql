import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function DELETE(
    req: Request,
    { params }: {
        params: { userid: string, suggestionId: string }
    }) {
    try {
        if (!params.userid) {
            return new NextResponse("Unauthenticated", { status: 403 })
        }

        if (!params.suggestionId) {
            return new NextResponse("suggestions id is required", { status: 403 })
        }

        const suggestionByUser = await prismadb.user.findFirst({
            where: {
                id: params.userid
            }
        })

        if (!suggestionByUser) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const suggestionDelete = await prismadb.suggestion.delete({
            where: {
                id: params.suggestionId
            }
        })

        return NextResponse.json(suggestionDelete);
    } catch (error) {
        console.log('[SUGGESTION_DELETE]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: {
        params: { suggestionId: string }
    }) {
    try {
        if (!params.suggestionId) {
            return new NextResponse("Suggestion id is required", { status: 400 });
        }

        const suggestions = await prismadb.suggestion.findUnique({
            where: {
                id: params.suggestionId
            }
        });

        return NextResponse.json(suggestions);
    } catch (error) {
        console.log('[SUGGESTIONS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}