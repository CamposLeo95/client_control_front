
import { cookies } from "next/headers";
import TableClients from "./components/table-clients";

interface Props {
  searchParams: Promise<{ page?: string; size?: string }>;
}

export default async function ClientsPage({ searchParams }: Props) {
  const token = (await cookies()).get("api-token")?.value;
  const sp = await searchParams;

  const page = Number(sp.page ?? '0');
  const size = Number(sp.size ?? '5');

  console.log("Fetching clients with page:", page, "and size:", size);


  const res = await fetch(`http://localhost:8080/client?page=${page}&size=${size}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

  const data = await res.json();

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center p-8 md:px-28 gap-8">
      <h1>Clients Page</h1>
        <TableClients clients={data} currentPage={page} />
      </div>
    </div>
  );
}