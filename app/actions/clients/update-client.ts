"use server"

import axios from "axios";
import { cookies } from "next/headers";

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function updateClient(_prevState: any, formData: FormData) {
    const token = (await cookies()).get("api-token")?.value;
    const {name, login, phone, email, password, id} = Object.fromEntries(formData.entries());

    console.log("Updating client with ID:", id);
    try {
    const res = await axios.put(`${URL_API}/client/${id}`,
      { name, phone, email, login, password }, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (res.status !== 200) {
      throw new Error(`Erro ao atualizar cliente: ${res.status}`);
    }

    return {
      verifyReq: true,
      message: "Cliente atualizado com sucesso!",
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
        message: "Erro interno ao atualizar cliente. Tente novamente mais tarde!",
        isSuccess: false,
      }
    }
}