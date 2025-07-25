'use server'
import { cookies } from "next/headers";
import axios from "axios";
const URL_API = process.env.NEXT_PUBLIC_API_URL;

type BodyProps = {
  signId: number;
  valueService: number;
  description?: string;
  manualDate?: string | null;
}

export default async function renewPayment(_prevState: any, body: BodyProps) {
  const token = (await cookies()).get("api-token")?.value;

  try {
    const res = await axios.post(`${URL_API}/payment`, {
      sign_id: body.signId,
      value: body.valueService,
      description: body.description,
      manual_date: body.manualDate,
    }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

    if (res.status !== 201) {
      return {
        verifyReq: false,
        message: "Erro ao realizar pagamento",
        isSuccess: false,
      };
    }
    return {
      verifyReq: true,
      message: "Pagamento realizado com sucesso!",
      isSuccess: true
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        verifyReq: false,
        message: error.response?.data?.message || "Erro ao realizar pagamento",
        isSuccess: false,
      };
    }
    return {
      verifyReq: false,
      message: "Erro ao realizar pagamento",
      isSuccess: false,
    };
  }
}