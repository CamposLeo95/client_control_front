"use client";

import { createClient } from "@/app/actions/clients/create-client";
import { updateClient } from "@/app/actions/clients/update-client";
import { IClient } from "@/app/types/client.type";
import FormField from "@/components/form-field";
import TitleForm from "@/components/title-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, KeyRound, Loader2, Lock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

interface IClientProps {
  id?: string
  client?: IClient
}


export default function FormClient({ id, client }: IClientProps) {
  const { push } = useRouter();
  const [createState, createAction, createIsPending] = useActionState(createClient, {
    verifyReq: true,
    message: "",
    isSuccess: false,
  });

  const [updateState, updateAction, updateIsPending] = useActionState(updateClient, {
    verifyReq: true,
    message: "",
    isSuccess: false,
  })

  useEffect(() => {
    if (updateState?.isSuccess) {
      push("/app/clients");
    }

    if (createState?.isSuccess) {
      push("/app/clients");
    }
  }, [updateState, createState]);

 
  return (
    <Card className="w-full max-w-xl mx-auto   rounded-lg shadow">
      <CardHeader className="text-center ">
        <TitleForm icon={<User className="text-2xl" />} title1={id ? "Atualizar" : "Cadastrar"} title2="cliente" />
        <Separator />
    </CardHeader>
      <CardContent>
      {!updateState.verifyReq && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao tentar {id ? "atualizar" : "criar"} cliente!</AlertTitle>
          <AlertDescription>{updateState.message}</AlertDescription>
        </Alert>
      )}

      {!createState.verifyReq && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao tentar {id ? "atualizar" : "criar"} cliente!</AlertTitle>
          <AlertDescription>{createState.message}</AlertDescription>
        </Alert>
      )}
  
     
      <form action={id ? updateAction : createAction} className="space-y-4">
        <FormField id="name" name="name" placeholder="Nome" Icon={User} initialValue={client?.name} label="Nome" />
        <FormField id="login" name="login" placeholder="Login" Icon={KeyRound} initialValue={client?.login} label="Login" />
        <FormField id="password" name="password" placeholder="Senha" Icon={Lock} initialValue={client?.password} label="Senha" />
        <FormField id="email" name="email" placeholder="Email" type="email" Icon={Mail} initialValue={client?.email} label="Email" />
        <FormField id="phone" name="phone" placeholder="Telefone" Icon={Phone} initialValue={client?.phone} label="Telefone" />
        <input type="text" name="id" value={id} className="hidden" />

        <Separator className="my-4" />

        <div className="flex gap-2 mt-6">
          <Button type="submit" className="flex-1 bg-indigo-500 hover:bg-indigo-600 cursor-pointer text-white" disabled={createIsPending || updateIsPending}>
            {createIsPending || updateIsPending ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" /> <span>{id ? "Atualizando..." : "Cadastrando..."}</span>
              </div>
            ) : (
              <span>{id ? "Atualizar" : "Cadastrar"}</span>
            )}
          </Button>

          {!createIsPending && !updateIsPending && (
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
