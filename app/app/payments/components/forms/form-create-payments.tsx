"use client"

import { createClient } from "@/app/actions/clients/create-client";
import createPayment from "@/app/actions/payments/create-payment";
import { IClient } from "@/app/types/client.type";
import { IService } from "@/app/types/services.type";
import formatterPrice from "@/app/utils/formmatter-price";
import { getArrayMonths } from "@/app/utils/months";
import { Combobox } from "@/components/combobox";
import TitleForm from "@/components/title-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AlertCircleIcon, BriefcaseBusiness, CircleDollarSign, DollarSign, Loader, User } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";

type DropDown = {
  value: number
  label: string
}

interface FormCreatePaymentProps {
  clients: IClient[];
  services: IService[];
}

export default function FormCreatePayment({ clients, services }: FormCreatePaymentProps) {
  const [clientId, setClientId] = useState<DropDown | null>(null);
  const [serviceId, setServiceId] = useState<DropDown | null>(null);
  const [valueService, setValueService] = useState<number>(0);
  const [totalMonths, setTotalMonths] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const {push} = useRouter()
  const [state, paymentAction, isPending] = useActionState(createPayment, {
    verifyReq: true,
    message: "",
    isSuccess: false,
  } )

  const ARRAY_MONTHS_PAYMENTS = getArrayMonths(12);


  const clientsDropdown = clients.map((client: IClient) => ({
    value: client.id,
    label: client.name,
  }));

  const servicesDropdown = services.map((service: IService) => ({
    value: service.id,
    label: service.name,
  }));

   function handleSubmit() {
     paymentAction({
      clientId: clientId?.value || null,
      serviceId: serviceId?.value || null,
      valueService,
      description
    });
  }

  
  useEffect(() => {
    const price = services.find((service: IService) => service.id === serviceId?.value)?.price || 0
    setValueService(price * totalMonths);
  }, [serviceId, services, totalMonths]);

  useEffect(() => {
    if (state?.isSuccess) {
      push("/app/payments");
    }
  }, [state]);

  return (

      <div  className="bg-none w-full lg:w-[800px]">
        <div >
          <div className="text-center">
            <TitleForm  icon={<CircleDollarSign className="text-2xl"/>} title1="Cadastrar" title2="Pagamento"/>
          </div>
          <Separator />
        </div>
        <div >
        {!state.verifyReq && (
          <Alert variant={"destructive"} className="mb-4">
          <AlertCircleIcon />
          <AlertTitle>Erro ao tentar criar pagamento!</AlertTitle>
          <AlertDescription>
            {state.message}
          </AlertDescription>
        </Alert>
        )}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            startTransition(() => {
              handleSubmit()
            });
        }}>

        <div className="grid grid-cols-8 gap-4 mt-4">

          <div className="col-span-8 md:col-span-8">
            <Combobox 
              title="Cliente"  
              itemId={clientId} 
              setValue={setClientId} 
              list={clientsDropdown} 
              icon={<User />}
            />
          </div>
          <div className="col-span-8 md:col-span-3">
            <Combobox title="Serviço"  
              itemId={serviceId} 
              setValue={setServiceId} 
              list={servicesDropdown} 
              icon={<BriefcaseBusiness 
            />} />
          </div>
          <div className="col-span-2 md:col-span-2">
            <Select onValueChange={(value) => setTotalMonths(Number(value))} defaultValue="1" >
            <SelectTrigger className="w-full rounded-xs bg-zinc-50 text-indigo-600 py-5 cursor-pointer font-semibold">
              <SelectValue placeholder="Qntd." />
            </SelectTrigger>
            <SelectContent className="text-indigo-600 ">
              <SelectGroup> 
                {ARRAY_MONTHS_PAYMENTS.map((month) => (
                  <SelectItem className=" cursor-pointer font-semibold" key={month.id} value={month.id.toString()}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>
           <div className="col-span-6 md:col-span-3">
            <div className="  border flex rounded-xs items-center gap-2 overflow-hidden bg-zinc-200 ">
              <Label className=" border-r-2 p-2 bg-indigo-500 text-white">
                <DollarSign width={20}   />
              </Label>
              <input  
                type="text" 
                className="border-none bg outline-none w-full text-indigo-400 placeholder:italic font-semibold placeholder:font-normal italic"
                value={formatterPrice(valueService)} 
                disabled 
              />
            </div>
          </div>
        </div>
        <div>
          <textarea
            name="description"
            className="w-full outline-none mt-4 p-2 border rounded-xs bg-zinc-50 text-indigo-600 placeholder:italic placeholder:text-indigo-400"
            rows={4}
            placeholder="Descrição do pagamento..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
          <Separator className="my-4" />
          <div className="flex gap-2 mt-10"> 
          <Button type="submit" className="flex-1 cursor-pointer bg-indigo-500 hover:bg-indigo-600 rounded-xs" disabled={isPending} >
            {isPending ? <div className="flex justify-center items-center"><Loader className="animate-spin" /> <span>Cadastrando...</span></div> : "Cadastrar pagamento"}
          </Button>
          {!isPending &&(
            <Link className=" flex-1 p-1 flex justify-center items-center rounded-xs text-sm font-semibold bg-zinc-50 hover:bg-zinc-200" href={`/app/clients`} >
              <div className="flex items-center gap-2 w-full justify-center ">
                <span>Cancelar</span>
              </div>
              </Link>
          )} 
          </div>
        </form>
        </div>
      </div>

  );
}