
import { checkDateExpired, formatterDateAPI } from "@/app/utils/formatter-date";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, AlertOctagon, Check, CheckCircle, CircleCheck, FileArchive, FilePenLine, UserCircle, X } from "lucide-react";

import { ISign } from "@/app/types/sign.type";
import formatterPrice from "@/app/utils/formmatter-price";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import FilterTable from "./filter-table";

import BadgeTable from "@/components/badge-table";
import { PaginationTableSubscription } from "./pagination-subscription";

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
         <Separator className="mt-2 mb-7" />
        <div className="flex items-center justify-end w-full mt-2 space-y-4">
          
          <FilterTable />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {subscriptions.length === 0 ? (
         <div className="flex items-center justify-center h-80 flex-col gap-4 ">
            <Image src="/error-404.png" alt="Admin Panel"  width={80} height={80}/>
            <span className="text-gray-500 font-semibold">Nenhuma assinatura encontrada!</span>
          </div>
        ) : (
        <Table >
          <TableHeader>
              <TableRow className="bg-indigo-500 hover:bg-indigo-500">
              <TableHead></TableHead>
              <TableHead className="text-white text-center">Cliente</TableHead>
              <TableHead className="text-white text-center">Login</TableHead>
              <TableHead className="text-white text-center">Serviço</TableHead>
              <TableHead className="text-white text-center">Valor</TableHead>
              <TableHead className="text-white text-center">Status</TableHead>
              <TableHead className="text-white text-center">Data de Expiração</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="space-y-5">
            {subscriptions.map((item) => (
              <TableRow  key={item.id} className="cursor-pointer  hover:bg-indigo-400 hover:text-white" >
                <TableCell  className="py-4 text-center"><Link href={`/app/subscriptions/${item.id}`}><FilePenLine className="text-2xl text-indigo-600" /></Link></TableCell> 
                <TableCell className="text-center"><Link href={`/app/subscriptions/${item.id}`}>{item.client.name}</Link></TableCell>
                <TableCell className="text-center"><Link href={`/app/subscriptions/${item.id}`}>{item.client.login}</Link></TableCell>
                <TableCell className="text-center"><Link href={`/app/subscriptions/${item.id}`}>{item.serviceOffering.name}</Link></TableCell> 
                <TableCell className="text-center"><Link href={`/app/subscriptions/${item.id}`}>{formatterPrice(item.serviceOffering.price)}</Link></TableCell>
                <TableCell className="flex items-center justify-center">
                  <Link href={`/app/subscriptions/${item.id}`}>
                    <BadgeTable isActive={item?.activeSign} />
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <Link href={`/app/subscriptions/${item.id}`}>
                  
                  <span>
                    <span>{!checkDateExpired(item.expireDate) 
                      ? <div className="flex items-center justify-center gap-2 text-green-600">
                          <CheckCircle width={14}  /> 
                          <span>
                            {formatterDateAPI(item.expireDate)}
                          </span>
                        </div>
                      : <div className="flex items-center justify-center gap-2 text-red-500">
                          <AlertOctagon width={14}  />
                          <span>
                            {formatterDateAPI(item.expireDate)}
                          </span>
                        </div>
                    }</span>
                  </span>
            
                  </Link>
                </TableCell> 
              </TableRow>
              ))}   
          </TableBody>
        </Table>)}
      </CardContent>
      <PaginationTableSubscription page={page} />
    </Card>
  )
}