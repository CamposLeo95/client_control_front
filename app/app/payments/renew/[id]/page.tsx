import axios from "axios";
import { cookies } from "next/headers";
import FormUpdatePayment from "../../components/forms/form-update-payments";
import { ISign } from "@/app/types/sign.type";


interface PaymentProps {
	params: Promise<{ id: string }>;
}

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export default async function Renew({ params }: PaymentProps) {
  const { id } = await params;
  const token = (await cookies()).get("api-token")?.value;

  const {data: sign} = await axios.get<ISign>(`${URL_API}/sign/${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });


  return(
    <div className="flex items-center justify-center ">
      <FormUpdatePayment  subscription={sign}  />
    </div>
  )
}