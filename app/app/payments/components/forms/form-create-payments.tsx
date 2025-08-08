"use client";

import createPayment from "@/app/actions/payments/create-payment";
import { IClient } from "@/app/types/client.type";
import { IService } from "@/app/types/services.type";
import { getArrayMonths } from "@/app/utils/months";
import { Combobox } from "@/components/combobox";
import TitleForm from "@/components/title-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  AlertCircle,
  BriefcaseBusiness,
  CalendarIcon,
  CircleDollarSign,
  DollarSign,
  Loader2,
  User
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { ptBR } from "date-fns/locale";

type DropDown = {
  value: number;
  label: string;
};

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
  const [date, setDate] = useState<Date>()

  const { push } = useRouter();
  const [state, paymentAction, isPending] = useActionState(createPayment, {
    verifyReq: true,
    message: "",
    isSuccess: false,
  });

  const ARRAY_MONTHS_PAYMENTS = getArrayMonths(12);

  const clientsDropdown = clients.map((client) => ({
    value: client.id,
    label: `${client.name} - ${client.login}`,
  }));

  const servicesDropdown = services.map((service) => ({
    value: service.id,
    label: service.name,
  }));

  function handleSubmit() {
    paymentAction({
      clientId: clientId?.value || null,
      serviceId: serviceId?.value || null,
      valueService,
      description,
      manualDate: date ? format(date, "yyyy-MM-dd") : null,
    });
  }

  useEffect(() => {
    const price = services.find((s) => s.id === serviceId?.value)?.price || 0;
    setValueService(price * totalMonths);
  }, [serviceId, services, totalMonths]);

  useEffect(() => {
    if (state?.isSuccess) {
      push("/app/payments");
    }
  }, [state]);

  return (
    <Card className="w-full max-w-xl mx-auto  rounded-lg shadow">
      <CardHeader className="text-center">
        <TitleForm icon={<CircleDollarSign className="text-2xl" />} title1="Cadastrar" title2="Pagamento" />
        <Separator  />
      </CardHeader>
<CardContent>


      {!state.verifyReq && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao tentar criar pagamento!</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(() => {
            handleSubmit();
          });
        }}
      >
        <div className="grid grid-cols-8 gap-2 mt-4">
          <div className="col-span-8">
            <Combobox 
              title="Cliente" 
              itemId={clientId} setValue={setClientId} list={clientsDropdown} icon={<User />} />
          </div>

          <div className="col-span-8 md:col-span-4">
            <Combobox
              title="Serviço"
              itemId={serviceId}
              setValue={setServiceId}
              list={servicesDropdown}
              icon={<BriefcaseBusiness />}
            />
          </div>
          <div className="col-span-8 md:col-span-4 flex items-center gap-1">
            <Select onValueChange={(value) => setTotalMonths(Number(value))} defaultValue="1">
              <SelectTrigger className="w-20  text-indigo-400 font-semibold py-5 cursor-pointer">
                <SelectValue placeholder="Qntd." />
              </SelectTrigger>
              <SelectContent className="text-indigo-400">
                <SelectGroup>
                  {ARRAY_MONTHS_PAYMENTS.map((month) => (
                    <SelectItem
                      key={month.id}
                      value={month.id.toString()}
                      className="cursor-pointer font-semibold"
                    >
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="flex items-center border rounded-md px-3 py-2 bg-secondary cursor-not-allowed italic text-indigo-400 font-semibold">
              <DollarSign className="mr-2" />
              <input
                type="text"
                value={valueService.toFixed(2)}
                disabled
                className="w-full bg-transparent outline-none border-none cursor-not-allowed"
              />
            </div>
          </div>
    </div>
    <div className="mt-4">
      <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground py-5 justify-start text-left font-normal cursor-pointer w-full text-indigo-400  hover:text-indigo-500 font-semibold"
        >
          <CalendarIcon className="text-indigo-600" />
          {date ? format(date, "P", { locale: ptBR }) : <span>Selecione uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
    </div>
        <div className="mt-4">
          <Label htmlFor="description" >Descrição</Label>
          <textarea
            id="description"
            name="description"
            className="w-full mt-2 p-3 border rounded-md resize-none font-semibold outline text-indigo-400 placeholder:italic placeholder:text-indigo-400"
            rows={4}
            placeholder="Descrição do pagamento..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Separator className="my-4" />

        <div className="flex gap-2 mt-6">
          <Button type="submit" className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer" disabled={isPending}>
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" /> <span>Cadastrando...</span>
              </div>
            ) : (
              "Cadastrar pagamento"
            )}
          </Button>

          {!isPending && (
            <Link href="/app/clients" className="flex-1 ">
              <Button variant="outline" className="w-full cursor-pointer">
                Cancelar
              </Button>
            </Link>
          )}
        </div>
      </form>
      </CardContent>
    </Card>
  );
}
