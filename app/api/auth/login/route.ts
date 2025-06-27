

import { AuthService } from "@/app/services/Auth.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const authService = new AuthService();

export async function POST(req: NextRequest) {
  const { login, password } = await req.json();

  try {
    const {token, userid} = await authService.login(login, password); 
    const response = NextResponse.json({ok: true});

    response.cookies.set({
      name: "api-token",
      value: token,
      httpOnly: true,
      // secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 2,
    })

     response.cookies.set({
      name: "api-user_id",
      value: userid,
      httpOnly: true,
      // secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 2,
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: "Login inválido" }, { status: 401 });
  }
}