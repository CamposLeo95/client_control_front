import { formatPhoneNumber } from "@/app/utils/formatter-phone";
import axios from "axios";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CircleDollarSignIcon,
  Edit,
  FileArchive,
  Info,
  Lock,
  Mail,
  Pen,
  Phone,
  PlusSquare,
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import getSubscriptionById from "@/app/actions/subscriptions/find-subscription-id";
import { Label } from "@/components/ui/label";

interface SubscriptionProps {
  params: Promise<{ id: string }>;
}

export default async function Subscription({ params }: SubscriptionProps) {
  const { id } = await params;
  const sign = await getSubscriptionById(id);

  return (
    <div className="flex flex-col items-center gap-8">
      <Card className="w-full md:max-w-3xl rounded-xl md:shadow-sm md:border-2 md:bg-primary-foreground bg-transparent border-none shadow-none">
        {/* Header */}
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileArchive size={28} className="text-indigo-600" />
            <span className="text-xl font-semibold text-indigo-600 uppercase italic">
              Assinatura
            </span>
          </div>
          <Link href="/app/subscriptions">
            <ArrowLeft className="text-zinc-500 hover:text-zinc-700" width={22} />
          </Link>
        </CardHeader>

        <Separator className="my-4" />

        <CardContent className="space-y-4">
          <InfoToggleRow
            icon={<BriefcaseBusiness />} label="Status da assinatura"
            content={<ToggleForm id={sign.id} checked={sign.activeSign} />}
          />

          <InfoToggleRow
            icon={<TriangleAlert />} label="Data de expiração"
            content={formatterDateAPI(sign.expireDate)}
          />
          <InfoToggleRow
            icon={<Info />} label="Descrição"
            content={
            <Link href={`/app/subscriptions/${sign.id}/edit-description`}>
              {sign.description 
              ? (
                <div className="flex text-md text-indigo-400 mr-2 font-medium items-center gap-2">
                  <Edit width={23} />
                  <span> Editar</span>
                </div>
              ) 
              : (
                <div className="flex text-md text-indigo-400 mr-2 font-medium items-center gap-2">
                  <PlusSquare width={23} />
                  <span> Adicionar</span>
                </div>
              ) }
            </Link>
            }
          />
          {sign?.description &&(
             <Link href={`/app/subscriptions/${sign.id}/edit-description`}>
              <div
                className="flex items-center gap-2 border rounded-md px-3 py-2 bg-secondary text-indigo-400 font-semibold"
              >
                {sign?.description}
              </div>
            </Link>
          )}
        <Separator className="my-4" />
          {/* Accordions */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="cursor-pointer">
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

            <AccordionItem value="item-2" >
              <AccordionTrigger className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <Info size={16} className="text-indigo-600" />
                  <span className="uppercase text-sm">Informações do Serviço</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-5 mt-2">
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
        </CardContent>
      </Card>
    </div>
  );
}



