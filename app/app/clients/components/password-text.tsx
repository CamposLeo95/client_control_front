'use client';

import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export default function PasswordText({ value }: { value: string }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex items-center justify-between gap-2 max-w-md text-sm cursor-pointer bg-secondary text-primary px-3 py-2 rounded-lg border border-zinc-200">
      <span className="truncate flex-1 font-bold">
        {isVisible ? value : "••••••••"}
      </span>
      <Button
        onClick={() => setIsVisible(!isVisible)}
        size="icon"
        variant="ghost"
        className="w-6 h-6 p-0 cursor-pointer"
        aria-label={isVisible ? "Ocultar senha" : "Mostrar senha"}
      >
        {isVisible ? (
          <Eye className="text-indigo-600 w-4 h-4 cursor-pointer" />
        ) : (
          <EyeClosed className="text-indigo-600 w-4 h-4 cursor-pointer" />
        )}
      </Button>
    </div>
  );
}
