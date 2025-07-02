'use client'

import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export default function PasswordText({ value }: { value: string }) {
  const [isVisible, setIsVisible] = useState(false);  

  return (
    <div className="text-gray-500 w-64 md:w-[500px] space-x-2 flex justify-between items-end  ">
      <span className="w-full">
        {isVisible ? value : "********"}
      </span>
        <Button onClick={() => setIsVisible(!isVisible)} className="w-6 h-6 p-0 cursor-pointer" variant="ghost">
           {isVisible ? <Eye /> : <EyeClosed />}
        </Button>
    </div>
  );
}