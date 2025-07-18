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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IService } from "@/app/types/services.type";
import { updateService } from "@/app/actions/services/update-service";

interface FormServiceProps {
  id?: string;
  service?: IService
}

export default function FormService({ id, service }: FormServiceProps) {
  const { push } = useRouter();
  const [createState, createAction, createIsPending] = useActionState(createService, {
    verifyReq: true,
    message: "",
    isSuccess: false,
  });

    const [updateState, updateAction, updateIsPending] = useActionState(updateService, {
    verifyReq: true,
    message: "",
    isSuccess: false,
  });

  useEffect(() => {
    if (updateState?.isSuccess) {
      push("/app/services");
    }

    if (createState?.isSuccess) {
      push("/app/services");
    }
  }, [updateState, createState]);

  return (

    <Card className="w-full max-w-xl mx-auto   rounded-lg shadow">
      <CardHeader className="text-center ">
        <TitleForm icon={<User className="text-2xl" />} title1={id ? "Editar" : "Cadastrar"} title2="Serviço" />
        <Separator />
    </CardHeader>

      <CardContent>
        {!updateState.verifyReq && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao tentar atualizar serviço!</AlertTitle>
            <AlertDescription>{updateState.message}</AlertDescription>
          </Alert>
        )}

        {!createState.verifyReq && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao tentar criar serviço!</AlertTitle>
            <AlertDescription>{createState.message}</AlertDescription>
          </Alert>
        )}


      <form action={ id ? updateAction : createAction} className="space-y-4">
        <FormField id="name" name="name" placeholder="Nome do Serviço" Icon={BriefcaseBusiness} label="Nome do Serviço" initialValue={service?.name} />
        <FormField id="price" name="price" placeholder="Valor do Serviço" Icon={CircleDollarSign} label="Valor do Serviço" initialValue={service?.price} />
        <input type="text" name="id" value={id} className="hidden" />

        <Separator className="my-4" />

        <div className="flex gap-2 mt-6">
          <Button type="submit" className="flex-1 bg-indigo-500 hover:bg-indigo-600 cursor-pointer text-white" disabled={createIsPending || updateIsPending}>
            {createIsPending || updateIsPending ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" /> <span>{createIsPending ? "Cadastrando..." : "Atualizando..."}</span>
              </div>
            ) : (
             <span>{id ? "Atualizar" : "Cadastrar"}</span>
            )}
          </Button>

          {!createState.verifyReq && !updateState.verifyReq && (
            <Link href="/app/clients" className="flex-1">
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
