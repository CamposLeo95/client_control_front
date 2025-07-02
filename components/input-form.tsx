import { Label } from "@radix-ui/react-dropdown-menu";

interface InputFormProps {
  icon?: React.ReactNode;
  placeholder?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
}

export default function InputForm({ icon, placeholder, name, value, disabled }: InputFormProps) {

  return(
     <div className=" border flex rounded-xs items-center gap-2 overflow-hidden bg-white ">
      {icon && (
        <Label className="border-r-2 p-2 bg-indigo-500 text-white">
          {icon}
        </Label>
      )}
      <input  
      type="text" 
        className={`border-none outline-none w-full text-indigo-400 placeholder:italic font-semibold placeholder:font-normal ${!icon ? "p-2 rounded-sm": ""}`} 
        name={name} 
        placeholder={placeholder}  
        value={value}
        disabled={disabled}
      />
    </div>
  )
}