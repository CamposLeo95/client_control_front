import { IClient } from "@/app/types/client.type";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CardsClientMobile from "./cards-client-mobile";
import FilterTable from "./filter-table";
import { PaginationTable } from "@/components/pagination";


interface PaginationProps {
  clients: IClient[];
  page: string | number;
}

export default function TableClientsMobile({ clients, page }: PaginationProps) {
  return (
    <div className="w-full px-4 block md:hidden">
      <div className="flex items-center justify-between w-full mt-4">
        <Link
          href="/app/clients/register"
          prefetch={false}
          passHref={true}
          className="bg-indigo-500 hover:bg-indigo-600 shadow-lg font-semibold text-white flex items-center justify-center px-4 py-2 rounded-md text-sm"
        >
          <Plus className="mr-1" width={15} />
          <span>Novo Cliente</span>
        </Link>

        <FilterTable />
      </div>

      <Separator className="my-4" />

      <div className="min-h-[400px] space-y-3">
        {clients.length === 0 ? (
          <div className="flex items-center justify-center h-96 flex-col gap-4">
            <Image src="/error-404.png" alt="Admin Panel" width={80} height={80} />
            <span className="text-gray-500 font-semibold">Nenhum cliente encontrado!</span>
          </div>
        ) : (
          clients.map((client) => <CardsClientMobile key={client.id} client={client} />)
        )}
      </div>

      <div className="mt-6">
        <PaginationTable route="/app/clients" page={page} />
      </div>
    </div>
  );
}
