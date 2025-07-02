import { cookies } from "next/headers";
import FormCreatePayment from "../components/forms/form-create-payments";
import axios from "axios";
const URL_API = process.env.NEXT_PUBLIC_API_URL;

export default async function Register(){
  const token = (await cookies()).get("api-token")?.value;

  const {data: clients} =  await axios.get(`${URL_API}/client`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const {data: services} =  await axios.get(`${URL_API}/service-offerring`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

  return(
    <div className="flex items-center justify-center ">
      <FormCreatePayment 
        clients={clients} 
        services={services} 
      />
    </div>
  )
}