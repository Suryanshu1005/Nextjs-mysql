import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
// import { useRouter } from "next/router";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    console.log("params: ", params)
    try {
        if (!params.id) {
            return new NextResponse("UserId is required", { status: 400 });
        }

        const user = await prismadb.user.findUnique({
            where: {
                id: params.id
            }
        })
        console.log('user: ', user)
        return NextResponse.json(user)
    } catch (error) {
        console.log('[BILLBOARD_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }

}
