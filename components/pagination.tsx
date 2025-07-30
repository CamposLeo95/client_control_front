'use client'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from "@/components/ui/pagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface IPaginationTableProps {
  page: string | number;  
  route: string;
}

export function PaginationTable({ page, route }: IPaginationTableProps) {
  const searchParams = useSearchParams();
  
  const getQueryString = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    return params.toString() ? `?${params.toString()}` : "";
  };
  return (
    <Pagination>
      <PaginationContent>
        { +page > 0 && (
        <PaginationItem>
          <Link href={`${route}?${getQueryString(+page - 1)}`} >

              Voltar

          </Link>
                    
        </PaginationItem>
        )}
        { +page > 0 && (
          <PaginationItem>
            <PaginationLink href={`${route}${getQueryString(+page - 1)}`}>{+page - 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href={`${route}${getQueryString(+page)}`} isActive>
           {+page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`${route}${getQueryString(+page + 1)}`}>{+page + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <Link href={`${route}${getQueryString(+page + 1)}`} >
              Avançar
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
