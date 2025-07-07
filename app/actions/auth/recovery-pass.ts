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

    console.log("Response:", res.status, res.data);
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
        console.log("Axios Error:", error.response?.status, error.response?.data);
         return {
            verifyReq: false,
            message: error.response?.data || error.message,
            isSuccess: false,
          }
      }
      return {
        verifyReq: false,
        message: "Erro interno ao enviar o link de recuperação. Tente novamente mais tarde!",
        isSuccess: false,
      }
    }

}