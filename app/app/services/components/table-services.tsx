
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BriefcaseBusiness, Handshake, Plus } from "lucide-react";

import { IService } from "@/app/types/services.type";
import formatterPrice from "@/app/utils/formmatter-price";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import FilterTableServices from "./filter-table";
import { PaginationTableService } from "./pagination-services";

interface PaginationProps {
  services: IService[];
  page: string | number;
}

export default function TableServices({ services, page }: PaginationProps) {

  return(
    <Card className="w-full hidden md:flex min-h-[668px]  flex-col justify-between">
      <CardHeader >
        <CardTitle>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <span><Handshake /></span>
           <span className="font-semibold italic uppercase">Serviços</span>
            </h2>
        </CardTitle>
            <Separator className="mt-2 mb-4" />
        <div className="flex items-center justify-between w-full mt-2 space-y-4">
          <Link 
            href="/app/services/register"
            prefetch={false}
            passHref={true}
            className="bg-indigo-500 hover:bg-indigo-600 shadow-2xl font-semibold text-white cursor-pointer flex items-center justify-center px-4 py-2 rounded-xs"
            >
      
                <Plus className="mr-1" width={15} />
                <span>Novo Serviço</span>
         
          </Link>
          <FilterTableServices />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {services.length === 0 ? (
         <div className="flex items-center justify-center h-80 flex-col gap-4 ">
            <Image src="/error-404.png" alt="Admin Panel"  width={80} height={80}/>
            <span className="text-gray-500 font-semibold">Nenhum serviço encontrado!</span>
          </div>
        ) : (
        <Table >
          <TableHeader>
            <TableRow className="bg-indigo-500 hover:bg-indigo-500">
              <TableHead></TableHead>
              <TableHead className="text-white text-center">Nome</TableHead>
              <TableHead className="text-white text-center">Preço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="space-y-5">
            {services.map((item) => (
              <TableRow  key={item.id} className="cursor-pointer  hover:bg-indigo-400 hover:text-white" >
                <TableCell className="py-4 uppercase text-center"><Link href={`/app/services/${item.id}`}><BriefcaseBusiness className="text-2xl text-indigo-600" /></Link></TableCell>
                <TableCell className="py-4 uppercase text-center"><Link href={`/app/services/${item.id}`}>{item.name}</Link></TableCell>
                <TableCell className="text-center"><Link href={`/app/services/${item.id}`}>{formatterPrice(item.price)}</Link></TableCell>
              </TableRow>
              ))}   
          </TableBody>
        </Table>)}
      </CardContent>
      <PaginationTableService page={page} />
    </Card>
  )
}