import { ReactNode } from "react";

export default function InfoCardClient({ icon, data }: { icon: ReactNode, data: string | ReactNode }) {
  return (
    <div  className="flex gap-2 text-lg items-end text-zinc-500"> <span>{icon}</span> <span className="text-sm">{data}</span></div>
  );
}