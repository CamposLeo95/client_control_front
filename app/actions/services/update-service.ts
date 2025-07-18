'use server'

import axios from "axios";
import { cookies } from "next/headers";

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function updateService(_prevState: any, formData: FormData) {
  const token = (await cookies()).get("api-token")?.value;
  const { name, price, id } = Object.fromEntries(formData.entries());

  try {
    const res = await axios.put(`${URL_API}/service-offerring/${id}`, 
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

    if (res.status !== 200) {
      throw new Error(`Erro ao atualizar serviço: ${res.status}`);
    }

    return {
      verifyReq: true,
      message: "Serviço atualizado com sucesso!",
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
        message: "Erro interno ao atualizar serviço. Tente novamente mais tarde!",
        isSuccess: false,
      }
    }

}