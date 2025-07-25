import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, BriefcaseBusiness, CircleDollarSignIcon, FileArchive, Info, Lock, Mail, Phone, TriangleAlert, User } from "lucide-react";
import Link from "next/link";
import FormDescription from "./components/forms/form-description";
import axios from "axios";
import { ISign } from "@/app/types/sign.type";
import getSubscriptionById from "@/app/actions/subscriptions/find-subscription-id";
import InfoToggleRow from "@/components/info-toggle-row";
import ToggleForm from "../../components/toggle-form";
import { formatterDateAPI } from "@/app/utils/formatter-date";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import InfoCard from "@/components/info-card";
import { formatPhoneNumber } from "@/app/utils/formatter-phone";
import InfoRow from "@/components/info-row";
import formatterPrice from "@/app/utils/formmatter-price";

interface SubscriptionProps {
  params: Promise<{ id: string }>;
}
const URL_API = process.env.NEXT_PUBLIC_API_URL;
export default async function EditDescription({ params }: SubscriptionProps) {
  const { id } = await params;

  const sign = await getSubscriptionById(id);
  return (
        <div className="flex flex-col items-center gap-8">
      <Card className="w-full md:max-w-3xl rounded-xl md:shadow-sm md:border-2 md:bg-primary-foreground bg-transparent border-none shadow-none">
           <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileArchive size={28} className="text-indigo-600" />
            <span className="text-xl font-semibold text-indigo-600 uppercase italic ">
              Descrição
            </span>
          </div>
          <Link href={`/app/subscriptions/${id}`}>
            <ArrowLeft className="text-zinc-500 hover:text-zinc-700" width={22} />
          </Link>
        </CardHeader>
        <CardContent className="space-y-4">
                    <InfoToggleRow
                      icon={<BriefcaseBusiness />} label="Status da assinatura"
                      content={<ToggleForm id={sign.id} checked={sign.activeSign} />}
                    />
          
                    <InfoToggleRow
                      icon={<TriangleAlert />} label="Data de expiração"
                      content={formatterDateAPI(sign.expireDate)}
                    />
                       <FormDescription id={id} description={sign.description}  />
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
       
        </CardContent>
      </Card>
      </div>
  )
}