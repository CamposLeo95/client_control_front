'use server';

import axios from "axios";
import { cookies } from "next/headers";
const URL_API = process.env.NEXT_PUBLIC_API_URL;

export  async function editSubscriptionDescription(
  prevState: any,
  formData: FormData
) {
  const token = (await cookies()).get("api-token")?.value;

  const { description, id } = Object.fromEntries(formData.entries());

  try {

    const res = await axios.put(
      `${URL_API}/sign/description/${id}`,
      { description },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status !== 200) {
      throw new Error(`Erro ao editar descrição: ${res.status}`);
    }

    return {
      id: prevState.id,
      verifyReq: true,
      message: "",
      isSuccess: true,
    };
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
      message: "Erro interno ao editar descrição. Tente novamente mais tarde!",
      isSuccess: false,
    };
  }
}