import { formatterDateAPI } from "@/app/utils/formatter-date";
import { formatPhoneNumber } from "@/app/utils/formatter-phone";
import axios from "axios";
import {
  ArrowLeft, BanknoteArrowDown, BriefcaseBusiness, Calendar, CalendarClock,
  CircleDollarSign, HandCoins, Info, Lock, Mail, Phone, User
} from "lucide-react";
import { cookies } from "next/headers";
import { IPayment } from "@/app/types/payment";
import { ISign } from "@/app/types/sign.type";
import formatterPrice from "@/app/utils/formmatter-price";
import InfoCard from "@/components/info-card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import InfoRow from "@/components/info-row";
import { Card, CardContent, CardHeader } from "@/components/ui/card";


const URL_API = process.env.NEXT_PUBLIC_API_URL;

interface PaymentProps {
  params: Promise<{ id: string }>;
}

export default async function Payment({ params }: PaymentProps) {
  const { id } = await params;
  const token = (await cookies()).get("api-token")?.value;

  const { data: payment } = await axios.get<IPayment>(`${URL_API}/payment/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const { data: sign } = await axios.get<ISign>(`${URL_API}/sign/${payment.sign.id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const [year, month, day] = payment.createdAt!;
  const monthsPaid = payment.value / sign.serviceOffering.price || 0;
  const date = new Date(year, month - 1, day);
  const renewDate = new Date(date.setMonth(date.getMonth() + monthsPaid)).toLocaleDateString('pt-BR');

  return (
    <div className="flex flex-col items-center gap-8">
      <Card className="w-full md:max-w-3xl rounded-xl md:shadow-sm md:border-2 md:bg-primary-foreground bg-transparent border-none shadow-none">
        {/* Header */}
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CircleDollarSign size={28} className="text-indigo-600" />
            <span className="text-xl font-semibold text-indigo-600 uppercase italic">
              Pagamento
            </span>
          </div>
          <Link href="/app/payments">
            <ArrowLeft className="text-zinc-500 hover:text-zinc-700" width={22} />
          </Link>
        </CardHeader>

<CardContent>
        <Separator className="my-4" />

        {/* Accordion */}
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Info size={16} className="text-indigo-600" />
                <span className="uppercase italic text-sm">Informações do pagamento</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3 mt-2">
              <InfoRow icon={<BriefcaseBusiness />} label="Serviço" value={sign.serviceOffering.name} />
              <InfoRow icon={<HandCoins />} label="Meses pagos" value={monthsPaid.toString()} />
              <InfoRow icon={<BanknoteArrowDown />} label="Total pago" value={formatterPrice(payment.value)} />
              <InfoRow icon={<Calendar />} label="Data do pagamento" value={formatterDateAPI(payment.createdAt!)} />
              <InfoRow icon={<CalendarClock />} label="Renovado até" value={renewDate} />
              <Separator className="my-2" />
              <textarea
                className="w-full h-24 p-2 border border-zinc-300 rounded-md text-zinc-500 font-semibold italic resize-none"
                value={payment.description}
                disabled
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Info size={16} className="text-indigo-600" />
                <span className="uppercase italic text-sm">Informações do cliente</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3 mt-2">
              <InfoCard icon={<User className="text-indigo-600" width={20} />} data={payment.client.name} />
              <InfoCard icon={<Mail className="text-indigo-600" width={20} />} data={payment.client.email} />
              <InfoCard icon={<Lock className="text-indigo-600" width={20} />} data={payment.client.login} />
              <InfoCard icon={<Phone className="text-indigo-600" width={20} />} data={formatPhoneNumber(payment.client.phone)} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
</div>
  );
}


