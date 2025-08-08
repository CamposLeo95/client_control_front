'use server'

import { IClient } from "@/app/types/client.type";
import { IService } from "@/app/types/services.type";
import axios from "axios";
import { cookies } from "next/headers";

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export default async function getServiceById(id: string) {
  try {
    const token = (await cookies()).get("api-token")?.value;
    const res = await axios.get<IService>(`${URL_API}/service-offerring/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return res.data;
    
  } catch (error) {
    return null
  }
}