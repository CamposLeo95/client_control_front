import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface FormFieldProps {
  id: string;
  name: string;
  placeholder: string;
  label?: string;
  type?: string;
  Icon: React.ElementType;
}

 export default function FormField ({id, name,placeholder, type = "text",Icon, label}: FormFieldProps) {
    return ( 
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center border rounded-md px-3 py-1 text-indigo-500  focus-within:ring-2 focus-within:ring-indigo-500 font-semibold">
        <Icon className="w-4 h-4 mr-2  text-indigo-400" />
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          className="w-full p-1 outline-none border-none px-0 shadow-none focus-visible:ring-0 placeholder:font-normal"
        />
      </div>
    </div>
  )
  }
   