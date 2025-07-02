import { ReactNode } from "react";

interface FormCreateClientProps {
  icon: ReactNode
  title1: string
  title2?: string
}

export default function TitleForm({ icon, title1, title2 }: FormCreateClientProps) {
  return (
    <div className="text-2xl font-thin mb-6 text-center flex items-center gap-2">
      {icon}
      <span className="uppercase">
        <span className="text-indigo-500 font-semibold">{title1}</span>{" "}
        <span className="italic">{title2}</span>
      </span>
    </div>
  );
}
