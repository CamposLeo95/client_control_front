'use client';
import InputSearch from "@/components/input-search";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BrushCleaning, Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


export default function FilterTableServices () {
  const searchParams = useSearchParams()
  const { replace } = useRouter();
    const [name, setName] = useState<string>("");
    const handleClearFilters = () => {
        setName("");
        const params = new URLSearchParams(searchParams);
        params.delete("startDate");
        params.delete("endDate");
        params.delete("name");
        replace(`/app/services`);
    }
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger>
         <div  className="w-full justify-between font-normal cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md  border  focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ">
          Filtros
          <Filter width={15} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filtros</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className=" w-64 flex flex-col p-2 items-center justify-between gap-4">
            <InputSearch route={"/app/services"} filterName="name" value={name} setValue={setName} />
        </div>
        <DropdownMenuSeparator />
        <Button
          variant="outline"
          className="w-full gap-2 font-normal cursor-pointer text-white bg-indigo-400 hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          onClick={handleClearFilters}
        >
         
          <BrushCleaning />
          <span>Limpar Filtros</span>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>

      
    </>
  )
}