"use server"

import axios from "axios";
import { cookies } from "next/headers";

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function loginAction(_prevState: any, formData: FormData) {
  const {login, password} = Object.fromEntries(formData.entries());
    try {
    const res = await axios.post(`${URL_API}/auth/login`,
      { login, password }, 
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    (await cookies()).set({
      name: "api-token",
      value: res.data.token,
      httpOnly: true,
      path: "/",
    });

    if (res.status !== 200) {
      throw new Error(`Erro ao fazer login!`);
    }

    return {
      verifyReq: true,
      message: "Login realizado com sucesso!",
      isSuccess: true,
    }
   } catch (error) {
      if (axios.isAxiosError(error)) {
         return {
            verifyReq: false,
            message: error.response?.data || error.message,
            isSuccess: false,
          }
      }
      return {
        verifyReq: false,
        message: "Erro interno ao fazer login. Tente novamente mais tarde!",
        isSuccess: false,
      }
    }
}