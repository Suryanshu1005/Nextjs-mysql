import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { RegisterUserInput, RegisterUserSchema } from "@/lib/validations/user.schema";
import bcrypt from "bcryptjs";

export async function POST(
    req: Request,
) {
    const body = await req.json()
    const { email, password,username, password2 } = body;
    

    const alreadyExists = await prismadb.user.findUnique({where: { email: email }})

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt) 

    if(alreadyExists) {
        return NextResponse.json({error: "User already Exist"}, { status: 400 })
    }

    const newUser = await prismadb.user.create({
        data: {
            email,
            username,
            password : hashPassword,
            password2,
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



