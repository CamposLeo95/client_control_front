'use server'

import { ISign } from "@/app/types/sign.type";
import axios from "axios";
import { cookies } from "next/headers";

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export default async function getSubscriptionById(id: string) {
  try {
    
    const token = (await cookies()).get("api-token")?.value;
    const res = await axios.get<ISign>(`${URL_API}/sign/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    return res.data;
  } catch (error) {
    return null
  }
}