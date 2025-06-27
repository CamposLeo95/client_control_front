import { IClient } from "@/app/types/client.type";
import { checkDateExpired, formatterDateAPI } from "@/app/utils/formatter-date";
import { formatPhoneNumber } from "@/app/utils/formatter-phone";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";
import {  ArrowLeft, BriefcaseBusiness, Calendar, DollarSign, Info, Lock, Mail, Pen, Phone, ToggleLeft, ToggleRight, User2 } from "lucide-react";
import { cookies } from "next/headers";


import formatterPrice from "@/app/utils/formmatter-price";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import InfoCardClient from "../components/info-card-client";
import PasswordText from "../components/password-text";
import { Arrow } from "@radix-ui/react-tooltip";
import Link from "next/link";



interface ClientProps {
	params: Promise<{ id: string }>;
}

export default async function Client({ params }: ClientProps) {
  const { id } = await params;
  const token = (await cookies()).get("api-token")?.value;
  const {data: client} = await axios.get<IClient>(`http://localhost:8080/client/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  	const {data: signs} = await axios.get<ISign[]>(`http://localhost:8080/sign?client=${client.name}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

	return (
		<>
    <div className="flex flex-col items-center justify-center md:w-full px-4 gap-8">
		<Card className="w-full md:w-[600px] min-h-[468px]">
			<CardHeader className="flex items-center justify-between" >
        <div className="flex items-center gap-2">
					<span><User2 /></span>
					<span className="text-lg font-semibold">{client.name}</span>
        </div>
        <div>
          <Link href="/app/clients">
            <ArrowLeft className="cursor-pointer text-zinc-500" width={20} />
          </Link>
        </div>
			</CardHeader>
			<CardContent>
				<div className="mt-2 space-y-2">
		<Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="cursor-pointer"><div className="flex items-center gap-2 "><Info width={15}/> <span>Informações</span></div> </AccordionTrigger>
        <AccordionContent className="flex flex-col  text-balance w-full">
        	<InfoCardClient icon={<Mail width={20} />} data={client.email} />
					<Separator className="my-3" />
					<InfoCardClient icon={<Phone width={20} />} data={formatPhoneNumber( client.phone)} />
					<Separator className="my-3" />
					<InfoCardClient icon={<Lock width={20} />} data={<PasswordText value={client.password} />} />
					<Separator className="my-3" />
					<InfoCardClient icon={<Calendar width={20} />} data={formatterDateAPI(client.createdAt)} />
        </AccordionContent>
      </AccordionItem>
      {signs.length > 0 && (
      <AccordionItem value="item-2" >
        <AccordionTrigger className="cursor-pointer">
					<div className="flex items-center gap-2 ">
						<Pen width={15}/> 
						<span>Assinaturas - </span> 
						<span>{signs.length}</span>
					</div>  
				</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
					<Accordion
						type="single"
						collapsible
						className="w-full"
						defaultValue="item-1"
					>
					{signs.map((sign) => (
      <AccordionItem value={`item-${sign.id}`} key={sign.id}>
        <AccordionTrigger className="cursor-pointer">
					<div className={`flex items-center justify-between w-full ${ sign.activeSign ? "text-green-700" : "text-red-700"}`}>
						<div className="flex gap-2 items-center  italic"> <BriefcaseBusiness className="mr-2" />{sign.serviceOffering.name}</div>
						<span>
							{ sign.activeSign ?	<ToggleRight  width={20}/> : <ToggleLeft width={20} />}
						</span>
					</div>
				</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance w-full">
					<div  className={`flex gap-2 text-lg items-end ${checkDateExpired(sign.expireDate) ? "text-red-700 italic" : "text-green-700"}`}> 

							<span>{<Calendar width={20} />}</span> 
							<span className="text-sm">{formatterDateAPI(sign.expireDate)}</span>
							<span className="text-sm font-bold">{checkDateExpired(sign.expireDate) ? "(Expirada)" : "(Ativa)"}</span>
					</div>
					<InfoCardClient icon={<DollarSign width={20} />} data={formatterPrice(sign.serviceOffering.price)} />
				</AccordionContent>
				</AccordionItem>
  
			))}
			</Accordion>
    
        </AccordionContent>
      </AccordionItem>
			)}
    </Accordion>

				</div>
			</CardContent>
		</Card>
        </div>
		</>
	);
}