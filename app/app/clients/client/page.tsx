
import axios from "axios";
import { cookies } from "next/headers";
import TableClients from "../components/table-clients";
import TableClientsMobile from "../components/table-clients-mobile";


type IParams = {
  page?: string;
  size?: string;
  all?: string;
  startDate?: string;
  endDate?: string;
}

interface Props {
  searchParams: Promise<IParams>;
}

export default async function ClientPage({ searchParams }: Props) {
  const token = (await cookies()).get("api-token")?.value;
  const searchParamsRes = await searchParams;
  const {data} = await axios.get(`http://localhost:8080/client`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    params: {
      page: searchParamsRes.page || 0,
      size: 5,
      all: searchParamsRes.all || "",
      startDate: searchParamsRes.startDate || "2000-01-01",
      endDate: searchParamsRes.endDate || "3000-01-01",
    }
  });

  return (
    <div>
      <div className="flex flex-col items-center justify-center md:px-4 gap-8">
        <TableClients clients={data} page={searchParamsRes.page || 0} />
        <TableClientsMobile clients={data} page={searchParamsRes.page || 0} />
      </div>
    </div>
  );
}