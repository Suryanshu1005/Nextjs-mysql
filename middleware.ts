import { NextRequest } from "next/server";


export function middleware(req: NextRequest) {
    let cookie = req.cookies.get('cookie') 
    const userdata = cookie?.value
}