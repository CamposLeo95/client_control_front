'use server'

import { IClient } from "@/app/types/client.type";
import axios from "axios";
import { cookies } from "next/headers";

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export default async function getClientById(id: string) {

  try {
    const token = (await cookies()).get("api-token")?.value;
    const res = await axios.get<IClient>(`${URL_API}/client/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return res.data;
    
  } catch (error) {
      return null
  }
}