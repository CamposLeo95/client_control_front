
import { IClient } from "@/app/types/client.type";
import { formatterDateAPI } from "@/app/utils/formatter-date";
import { formatPhoneNumber } from "@/app/utils/formatter-phone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {  Plus, User, UserCircle } from "lucide-react";

import FilterTable from "./filter-table";
import { PaginationTableClient } from "./pagination-client";
import Link from "next/link";

interface PaginationProps {
  clients: IClient[];
  page: string | number;
}

export default function TableClients({ clients, page }: PaginationProps) {

  return(
    <Card className="w-full hidden md:flex min-h-[568px]  flex-col justify-between">
      <CardHeader >
        <CardTitle>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <span><User /></span>
            <span>CLIENTES</span>
            </h2>
        </CardTitle>
        <div className="flex items-center justify-between w-full mt-2 space-y-4">
          <Link 
            href="/app/clients/register"
            prefetch={false}
            passHref={true}
            className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer flex items-center justify-center px-4 py-2 rounded-md"
            >
      
                <Plus className="mr-1" width={15} />
                <span>Novo Cliente</span>
         
          </Link>
          <FilterTable />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {clients.length === 0 ? (
          <div className="flex items-center justify-center h-60">
            <span className="text-gray-500">Nenhum cliente encontrado</span>
          </div>
        ) : (
        <Table >
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead></TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Login</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Cadastro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="space-y-5">
            {clients.map((item) => (
              <TableRow  key={item.id} className="cursor-pointer  hover:bg-orange-400 hover:text-white" >
                <TableCell  className="py-4"><Link href={`/app/clients/${item.id}`}><UserCircle className="text-2xl" /></Link></TableCell>
                <TableCell><Link href={`/app/clients/${item.id}`}>{item.name}</Link></TableCell>
                <TableCell><Link href={`/app/clients/${item.id}`}>{item.login}</Link></TableCell>
                <TableCell><Link href={`/app/clients/${item.id}`}>{item.email}</Link></TableCell>
                <TableCell><Link href={`/app/clients/${item.id}`}>{formatPhoneNumber(item.phone)}</Link></TableCell>
                <TableCell><Link href={`/app/clients/${item.id}`}>{ formatterDateAPI(item.createdAt) }</Link></TableCell>
              </TableRow>
              ))}   
          </TableBody>
        </Table>)}
      </CardContent>
      <PaginationTableClient page={page} />
    </Card>
  )
}