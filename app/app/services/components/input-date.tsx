'use client'

import { formatterDateBR, formmatDateToFilter } from "@/app/utils/formatter-date";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface InputDateProps {
  typeDate: "startDate" | "endDate";
  date: Date| undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}

export default function InputDate({ typeDate, date, setDate }: InputDateProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const {replace} = useRouter()

  const [open, setOpen] = useState(false)

  const textDate = typeDate === "startDate" ? "Data Inicial" : "Data Final";

  const handleSelect = (date: Date | undefined) => {
    setDate(date)
    const params = new URLSearchParams(searchParams);
    if (date ) {
      params.set(`${typeDate}`, formmatDateToFilter(date));
    }
    setOpen(false)
    replace(`${pathname}?${params.toString()}`)
  }

  // useEffect(() => {
  //   if (!date) {
  //     const params = new URLSearchParams(searchParams);
  //     params.delete(`${typeDate}`);
  //     replace(`${pathname}`)
  //   }
  // }, [date, typeDate, searchParams, pathname, replace]);

  return (
    <div className="flex flex-col gap-3 w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {date ? formatterDateBR.format(date) : textDate}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}