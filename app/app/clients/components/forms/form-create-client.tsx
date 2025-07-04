"use client";

import { createClient } from "@/app/actions/clients/create-client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Lock, Mail, Phone, User, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import TitleForm from "@/components/title-form";
import Link from "next/link";
import FormField from "@/components/form-field";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function FormCreateClient() {
  const { push } = useRouter();
  const [state, createAction, isPending] = useActionState(createClient, {
    verifyReq: true,
    message: "",
    isSuccess: false,
  });

  useEffect(() => {
    if (state?.isSuccess) {
      push("/app/clients");
    }
  }, [state]);

 
  return (
    <Card className="w-full max-w-xl mx-auto   rounded-lg shadow">
      <CardHeader className="text-center ">
        <TitleForm icon={<User className="text-2xl" />} title1="Cadastrar" title2="cliente" />
        <Separator />
    </CardHeader>


      <CardContent>
      {!state.verifyReq && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao tentar criar cliente!</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
  
     
      <form action={createAction} className="space-y-4">
        <FormField id="name" name="name" placeholder="Nome" Icon={User} />
        <FormField id="login" name="login" placeholder="Login" Icon={KeyRound} />
        <FormField id="password" name="password" placeholder="Senha"  Icon={Lock} />
        <FormField id="email" name="email" placeholder="Email" type="email" Icon={Mail} />
        <FormField id="phone" name="phone" placeholder="Telefone" Icon={Phone} />

        <Separator className="my-4" />

        <div className="flex gap-2 mt-6">
          <Button type="submit" className="flex-1 bg-indigo-500 hover:bg-indigo-600 cursor-pointer text-white" disabled={isPending}>
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" /> <span>Cadastrando...</span>
              </div>
            ) : (
              "Cadastrar"
            )}
          </Button>

          {!isPending && (
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
