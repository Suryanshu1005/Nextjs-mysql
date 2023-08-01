import prismadb from "@/lib/prismadb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: { userid: string } }
) {
    try {
        const user = cookies().get('cookie');

        const body = await req.json()

        const { title, description } = body;

        if(!user) {
            return new NextResponse("Unauthenticated", { status : 400 })
        }

        if(!title) {
            return new NextResponse("Title is required", { status : 400 })
        }

        if(!description) {
            return new NextResponse("description is required", { status : 400 })
        }

        if(!params.userid) {
            return new NextResponse("UserId is required", { status : 400 })
        }

        const suggestionByUser = await prismadb.user.findFirst({
            where : {
                id : params.userid,
            }
        })

        if(!suggestionByUser) {
            return new NextResponse("Unauthenticated", { status : 405 })
        }

        const suggestion = await prismadb.suggestion.create({
            data : {
                title,
                description,
                userId : params.userid
            }
        })

        return NextResponse.json({message : "Suggestion Created Successfully", suggestion})


    } catch (error) {
        console.log('[SUGGESTION_POST]', error)
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params } : { params : { userId : string }}
    ) {
        try {
            if(!params.userId) {
                return new NextResponse("Unauthenticated", { status : 400 })
            }

            console.log("Params in get user", params.userId)

            const suggestions = await prismadb.suggestion.findMany({
                where : {
                    userId : params.userId
                }
            })

            return NextResponse.json({message : "Suggestions fetched Successfully", suggestions})
        } catch (error) {
            console.log('[SUGGESTION_GET]', error)
            return new NextResponse("Internal error", { status: 500 });
        }
}