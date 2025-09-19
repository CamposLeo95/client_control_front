'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

interface InputDateProps {
  label?:string;
  nameParams: string;
  isBoolean: boolean;
  setIsBoolean: Dispatch<SetStateAction<boolean>>;
}

export default function SwitchParams({ nameParams, isBoolean, setIsBoolean, label }: InputDateProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const {replace} = useRouter()

    const handleSelect = (switchBoolean: boolean) => {
      setIsBoolean(switchBoolean);
      const params = new URLSearchParams(searchParams.toString());
      params.set(nameParams, switchBoolean.toString());
      replace(`${pathname}?${params.toString()}`);
    };

  return (
    <div className="flex gap-3 w-full items-center justify-between px-1">
      {label && <Label htmlFor={`${label}-switch`} className="cursor-pointer">{label}</Label>}
      <Switch checked={isBoolean} onCheckedChange={handleSelect} id={`${label}-switch`} className="cursor-pointer" />
    </div>
  );
}