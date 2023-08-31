import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = new NextResponse(JSON.stringify({ status: "success" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  await Promise.all([
    response.cookies.set({
      name: "cookie",
      value: "",
      maxAge: -1,
    }),
  ]);

  return response;
}