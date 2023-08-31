import { COOKIE_NAME } from "@/constants"
import { verify, decode } from "jsonwebtoken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function GET() {
    const cookieStore = cookies()

    const token = cookieStore.get(COOKIE_NAME)

    if (!token) {
        return NextResponse.json({
            message: "Unauthorized",
        },
            {
                status: 400,
            }
        )
    }

    if(!token) {
        redirect('/')
    }

    const { value } = token;

    const secret = process.env.TOKEN_SECRET || ""

    try {
        verify(value, secret)
        const response = {
            user : decode(value)
        };

        return new Response(JSON.stringify(response), {
            status: 200,
        })
    } catch (e) {
        return NextResponse.json(
            {
                message : "Something went wrong"
            },
            {
                status : 400, 
            }
        )
    }
}