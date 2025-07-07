'use client'

import { recoveryPassAction } from "@/app/actions/auth/recovery-pass";
import FormField from "@/components/form-field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Check, Loader2, LockIcon, User2 } from "lucide-react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";


export default function ForgotPassword() {
  const { refresh } = useRouter();
const [state, recovery, isPending] = useActionState(recoveryPassAction, {
    verifyReq: true,
    message: "",
    isSuccess: false,
  });

  useEffect (() => {
    if (state.isSuccess) {
        refresh();
    }}, [state.isSuccess, refresh]); 

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <Card className="w-full max-w-sm border border-zinc-800 bg-zinc-900 shadow-md">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full shadow-md flex items-center justify-center">
            {!state.isSuccess ? <LockIcon className="h-6 w-6 text-white" /> : <Check className="h-6 w-6 text-white " />}
          </div>
          <h2 className="text-white text-xl font-bold">{!state.isSuccess ? "Esqueceu sua senha?" : "👍 Link enviado!"}</h2>
          {!state.isSuccess && (
              <p className="text-sm text-zinc-400">
                Digite seu email para receber um link de recuperação.
              </p>
          )}
        </CardHeader>
        <CardContent>
          {state.verifyReq && state.isSuccess ? (
            <Alert  className="mb-4 border-green-500 bg-green-900 text-green-200">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Sucesso</AlertTitle>
              <AlertDescription className="text-green-200">Enviamos um link para seu email favor conferir sua caixa de entrada para acessar o link para redefinir sua senha.</AlertDescription>
            </Alert>
          ): (
            <>
            {!state.verifyReq && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro ao tentar Recriar as senhas!</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <Form action={recovery} className="space-y-4">
            <FormField Icon={User2} name="email" id="email"  placeholder="Email" type="email" />
            <Separator className="my-6" />
            {isPending ? (
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white cursor-not-allowed" disabled>
                <span className="animate-spin"><Loader2 /></span>
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
                Enviar link de recuperação
              </Button>
            )}
          </Form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
