'use client'

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface InputSearchProps {
  filterName: string
  route: string
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function InputSearch({filterName,value, setValue, route}:InputSearchProps) {
  const searchParams = useSearchParams()
  const {replace} = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.currentTarget.value) {
      setValue?.(e.currentTarget.value);
      params.set(filterName, e.currentTarget.value);
    } else {
      setValue?.("");
      params.delete(filterName);
    }
    params.set("page", "0");
    replace(`${route}?${params.toString()}`)
  }

  return (
    <div className="flex items-center justify-between w-full">
      <Input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value || ""}
        onChange={handleChange}
      />
    </ div> 

  );
}