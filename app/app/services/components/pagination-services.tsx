'use client'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from "@/components/ui/pagination";
import Link from "next/link";

interface IPaginationTableProps {
  page: string | number;  
}

export function PaginationTableService({ page }: IPaginationTableProps) {

  return (
    <Pagination>
      <PaginationContent>
        { +page > 0 && (
        <PaginationItem>
          <Link href={`/app/services?page=${+page - 1}`} >

              Voltar

          </Link>
                    
        </PaginationItem>
        )}
        { +page > 0 && (
          <PaginationItem>
            <PaginationLink href={`/app/services?page=${+page - 1}`}>{+page - 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href={`/app/services?page=${+page}`} isActive>
           {+page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`/app/services?page=${+page + 1}`}>{+page + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <Link href={`/app/services?page=${+page + 1}`} > 

              Avançar

          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
