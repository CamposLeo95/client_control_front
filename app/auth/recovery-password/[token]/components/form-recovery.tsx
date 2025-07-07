'use client'

import { updatePassAction } from "@/app/actions/auth/update-pass";
import FormField from "@/components/form-field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Loader2, Lock, LockIcon, User2 } from "lucide-react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

interface FormRecoveryProps {
  token: string;
}

export default function FormRecovery({token}: FormRecoveryProps) {
  const {push} = useRouter();
const [state, recovery, isPending] = useActionState(updatePassAction, {
    verifyReq: true,
    message: "",
    isSuccess: false,
  });

  useEffect(() => {
    if (state.isSuccess) {
        push("/auth/login");
    }
  }, [state.isSuccess, push]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <Card className="w-full max-w-sm border border-zinc-800 bg-zinc-900 shadow-md">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full shadow-md flex items-center justify-center">
            <LockIcon className="text-white" />
          </div>
          <h2 className="text-white text-xl font-bold">Digite sua nova senha!</h2>
         
        </CardHeader>
        <CardContent>
          {!state.verifyReq && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro ao tentar Recriar as senhas!</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <Form action={recovery} className="space-y-4">
            <input type="text" name="token" value={token} className="hidden"   readOnly/>
            <FormField Icon={User2} name="password" id="password"  placeholder="Senha" type="password" />
            <FormField Icon={Lock} name="confirmPassword" id="confirmPassword"  placeholder="Confirmar senha" type="password" />
            <Separator className="my-6" />
            {isPending ? (
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white cursor-not-allowed" disabled>
                <span className="animate-spin"><Loader2 /></span>
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
                Atualizar senha
              </Button>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
