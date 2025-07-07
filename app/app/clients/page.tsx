
import axios from "axios";
import { cookies } from "next/headers";
import TableClients from "./components/table-clients";
import TableClientsMobile from "./components/table-clients-mobile";

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

const URL_API = process.env.NEXT_PUBLIC_API_URL;
export default async function ClientsPage({ searchParams }: Props) {
  const token = (await cookies()).get("api-token")?.value;
  const searchParamsRes = await searchParams;
  const {data} = await axios.get(`${URL_API}/client`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    params: {
      page: searchParamsRes.page || 0,
      size: 7,
      all: searchParamsRes.all || "",
      startDate: searchParamsRes.startDate || "2000-01-01",
      endDate: searchParamsRes.endDate || "3000-01-01",
    }
  });



  return (
    <div>
      <div className="flex flex-col items-center  justify-center md:px-4 gap-8">
          <TableClients clients={data} page={searchParamsRes.page || 0} />
          <TableClientsMobile clients={data} page={searchParamsRes.page || 0} />
      </div>
    </div>
  );
}