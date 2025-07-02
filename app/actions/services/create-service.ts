'use server'

import axios from "axios";
import { cookies } from "next/headers";

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function createService(_prevState: any, formData: FormData) {
  const token = (await cookies()).get("api-token")?.value;
  const { name, price } = Object.fromEntries(formData.entries());

  if (name === "" || price === "") {
    return {
      verifyReq: false,
      message: "Todos os campos são obrigatórios!",
      isSuccess: false,
    };
  }

  try {
    const res = await axios.post(`${URL_API}/service-offerring`, 
      {
        name,
        price
      }, 
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
  );

    if (res.status !== 201) {
      throw new Error(`Erro ao criar serviço: ${res.status}`);
    }

    return {
      verifyReq: true,
      message: "Serviço criado com sucesso!",
      isSuccess: true,
    }
  } catch (error) {
  if (axios.isAxiosError(error)) {
      return error.response?.data || error.message;
    }
    return "Erro interno ao criar serviço. Tente novamente mais tarde!";
  }

}