"use server"

import axios from "axios";
import { cookies } from "next/headers";

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function createClient(_prevState: any, formData: FormData) {
    const token = (await cookies()).get("api-token")?.value;
    const {name, login, phone, email, password} = Object.fromEntries(formData.entries());

    if(name === "" || login === "" || password === ""){
      return {
        verifyReq: false,
        message: "Todos os campos são obrigatórios!",
        isSuccess: false,
      }
    }

    try {
    const res = await axios.post(`${URL_API}/client`,
      { name, phone, email, login, password }, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (res.status !== 201) {
      throw new Error(`Erro ao criar cliente: ${res.status}`);
    }

    return {
      verifyReq: true,
      message: "Cliente criado com sucesso!",
      isSuccess: true,
    }
  } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        const msg =
          typeof data === "string"
            ? data
            : (data && (data.message || data.error)) || error.message;

        return {
          verifyReq: false,
          message: msg,
          isSuccess: false
        };
      }
      return {
        verifyReq: false,
        message: "Erro interno ao cadastrar cliente. Tente novamente mais tarde!",
        isSuccess: false,
      }
    }
}