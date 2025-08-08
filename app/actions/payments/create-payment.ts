'use server'
import { cookies } from "next/headers";
import axios from "axios";
const URL_API = process.env.NEXT_PUBLIC_API_URL;

type BodyProps = {
  clientId: number | null;
  serviceId: number | null;
  valueService: number;
  description?: string;
  manualDate?: string | null;
}

export default async function createPayment(_prevState: any, body: BodyProps) {
  const token = (await cookies()).get("api-token")?.value;
  
  if (!body.clientId) {
    return {
      verifyReq: false,
      message: "O cliente é obrigatório!",
      isSuccess: false,
    };
  }

  if (!body.serviceId) {
    return {
      verifyReq: false,
      message: "O serviço é obrigatório!",
      isSuccess: false,
    };
  }

  try {
    const res = await axios.post(`${URL_API}/payment`, {
      client_id: body.clientId,
      serviceOffering_id: body.serviceId,
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
      message: "Erro ao realizar pagamento",
      isSuccess: false,
    };
  }
}