
import { IService } from "@/app/types/services.type";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// import { PaginationTableClient } from "./pagination-client";
import { PaginationTable } from "@/components/pagination";
import CardServiceMobile from "./cards-service-mobile";
import FilterTableServices from "./filter-table";

interface PaginationProps {
  services: IService[];
  page: string | number;
}

export default function TableServicesMobile({ services, page }: PaginationProps) {

  return(

    <div className="w-full space-y-2 block md:hidden">
      <div className="flex items-center justify-between w-full mt-2">
          <Link 
            href="/app/services/register"
            prefetch={false}
            passHref={true}
            className="bg-indigo-400 hover:bg-indigo-500 text-white cursor-pointer flex items-center justify-center px-4 py-2 rounded-md"
            >
                <Plus className="mr-1" width={15} />
                <span>Novo Serviço</span>
          </Link>
          <FilterTableServices />
        </div>
        <Separator className="my-4" />
        <div className=" min-h-[400px] spac">
      {services.length === 0 ? (
        <div className="flex items-center justify-center h-96 flex-col gap-4 ">
            <Image src="/error-404.png" alt="Admin Panel" width={80} height={80}/>
            <span className="text-gray-500 font-semibold">Nenhum serviço encontrado!</span>
          </div>
        ) : (
          services.map((service) => (
            <CardServiceMobile key={service.id} service={service} />
          ))
        )}
        </div>
      <PaginationTable route="/app/services" page={page} />
    </div>
  )
}