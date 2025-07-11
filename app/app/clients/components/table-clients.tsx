
import { IClient } from "@/app/types/client.type";
import { formatterDateAPI } from "@/app/utils/formatter-date";
import { formatPhoneNumber } from "@/app/utils/formatter-phone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, User, UserCircle } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import FilterTable from "./filter-table";
import { PaginationTableClient } from "./pagination-client";

interface PaginationProps {
  clients: IClient[];
  page: string | number;
}

export default function TableClients({ clients, page }: PaginationProps) {

  return(
    <Card className="w-full hidden md:flex min-h-[668px]  flex-col justify-between">
      <CardHeader >
        <CardTitle>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <span><User /></span>
             <span className="font-semibold italic uppercase">Clientes</span>
            </h2>
        </CardTitle>
              <Separator className="mt-2 mb-4" />
        <div className="flex items-center justify-between w-full mt-2 space-y-4">
          <Link 
            href="/app/clients/register"
            prefetch={false}
            passHref={true}
            className="bg-indigo-500 hover:bg-indigo-600 shadow-2xl font-semibold text-white cursor-pointer flex items-center justify-center px-4 py-2 rounded-xs"
            >
      
                <Plus className="mr-1" width={15} />
                <span>Novo Cliente</span>
         
          </Link>
          <FilterTable />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {clients.length === 0 ? (
         <div className="flex items-center justify-center h-80 flex-col gap-4 ">
            <Image src="/error-404.png" alt="Admin Panel"  width={80} height={80}/>
            <span className="text-gray-500 font-semibold">Nenhum cliente encontrado!</span>
          </div>
        ) : (
        <Table >
          <TableHeader>
            <TableRow className="bg-indigo-500 hover:bg-indigo-500">
              <TableHead></TableHead>
              <TableHead className="text-white">Nome</TableHead>
              <TableHead className="text-white">Login</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Telefone</TableHead>
              <TableHead className="text-white">Cadastro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="space-y-5">
            {clients.map((item) => (
              <TableRow  key={item.id} className="cursor-pointer  hover:bg-indigo-400 hover:text-white" >
                <TableCell  className="py-4"><Link href={`/app/clients/${item.id}`}><UserCircle className="text-2xl text-indigo-600" /></Link></TableCell>
                <TableCell className="text-center"><Link  href={`/app/clients/${item.id}`}>{item.name ? item.name : "-"}</Link></TableCell>
                <TableCell className="text-center"><Link href={`/app/clients/${item.id}`}>{item.login ? item.login : "-"}</Link></TableCell>
                <TableCell className="text-center"><Link href={`/app/clients/${item.id}`}>{item.email ? item.email : "-"}</Link></TableCell>
                <TableCell className="text-center"><Link href={`/app/clients/${item.id}`}>{item.phone ? formatPhoneNumber(item.phone) : "-"}</Link></TableCell>
                { item.createdAt && (
                  <TableCell className="text-center"><Link href={`/app/clients/${item.id}`}>{ formatterDateAPI(item.createdAt) }</Link></TableCell>
                )}
              </TableRow>
              ))}   
          </TableBody>
        </Table>)}
      </CardContent>
      <PaginationTableClient page={page} />
    </Card>
  )
}