import { IClient } from "@/app/types/client.type";
import { checkDateExpired, formatterDateAPI } from "@/app/utils/formatter-date";
import { formatPhoneNumber } from "@/app/utils/formatter-phone";
import axios from "axios";
import {
  ArrowLeft, BriefcaseBusiness, Calendar, DollarSign, Info,
  Lock, Mail, Pen, Phone, ToggleLeft, ToggleRight, User, UserCircle
} from "lucide-react";
import { cookies } from "next/headers";
import { ISign } from "@/app/types/sign.type";
import formatterPrice from "@/app/utils/formmatter-price";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import PasswordText from "../components/password-text";
import InfoCard from "@/components/info-card";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import BadgeTable from "@/components/badge-table";
import { Button } from "@/components/ui/button";
import getClientById from "@/app/actions/clients/client-id";
import InfoCardClient from "../components/info-card-client";


const URL_API = process.env.NEXT_PUBLIC_API_URL;

interface ClientProps {
  params: Promise<{ id: string }>;
}

export default async function Client({ params }: ClientProps) {
  const { id } = await params;
  const token = (await cookies()).get("api-token")?.value;

  const client = await getClientById(id);

  const { data: signs  } = await axios.get<ISign[]>(`${URL_API}/sign`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      all: client?.login
    }
  });
  return (
    <div className="flex flex-col items-center gap-8">
    <Card className="w-full md:max-w-3xl rounded-xl md:shadow-sm md:border-2 md:bg-primary-foreground bg-transparent border-none shadow-none">

        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserCircle size={28} className="text-indigo-600" />
            <span className="text-xl font-semibold text-indigo-600 uppercase italic">
              Cliente
            </span>
          </div>
          <Link href="/app/clients">
            <ArrowLeft className="text-zinc-500 hover:text-zinc-700" width={22} />
          </Link>
        </CardHeader>
<CardContent>
        <Separator className="my-4" />
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Info size={18} className="text-indigo-600" />
                <span className="uppercase italic text-sm">Informações do Cliente</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3 mt-2">
              {client?.name && <InfoCard icon={<User />} data={client?.name} />}
	
              {client?.email && <InfoCard icon={<Mail />} data={client?.email} />}

              {client?.login && <InfoCard icon={<Lock />} data={client?.login} />}

              {client?.phone && <InfoCard icon={<Phone />} data={formatPhoneNumber(client?.phone)} />}

              {client?.password && <InfoCard icon={<Lock />} data={<PasswordText value={client?.password} />} />}

              {client?.createdAt && <InfoCard icon={<Calendar />} data={formatterDateAPI(client?.createdAt)} />}
            </AccordionContent>
          </AccordionItem>

          {/* Assinaturas */}
          {signs.length > 0 && (
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Pen size={16} className="text-indigo-600" />
                  <span className="font-medium">Assinaturas ({signs.length})</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="mt-3 space-y-4">
                {signs.map((sign) => {
                  const isExpired = checkDateExpired(sign.expireDate);
                  return (
                    <Link  key={sign.id} href={`/app/subscriptions/${sign.id}`}>
                    <div className="flex flex-col gap-2 p-4 border rounded-lg mb-2  transition-colors">
                      <div
                        className={`flex items-center justify-between font-medium ${
                          sign.activeSign ? "text-green-700" : "text-red-600"
                        }`}
                      >
                       
                        <div className="flex items-center gap-2 italic">
                          <BriefcaseBusiness  size={18} />
                          {sign.serviceOffering.name}
                          {!sign.activeSign && <span className="text-sm"> - (Desativada)</span>}
                        </div>
               
                        <BadgeTable isActive={sign.activeSign} />
                      </div>

                      <div
                        className={`flex gap-2 items-center ${
                          isExpired ? "text-red-600" : "text-green-700"
                        }`}
                      >
                        <Calendar size={18} />
                        <span className="text-sm">
                          {formatterDateAPI(sign.expireDate)}{" "}
                          <strong>{isExpired ? "(Expirada)" : "(Válida)"}</strong>
                        </span>
                      </div>

                      <InfoCardClient
                        icon={<DollarSign size={18} className="text-zinc-500" />}
                        data={formatterPrice(sign.serviceOffering.price)}
                      />
                    </div>
                             </Link>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
        </CardContent>
        <CardFooter className="flex ">
          <Link href={`/app/clients/update/${client?.id}`} className="w-full rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white">
            <Button variant="outline" className="w-full cursor-pointer ">
              Atualizar Cliente
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
