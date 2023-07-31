import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { COOKIE_NAME, MAX_AGE } from "@/constants";



export async function POST(
    req: Request
) {
    try {
        const body = await req.json();
        const { email, password } = body;

        //check if user exists or not

        const userExist = await prismadb.user.findUnique({
            where: {
                email
            }
        })

        if (!userExist) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }

        if (!email || !password) {
            return NextResponse.json({ message: "Please Enter all credentials" })
        }

        //check if password is correct or not

        const passwordMatch = await bcryptjs.compare(password, userExist.password);
        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }

        const secrets = process.env.TOKEN_SECRET || "";

        const tokenData = {
            username: userExist.username,
            email: userExist.email,
            password: userExist.password,
            id: userExist.id
        }
        //create token
        const token = sign(
            tokenData,
            secrets!,
            {
                expiresIn: MAX_AGE,
            })

            

            const seralized = serialize(COOKIE_NAME, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite : "strict",
                maxAge: MAX_AGE,
                path: "/",
            }) 
        console.log('token: ', token)



        const response = {
            message: "Login successful",
            success: true,
        }

        
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Set-Cookie": seralized },
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}