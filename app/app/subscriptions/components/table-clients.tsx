
import { formatterDateAPI } from "@/app/utils/formatter-date";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, CheckCircle, CircleCheck, FileArchive, UserCircle, X } from "lucide-react";

import { ISign } from "@/app/types/sign.type";
import formatterPrice from "@/app/utils/formmatter-price";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import FilterTable from "./filter-table";
import { PaginationTableClient } from "./pagination-client";
import BadgeTable from "@/components/badge-table";

interface PaginationProps {
  subscriptions: ISign[];
  page: string | number;
}

export default function TableSubscriptions({ subscriptions, page }: PaginationProps) {

  return(
    <Card className="w-full hidden md:flex min-h-[668px]  flex-col justify-between">
      <CardHeader >
        <CardTitle>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <span><FileArchive /></span>
            <span className="uppercase italic">Assinaturas</span>
            </h2>
        </CardTitle>
         <Separator className="mt-2 mb-4" />
        <div className="flex items-center justify-end w-full mt-2 space-y-4">
          
          <FilterTable />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {subscriptions.length === 0 ? (
         <div className="flex items-center justify-center h-80 flex-col gap-4 ">
            <Image src="/error-404.png" alt="Admin Panel"  width={80} height={80}/>
            <span className="text-gray-500 font-semibold">Nenhum cliente encontrado!</span>
          </div>
        ) : (
        <Table >
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead></TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data de Expiração</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="space-y-5">
            {subscriptions.map((item) => (
              <TableRow  key={item.id} className="cursor-pointer  hover:bg-indigo-400 hover:text-white" >
                <TableCell  className="py-4"><Link href={`/app/subscriptions/${item.id}`}><UserCircle className="text-2xl" /></Link></TableCell> 
                <TableCell><Link href={`/app/subscriptions/${item.id}`}>{item.client.name}</Link></TableCell>
                <TableCell><Link href={`/app/subscriptions/${item.id}`}>{item.serviceOffering.name}</Link></TableCell> 
                <TableCell><Link href={`/app/subscriptions/${item.id}`}>{formatterPrice(item.serviceOffering.price)}</Link></TableCell>
                <TableCell>
                  <Link href={`/app/subscriptions/${item.id}`}>
                    <BadgeTable isActive={item?.activeSign} />
                  </Link>
                </TableCell>
                <TableCell><Link href={`/app/subscriptions/${item.id}`}>{formatterDateAPI(item.expireDate)}</Link></TableCell> 
              </TableRow>
              ))}   
          </TableBody>
        </Table>)}
      </CardContent>
      <PaginationTableClient page={page} />
    </Card>
  )
}