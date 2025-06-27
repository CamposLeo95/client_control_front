
import { IClient } from "@/app/types/client.type";
import { formatterDateAPI } from "@/app/utils/formatter-date";
import { formatPhoneNumber } from "@/app/utils/formatter-phone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, User, UserCircle } from "lucide-react";
import Link from "next/link";
import FilterTable from "./filter-table";
import CardsClientMobile from "./cards-client-mobile";
import { Separator } from "@/components/ui/separator";
import { PaginationTableClient } from "./pagination-client";

interface PaginationProps {
  clients: IClient[];
  page: string | number;
}

export default function TableClientsMobile({ clients, page }: PaginationProps) {

  return(

    <div className="w-full space-y-2 block md:hidden">
      <div className="flex items-center justify-between w-full mt-2">
          <Link href="/app/clients/create" >
          <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
            <Plus className="mr-1" />
            <span>Novo Cliente</span>
          </Button>
          </Link>
          <FilterTable />
        </div>
        <Separator className="my-4" />
        <div className="bg-red-500 min-h-[400px] spac">

      {clients.map((client: IClient) => (
        <CardsClientMobile key={client.id} client={client} />
      ))}
        </div>
      <PaginationTableClient page={page} />
    </div>
  )
}