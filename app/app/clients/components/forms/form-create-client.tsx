"use client"

import { createClient } from "@/app/actions/clients/create-client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertCircleIcon, KeyRound, Loader, Lock, Mail, Phone, User } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import InputForm from "@/components/input-form";
import TitleForm from "@/components/title-form";

export default function FormCreateClient() {
  const {push} = useRouter()
  const [state, createAction, isPending] = useActionState(createClient,{
		verifyReq: true,
		message: "",
    isSuccess: false,
	})

    useEffect(() => {
      if (state?.isSuccess) {
        push("/app/clients");
      }
    }, [state]);

  return (

      <div  className="bg-none w-full lg:w-[800px]">
        <div >
          <div className="text-center">
            <TitleForm  icon={<User className="text-2xl"/>} title1="Cadastrar" title2="cliente"/>
          </div>
          <Separator />
        </div>
        <div >
        {!state.verifyReq && (
          <Alert variant={"destructive"} className="mb-4">
          <AlertCircleIcon />
          <AlertTitle>Erro ao tentar criar cliente!</AlertTitle>
          <AlertDescription>
            {state.message}
          </AlertDescription>
        </Alert>
        )}
        <Form action={createAction} >
      
          <InputForm icon={<User />} placeholder="Nome" name="name" />
          <InputForm icon={<Lock />}  placeholder="Login" name="login" />
          <InputForm icon={<KeyRound />} placeholder="Senha" name="password" />
          <InputForm icon={<Mail/>} placeholder="Email" name="email" />
          <InputForm icon={<Phone />} placeholder="Telephone" name="phone" />
          <Separator className="my-4" />
          <div className="flex gap-2 mt-10"> 
          <Button type="submit" className="flex-1 cursor-pointer bg-indigo-500 hover:bg-indigo-600 rounded-xs" disabled={isPending} >
            {isPending ? <div className="flex justify-center items-center"><Loader className="animate-spin" /> <span>Cadastrando...</span></div> : "Cadastrar"}
          </Button>
          {!isPending &&(
            <Link className=" flex-1 p-1 flex justify-center items-center rounded-xs text-sm font-semibold bg-zinc-50 hover:bg-zinc-200" href={`/app/clients`} >
              <div className="flex items-center gap-2 w-full justify-center ">
                <span>Cancelar</span>
              </div>
              </Link>
          )} 
          </div>
        </Form>
        </div>
      </div>

  );
}