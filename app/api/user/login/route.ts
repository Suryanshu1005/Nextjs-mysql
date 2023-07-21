import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { toast } from "react-hot-toast";

export async function POST(
    req:Request
    ) {
    try {
        const body = await req.json();
        const { email, password } = body;

        //check if user exists or not

        const userExist = await prismadb.user.findUnique({
            where : {
                email
            }
        })

        if(!userExist) {
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        if(!email || !password) {
            return NextResponse.json({ message : "Please Enter all credentials"})
        }

        //check if password is correct or not

        const passwordMatch = await bcryptjs.compare(password, userExist.password);
        if(!passwordMatch) {
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        const tokenData = {
            username: userExist.username,
            email: userExist.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}