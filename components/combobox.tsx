"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "./ui/label"

type ComboboxItem = {
  value: number
  label: string
}

interface Props {
  title: string
  itemId:  ComboboxItem | null
  setValue: React.Dispatch<React.SetStateAction<ComboboxItem | null>>
  list: ComboboxItem[]
  icon?: React.ReactNode
}

export function Combobox({ title, itemId, setValue, list, icon }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>

      <div className=" border flex rounded-md items-center  overflow-hidden p-1 pl-2 cursor-pointer pr-5 hover:bg-secondary">
      {icon && (
        <Label className="size-5  text-indigo-600">{icon}</Label>
      )}
      <button
            type="button"
            role="combobox"
            aria-expanded={open}
            className="w-full flex items-center pl-2  justify-between shadow-none rounded-xs p-1 hover:bg-transparent border-none text-indigo-400 hover:text-indigo-500 bg-transparent cursor-pointer"
        >
          {itemId ? list.find((item) => item?.value === itemId?.value)?.label : `Selecione um ${title}`}
          <ChevronsUpDown className="opacity-50 size-4"  />
        </button>
    </div>    
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[200px] lg:w-[350px]">
        <Command>
          <CommandInput placeholder={`Buscar por ${title}`} className="h-9" />
          <CommandList>
            <CommandEmpty>{`Nenhum ${title} encontrado.`}</CommandEmpty>
            <CommandGroup>
              {list.map((item) => (
                <CommandItem
                  key={item.value}
                    value={`${item.value.toString()} - ${item.label}`}
                    onSelect={() => {
                      setValue(item)
                      setOpen(false)
                    }}
                  className="cursor-pointer"
                >
                {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      itemId?.value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
