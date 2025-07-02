import { IService } from "@/app/types/services.type";
import formatterPrice from "@/app/utils/formmatter-price";
import { UserCircle2 } from "lucide-react";
import Link from "next/link";

interface ICardsClientMobileProps {
  service: IService
}

export default function CardServiceMobile({service}: ICardsClientMobileProps) {

  return (
  
    <div className="mt-3 min-h-20 w-full bg-white  shadow-sm p-4 hover:bg-gray-50 transition-colors cursor-pointer">
      <Link href={`/app/services/${service.id}`} >
      <div className="flex gap-5 h-full ">
      <div> <UserCircle2  /></div>
      <div className="flex-1 h-full flex flex-col justify-between"> 
          <p className="font-bold">{service.name}</p>
          <p className="text-sm text-gray-500">{formatterPrice(service.price)}</p>
      </div>
      </div>
      </Link>
    </div>

  );
}