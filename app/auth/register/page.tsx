"use client"

import { registerAction } from "@/app/actions/auth/register"
import FormField from "@/components/form-field"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Loader2, Lock, Mail, User, User2 } from "lucide-react"
import Form from "next/form"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useActionState, useEffect } from "react"

export default function RegisterForm() {
  const { push } = useRouter();
const [state, register, isPending] = useActionState(registerAction, {
    verifyReq: true,
    message: "",
    isSuccess: false,
  });

  useEffect(() => {
    if (state?.isSuccess) {
      push("/auth/login");
    }
  }, [state]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <Card className="w-full max-w-sm border border-zinc-800 bg-zinc-900 shadow-md">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full shadow-md flex items-center justify-center">
            <User className="text-white" />
          </div>
          <h2 className="text-white text-xl font-bold">Criar conta</h2>
          <p className="text-sm text-zinc-400">
            Já tem uma conta?{' '}
            <Link href="/auth/login" className="text-indigo-400 hover:underline">
              Login
            </Link>
          </p>
        </CardHeader>

        <CardContent>
                    {!state.verifyReq && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro ao tentar cadastrar usuario!</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <Form action={register} className="space-y-4">
            <FormField Icon={User} name="name" id="name" placeholder="Nome" type="text" />
            <FormField Icon={Mail} name="email" id="email" placeholder="Email" type="email" />
            <FormField Icon={User2} name="login" id="login" placeholder="Login" type="text" />
            <FormField Icon={Lock} name="password" id="password" placeholder="Password" type="password" />

            <Separator className="my-6" />

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={isPending}
            >
              {isPending ? <span className="animate-spin"><Loader2 /></span> : "Cadastrar"}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
