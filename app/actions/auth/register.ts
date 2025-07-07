"use server"

import axios from "axios";

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function registerAction(_prevState: any, formData: FormData) {
  const {name, email, login, password} = Object.fromEntries(formData.entries());
    try {
    const res = await axios.post(`${URL_API}/user`,
      { name, email, login, password, role: "USER" }, 
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    if (res.status !== 200) {
      throw new Error(`Erro ao cadastrar usuario!`);
    }

    return {
      verifyReq: true,
      message: "Cadastro realizado com sucesso!",
      isSuccess: true,
    }
   } catch (error) {
      if (axios.isAxiosError(error)) {
         return {
            verifyReq: true,
            message: error.response?.data || error.message,
            isSuccess: false,
          }
      }
      return {
        verifyReq: true,
        message: "Erro interno ao cadastrar usuario. Tente novamente mais tarde!",
        isSuccess: false,
      }
    }
}