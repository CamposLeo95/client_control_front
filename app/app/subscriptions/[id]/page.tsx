import { formatPhoneNumber } from "@/app/utils/formatter-phone";
import axios from "axios";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CircleDollarSignIcon,
  FileArchive,
  Info,
  Lock,
  Mail,
  Phone,
  TriangleAlert,
  User
} from "lucide-react";
import { cookies } from "next/headers";
import { ISign } from "@/app/types/sign.type";
import { formatterDateAPI } from "@/app/utils/formatter-date";
import formatterPrice from "@/app/utils/formmatter-price";
import InfoCard from "@/components/info-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ToggleForm from "../components/toggle-form";
import InfoRow from "@/components/info-row";
import InfoToggleRow from "@/components/info-toggle-row";

interface ClientProps {
  params: Promise<{ id: string }>;
}

export default async function Client({ params }: ClientProps) {
  const { id } = await params;
  const token = (await cookies()).get("api-token")?.value;

  const { data: sign } = await axios.get<ISign>(`http://localhost:8080/sign/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <div className="flex flex-col items-center px-4 gap-8">
      <div className="w-full md:max-w-3xl bg-white rounded-xl shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileArchive size={28} className="text-indigo-600" />
            <span className="text-xl font-semibold text-indigo-600 uppercase italic">
              Assinatura
            </span>
          </div>
          <Link href="/app/subscriptions">
            <ArrowLeft className="text-zinc-500 hover:text-zinc-700" width={22} />
          </Link>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <InfoToggleRow
            icon={<BriefcaseBusiness />} label="Status da assinatura"
            content={<ToggleForm id={sign.id} checked={sign.activeSign} />}
          />

          <InfoToggleRow
            icon={<TriangleAlert />} label="Data de expiração"
            content={formatterDateAPI(sign.expireDate)}
          />

          {/* Accordions */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Info size={16} className="text-indigo-600" />
                  <span className="uppercase text-sm">Informações do Cliente</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3 mt-2">
                <InfoCard icon={<User className="text-indigo-600" width={20} />} data={sign.client.name} />
                <InfoCard icon={<Mail className="text-indigo-600" width={20} />} data={sign.client.email} />
                <InfoCard icon={<Lock className="text-indigo-600" width={20} />} data={sign.client.login} />
                <InfoCard icon={<Phone className="text-indigo-600" width={20} />} data={formatPhoneNumber(sign.client.phone)} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Info size={16} className="text-indigo-600" />
                  <span className="uppercase text-sm">Informações do Serviço</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3 mt-2">
                <InfoRow icon={<BriefcaseBusiness />} label="Serviço" value={sign.serviceOffering.name} />
                <InfoRow icon={<CircleDollarSignIcon />} label="Valor" value={formatterPrice(sign.serviceOffering.price)} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Separator className="my-4" />

          <Link
            href={`/app/payments/renew/${sign.id}`}
            className="w-full inline-flex justify-center items-center p-3 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md text-sm font-medium"
          >
            Renovar Assinatura
          </Link>
        </div>
      </div>
    </div>
  );
}



