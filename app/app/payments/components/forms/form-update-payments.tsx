"use client";

import renewPayment from "@/app/actions/payments/renew-payment";
import { ISign } from "@/app/types/sign.type";
import formatterPrice from "@/app/utils/formmatter-price";
import { getArrayMonths } from "@/app/utils/months";
import TitleForm from "@/components/title-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, BriefcaseBusiness, CircleDollarSign, DollarSign, Loader2, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";

interface FormUpdatePaymentProps {
  subscription: ISign;
}

export default function FormUpdatePayment({ subscription }: FormUpdatePaymentProps) {
  const [valueService, setValueService] = useState<number>(0);
  const [totalMonths, setTotalMonths] = useState<number>(1);
  const [description, setDescription] = useState<string>("");

  const { push } = useRouter();
  const [state, paymentAction, isPending] = useActionState(renewPayment, {
    verifyReq: true,
    message: "",
    isSuccess: false,
  });

  const ARRAY_MONTHS_PAYMENTS = getArrayMonths(12);

  function handleSubmit() {
    paymentAction({
      signId: subscription.id,
      valueService,
      description,
    });
  }

  useEffect(() => {
    const price = subscription.serviceOffering.price;
    setValueService(price * totalMonths);
  }, [subscription.serviceOffering.id, subscription.serviceOffering.price, totalMonths]);

  useEffect(() => {
    if (state?.isSuccess) {
      push("/app/subscriptions");
    }
  }, [state]);

  return (
    <Card className="w-full max-w-xl mx-auto rounded-lg shadow">
      <CardHeader className="text-center">
        <TitleForm
          icon={<CircleDollarSign className="text-2xl" />}
          title1="Renovar "
          title2="Assinatura"
        />
        <Separator  />
      </CardHeader>
    <CardContent>
      {!state.verifyReq && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao tentar cadastrar pagamento!</AlertTitle>
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
            <div className="space-y-1">
              <Label>Cliente</Label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-secondary cursor-not-allowed text-indigo-400 font-semibold">
                <User className="w-4 h-4 mr-2" />
                <input
                  value={subscription.client.name}
                  disabled
                  className="w-full bg-transparent outline-none border-none"
                />
              </div>
            </div>
          </div>

          <div className="col-span-8 md:col-span-4">
            <div className="space-y-1">
              <div className="flex items-center border rounded-md px-3 py-2 bg-secondary cursor-not-allowed text-indigo-400 font-semibold">
                <BriefcaseBusiness className="w-4 h-4 mr-2" />
                <input
                  value={subscription.serviceOffering.name}
                  disabled
                  className="w-full bg-transparent outline-none border-none"
                />
              </div>
            </div>
          </div>

          <div className="col-span-8 md:col-span-4 flex items-center gap-1">
            <Select onValueChange={(value) => setTotalMonths(Number(value))} defaultValue="1">
              <SelectTrigger className="w-20 bg-white text-indigo-400 font-semibold py-5 cursor-pointer">
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
                className="w-full bg-transparent outline-none border-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="description" >Descrição</Label>
          <textarea
            name="description"
            id="description"
            className="w-full mt-2 p-3 border rounded-md resize-none font-semibold bg-secondary  outline-none text-indigo-400 placeholder:italic placeholder:text-indigo-400"
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
              "Renovar assinatura"
            )}
          </Button>

          {!isPending && (
            <Link href="/app/subscriptions" className="flex-1">
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
