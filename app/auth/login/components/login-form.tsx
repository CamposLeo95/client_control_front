'use client'

import { loginAction } from "@/app/actions/auth/login";
import FormField from "@/components/form-field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Loader2, Lock, LogIn, User2 } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useActionState } from "react";

export default function LoginForm() {
const [state, login, isPending] = useActionState(loginAction, {
    verifyReq: true,
    message: "",
    isSuccess: false,
  });
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <Card className="w-full max-w-sm border border-zinc-800 bg-zinc-900 shadow-md">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full shadow-md flex items-center justify-center">
            <LogIn className="text-white" />
          </div>
          <h2 className="text-white text-xl font-bold">Bem vindo de volta!</h2>
          <p className="text-sm text-zinc-400">
            Não possui uma conta?{" "}
            <Link href="/auth/register" className="text-indigo-400 hover:underline">
              Inscreva-se
            </Link>
          </p>
        </CardHeader>

        <CardContent>
          {!state.verifyReq && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro ao tentar fazer login!</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <Form action={login} className="space-y-4">
            <FormField Icon={User2} name="login" id="login"  placeholder="Login" type="text" />
            <FormField Icon={Lock} name="password" id="password"  placeholder="Password" type="password" />
            <Separator className="my-6" />
            {isPending ? (
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white cursor-not-allowed" disabled>
                <span className="animate-spin"><Loader2 /></span>
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
                Login
              </Button>
            )}
          </Form>
          <div className="text-center mt-4">
            <Link href="/auth/forgot-password" className="text-indigo-400 hover:underline">
              Esqueci minha senha
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
