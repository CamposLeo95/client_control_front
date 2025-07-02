import { Check, X } from "lucide-react";
import { Badge } from "./ui/badge";
interface BadgeProps {
  isActive: boolean;
}

export default function BadgeTable({ isActive }: BadgeProps) {
  return (
    <div className={`badge ${isActive ? "active" : "inactive"}`}>
      {isActive 
        ? <Badge className="bg-indigo-500  text-zinc-100 min-w-20 flex justify-evenly">
            <div className="bg-green-600 rounded-full size-3 flex justify-center items-center p-0 border-1 border-green-900">
              <Check  className="text-white " width={10} /> 
            </div> 
            <span> Ativo</span>
          </Badge>
        : <Badge className="bg-indigo-500  text-zinc-100 min-w-20 flex justify-evenly">
            <div className="bg-red-500 rounded-full size-3 flex justify-center items-center p-0 border-1 border-red-900">
              <X  className="text-white" width={10} /> 
            </div> 
            <span> Inativo</span>
          </Badge>
      }
    </div>
  );
}