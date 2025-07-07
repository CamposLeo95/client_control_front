"use server"

import axios from "axios";

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function updatePassAction(_prevState: any, formData: FormData) {
  const {password, confirmPassword, token} = Object.fromEntries(formData.entries());

  if(password.toString().length < 6) {
    return {  
      verifyReq: false,
      message: "A senha deve ter pelo menos 6 caracteres!",
      isSuccess: false,
    }
  }

  if (password !== confirmPassword) {
    return {
      verifyReq: false,
      message: "As senhas não conferem!",
      isSuccess: false,
    }
  }

  try {
    const res = await axios.put(`${URL_API}/user/update-password/${token}`,
      { password }, 
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    console.log("Response:", res.status, res.data);
    if (res.status !== 200) {
      throw new Error(`Erro ao atualizar senha!`);
    }

    return {
      verifyReq: true,
      message: "Senha atualizada com sucesso!",
      isSuccess: true,
    }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios Error:", error.response?.status, error.response?.data);
         return {
            verifyReq: true,
            message: error.response?.data || error.message,
            isSuccess: false,
          }
      }
      return {
        verifyReq: true,
        message: "Erro interno ao atualizar senha. Tente novamente mais tarde!",
        isSuccess: false,
      }
    }

}