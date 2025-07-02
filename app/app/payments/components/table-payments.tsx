
import { IClient } from "@/app/types/client.type";
import { formatterDateAPI } from "@/app/utils/formatter-date";
import { formatPhoneNumber } from "@/app/utils/formatter-phone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BadgeDollarSign, Plus, ToggleLeft, ToggleRight, UserCircle } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import FilterTable from "./filter-table";
import { PaginationTableClient } from "./pagination-client";
import { IPayment } from "@/app/types/payment";
import formatterPrice from "@/app/utils/formmatter-price";
import BadgeTable from "@/components/badge-table";

interface PaginationProps {
  payments: IPayment[];
  page: string | number;
}

export default function TablePayments({ payments, page }: PaginationProps) {

  return(
    <Card className="w-full hidden md:flex min-h-[668px]  flex-col justify-between">
      <CardHeader >
        <CardTitle>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <span><BadgeDollarSign /></span>
            <span className="font-semibold italic uppercase">Pagamentos</span>
            </h2>
        </CardTitle>
          <Separator className="mt-2 mb-4" />
        <div className="flex items-center justify-between w-full mt-2 space-y-4">
          <Link 
            href="/app/payments/register"
            prefetch={false}
            passHref={true}
            className="bg-indigo-500 hover:bg-indigo-600 shadow-2xl font-semibold text-white cursor-pointer flex items-center justify-center px-4 py-2 rounded-xs"
            >
      
                <Plus className="mr-1" width={15} />
                <span>Novo Pagamento</span>
         
          </Link>
          <FilterTable />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {payments.length === 0 ? (
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
              <TableHead>Status Assinatura</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data Pagamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="space-y-5">
            {payments.map((item) => (
              <TableRow  key={item.id} className="cursor-pointer  hover:bg-indigo-400 hover:text-white" >
                <TableCell  className="py-4"><Link href={`/app/payments/${item.id}`}><UserCircle className="text-2xl" /></Link></TableCell>
                <TableCell><Link href={`/app/payments/${item.id}`}>{item.client.name}</Link></TableCell>
                <TableCell >
                  <Link href={`/app/payments/${item.id}`}>
                    <BadgeTable isActive={item?.sign?.activeSign} />
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/app/payments/${item.id}`}>
                     { formatterPrice(item.value)}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/app/payments/${item.id}`}>
                     { item.createdAt && formatterDateAPI(item.createdAt) }
                  </Link>
                </TableCell>
              </TableRow>
              ))}   
          </TableBody>
        </Table>)}
      </CardContent>
      <PaginationTableClient page={page} />
    </Card>
  )
}