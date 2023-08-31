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

export async function PATCH(
    req: Request,
    { params }: { params: { suggestionId: string, userid: string } }
) {
    try {

        const body = await req.json();

        const { title, description } = body;
        if (!params.suggestionId) {
            return new NextResponse("Suggestion Id is required", { status: 400 })
        }

        if (!params.userid) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!title) {
            return new NextResponse("Title is required", { status: 400 });
        }

        if (!description) {
            return new NextResponse("Description is required", { status: 400 });
        }

        const suggestionsUpdate = await prismadb.suggestion.update({
            where : {
                id : params.suggestionId
            },
            data: {
                title,
                description,
                userId: params.userid
            }
        })

        return NextResponse.json(suggestionsUpdate)
    } catch (error) {
        console.log("[Suggestion_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}