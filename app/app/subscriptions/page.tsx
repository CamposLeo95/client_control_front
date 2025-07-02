
import { ISign } from "@/app/types/sign.type";
import axios from "axios";
import { cookies } from "next/headers";
import TableSubscriptions from "./components/table-clients";
import TableSubscriptionMobile from "./components/table-clients-mobile";

type IParams = {
  page?: string;
  size?: string;
  client?: string;
  startDate?: string;
  endDate?: string;
}

interface Props {
  searchParams: Promise<IParams>;
}

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export default async function SubscriptionPage({ searchParams }: Props) {
  const token = (await cookies()).get("api-token")?.value;
  const searchParamsRes = await searchParams;
  const {data} = await axios.get<ISign[]>(`${URL_API}/sign`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    params: {
      page: searchParamsRes.page || 0,
      size: 7,
      client: searchParamsRes.client || "",
      startDate: searchParamsRes.startDate || "2000-01-01",
      endDate: searchParamsRes.endDate || "3000-01-01",
    }
  });

  return (
    <div>
      <div className="flex flex-col items-center justify-center md:px-4 gap-8">
        <TableSubscriptions subscriptions={data} page={searchParamsRes.page || 0} />
        <TableSubscriptionMobile subscriptions={data} page={searchParamsRes.page || 0} />
      </div>
    </div>
  );
}