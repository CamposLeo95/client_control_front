'use client';
import InputDate from "@/components/input-date";
import InputSearch from "@/components/input-search";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BrushCleaning, Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


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
        replace(`/app/clients`);
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
            <InputSearch route={"/app/clients"} filterName="all" value={all} setValue={setAll} /> 
            <InputDate typeDate="startDate" date={startDate} setDate={setStartDate} /> 
            <InputDate typeDate="endDate" date={endDate} setDate={setEndDate} />
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