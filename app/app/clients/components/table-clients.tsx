
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { File, Trash2 } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  clients: any[];

}

export default function TableClients({ clients }: PaginationProps) {

  return(
    <>
    
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Login</TableHead>
            <TableHead>Senha</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((item: any) => (
            <TableRow key={item.id} >
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.login}</TableCell>
              <TableCell>{item.password}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell><Link href="#" className="w-10 h-10 p-1"><File /> </Link></TableCell>
              <TableCell><Link href="#" className="w-10 h-10 p-1"><Trash2 /></Link></TableCell>
              </TableRow>
            ))}   
        </TableBody>
      </Table>

     {/* <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setPage(currentPage - 1)
            }}
            aria-disabled={currentPage <= 0}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
          >
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setPage(currentPage + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination> */}
    </>
  )
}