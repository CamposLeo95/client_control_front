import { IService } from "@/app/types/services.type";
import formatterPrice from "@/app/utils/formmatter-price";
import { Card } from "@/components/ui/card";
import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

interface ICardServiceMobileProps {
  service: IService;
}

export default function CardServiceMobile({ service }: ICardServiceMobileProps) {
  return (
    <Link href={`/app/services/${service.id}`} passHref>
      <Card className=" rounded-lg shadow-sm p-4 mb-3 transition-colors cursor-pointer">
        <div className="flex items-center gap-4">
          <BriefcaseBusiness className="text-indigo-500" size={36} strokeWidth={1.5} />

          <div className="flex-1 overflow-hidden">
            <p className="font-semibold truncate">{service.name}</p>
            <p className="text-sm text-zinc-500 truncate">{formatterPrice(service.price)}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
