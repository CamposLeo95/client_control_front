'use server';

import axios from "axios";
import { cookies } from "next/headers";
const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function toggleSubscription(prevState: any, _formData: FormData) {
  const token = await (await cookies()).get("api-token")?.value;

  try {
    const res = await axios.put(`${URL_API}/sign/toggle/${prevState.id}`, {}, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    if (res.status !== 200) {
      throw new Error(`Erro ao alternar assinatura: ${res.status}`);
    }

    return {
      id: prevState.id,
      verifyReq: true,
      message: "",
      isSuccess: true
    }
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || error.message;
    }
  }
}
