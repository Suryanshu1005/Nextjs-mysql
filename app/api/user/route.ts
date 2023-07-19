import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    const body = await req.json()
    const { email, password } = body;
    const newUser = await prismadb.user.create({
        data: {
            email,
            password
        }
    });
    return NextResponse.json({ message : "user created successfully", newUser})
}

export async function GET(
    req:Request,
    { params } : { params : { id: string }}
    ) {
    try {
        const users = await prismadb.user.findMany()
        return NextResponse.json({users : users})
    } catch (error) {
        console.log(error)
    }
}



