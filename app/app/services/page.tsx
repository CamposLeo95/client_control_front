
import axios from "axios";
import { cookies } from "next/headers";

import { IService } from "@/app/types/services.type";
import TableServices from "./components/table-services";
import TableServicesMobile from "./components/table-services-mobile";

type IParams = {
  page?: string;
  size?: string;
  name?: string;
}

interface Props {
  searchParams: Promise<IParams>;
}

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export default async function ServicesPage({ searchParams }: Props) {
  const token = (await cookies()).get("api-token")?.value;
  const searchParamsRes = await searchParams;

  const {data: services} = await axios.get<IService[]>(`${URL_API}/service-offerring`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    params: {
      page: searchParamsRes.page || 0,
      size: 7,
      name: searchParamsRes.name || "",
    }
  });

  return (
    <div>
      <div className="flex flex-col items-center justify-center md:px-4 gap-8">
        <TableServices services={services} page={searchParamsRes.page || 0} />
        <TableServicesMobile services={services} page={searchParamsRes.page || 0} />
      </div>
    </div>
  );
}