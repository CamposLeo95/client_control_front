import axios from "axios";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CircleDollarSignIcon,
  Handshake
} from "lucide-react";
import { cookies } from "next/headers";
import { IService } from "@/app/types/services.type";
import formatterPrice from "@/app/utils/formmatter-price";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import InfoRow from "@/components/info-row";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import getServiceById from "@/app/actions/services/service-id";

const URL_API = process.env.NEXT_PUBLIC_API_URL;

interface ClientProps {
  params: Promise<{ id: string }>;
}

export default async function Service({ params }: ClientProps) {
  const { id } = await params;

  const service = await getServiceById(id);

  return (
    <div className="flex flex-col items-center gap-8">
    <Card className="w-full md:max-w-3xl rounded-xl md:shadow-sm md:border-2 md:bg-primary-foreground bg-transparent border-none shadow-none">
        {/* Header */}
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Handshake size={28} className="text-indigo-600" />
            <span className="text-xl font-semibold text-indigo-600 uppercase italic">
              Serviço
            </span>
          </div>
          <Link href="/app/services">
            <ArrowLeft className="text-zinc-500 hover:text-zinc-700" width={22} />
          </Link>
        </CardHeader>
    <CardContent>
        <Separator className="my-4" />

        <div className="flex flex-col gap-4">
          <InfoRow icon={<BriefcaseBusiness />} label="Serviço" value={service?.name ?? ""} />
          <InfoRow icon={<CircleDollarSignIcon />} label="Valor" value={formatterPrice(service?.price ?? 0)} />
        </div>
        </CardContent>
        <CardFooter className="flex ">
          <Link href={`/app/services/update/${service?.id}`} className="w-full rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white">
            <Button variant="outline" className="w-full cursor-pointer ">
              Atualizar Serviço
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}


