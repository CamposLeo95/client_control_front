
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

const data = await fetch("http://localhost:8080/client?page=0&size=5", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  const res = await data.json();

  return NextResponse.json({ message: "Dashboard API is working", data: res }, { status: 200 });
}