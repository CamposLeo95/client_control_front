import { IClient } from "@/app/types/client.type";
import { formatterDateAPI } from "@/app/utils/formatter-date";
import { UserCircle2 } from "lucide-react";
import Link from "next/link";

interface ICardsClientMobileProps {
  client: IClient
}

export default function CardsClientMobile({client}: ICardsClientMobileProps) {

  return (
  
    <div  className=" w-full bg-white  shadow-sm p-4 hover:bg-gray-50 transition-colors cursor-pointer">
      <Link href={`/app/clients/${client.id}`} >
      <div className="flex gap-5 h-full ">
      <div> <UserCircle2  /></div>
      <div className="flex-1 h-full flex flex-col justify-between"> 
          <p className="font-bold">{client.name}</p>
          <p className="text-sm text-gray-500">{client.email}</p>
      </div>
      <div className=" flex flex-col justify-end text-zinc-500"> {formatterDateAPI(client.createdAt)}</div>
      </div>
      </Link>
    </div>

  );
}