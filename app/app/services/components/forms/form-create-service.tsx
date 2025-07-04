"use client";

import { createService } from "@/app/actions/services/create-service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, BriefcaseBusiness, CircleDollarSign, Loader2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import TitleForm from "@/components/title-form";
import Link from "next/link";
import FormField from "@/components/form-field";

export default function FormCreateService() {
  const { push } = useRouter();
  const [state, createAction, isPending] = useActionState(createService, {
    verifyReq: true,
    message: "",
    isSuccess: false,
  });

  useEffect(() => {
    if (state?.isSuccess) {
      push("/app/services");
    }
  }, [state]);

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="text-center mb-4">
        <TitleForm icon={<BriefcaseBusiness className="text-2xl" />} title1="Cadastrar" title2="Serviço" />
        <Separator className="my-4" />
      </div>

      {!state.verifyReq && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao tentar criar serviço!</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <form action={createAction} className="space-y-4">
        <FormField id="name" name="name" placeholder="Nome do Serviço" Icon={BriefcaseBusiness} />
        <FormField id="price" name="price" placeholder="Valor do Serviço" Icon={CircleDollarSign} />

        <Separator className="my-4" />

        <div className="flex gap-2 mt-6">
          <Button type="submit" className="flex-1 bg-indigo-500 hover:bg-indigo-600" disabled={isPending}>
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" /> <span>Cadastrando...</span>
              </div>
            ) : (
              "Cadastrar"
            )}
          </Button>

          {!isPending && (
            <Link href="/app/services" className="flex-1">
              <Button variant="outline" className="w-full">
                Cancelar
              </Button>
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
