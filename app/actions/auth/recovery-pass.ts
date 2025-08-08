"use server"

import axios from "axios";

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function recoveryPassAction(_prevState: any, formData: FormData) {
  const {email} = Object.fromEntries(formData.entries());

  try {
    const res = await axios.post(`${URL_API}/user/recovery-password`,
      { email }, 
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    if (res.status !== 200) {
      throw new Error(`Erro ao enviar o link de recuperação!`);
    }

    return {
      verifyReq: true,
      message: "Link de recuperação enviado para o email!",
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
        message: "Erro interno ao enviar o link de recuperação. Tente novamente mais tarde!",
        isSuccess: false,
      }
    }

}