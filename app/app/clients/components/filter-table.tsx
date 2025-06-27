'use client';
import InputDate from "./input-date";
import InputSearch from "./input-search";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BrushCleaning, Filter } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterTable () {
  const searchParams = useSearchParams()
  const { replace } = useRouter();
  const pathname = usePathname()

    const [startDate, setStartDate] = useState<Date | undefined>(undefined)
    const [endDate, setEndDate] = useState<Date | undefined>(undefined)
    const [all, setAll] = useState<string>("");


    const handleClearFilters = () => {
        setStartDate(undefined);
        setEndDate(undefined);
        setAll("");
        const params = new URLSearchParams(searchParams);
        params.delete("startDate");
        params.delete("endDate");
        params.delete("all");
        replace(`/app/clients?${params.toString()}`);
    }
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div  className="w-full justify-between font-normal cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700">
          Filtros
          <Filter width={15} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filtros</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className=" w-64 flex flex-col p-2 items-center justify-between gap-4">
            <InputSearch value={all} setValue={setAll} /> 
            <InputDate typeDate="startDate" date={startDate} setDate={setStartDate} /> 
            <InputDate typeDate="endDate" date={endDate} setDate={setEndDate} />
        </div>
        <DropdownMenuSeparator />
        <Button
          variant="outline"
          className="w-full gap-2 font-normal cursor-pointer"
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