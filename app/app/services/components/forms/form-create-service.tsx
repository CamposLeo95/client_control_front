"use client"

import { createService } from "@/app/actions/services/create-service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircleIcon, BriefcaseBusiness, CircleDollarSign, Loader, User } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";


import InputForm from "@/components/input-form";
import TitleForm from "@/components/title-form";

export default function FormCreateService() {
  const {push} = useRouter()
  const [state, createAction, isPending] = useActionState(createService,{
		verifyReq: true,
		message: "",
    isSuccess: false,
	})

  useEffect(() => {
    if (state?.isSuccess) {
      push("/app/services");
    }
  }, [state]);

  return (

  <div  className="bg-none w-full lg:w-[800px]">

        <div >
          <div className="text-center">
            <TitleForm  icon={<User className="text-2xl"/>} title1="Cadastrar" title2="Serviço"/>
          </div>
          <Separator />
        </div>
        <div >
          {!state.verifyReq && (
          <Alert variant={"destructive"} className="mb-4">
          <AlertCircleIcon />
          <AlertTitle>Erro ao tentar criar serviço!</AlertTitle>
          <AlertDescription>
            {state.message}
          </AlertDescription>
        </Alert>
        )}
        <Form action={createAction} >
      
          <InputForm icon={<BriefcaseBusiness />} placeholder="Nome do Serviço" name="name" />
          <InputForm icon={<CircleDollarSign />}  placeholder="Valor do Serviço" name="price" />
          <div className="flex gap-2 mt-10"> 
          <Button type="submit" className="flex-1 cursor-pointer bg-indigo-400 hover:bg-indigo-500" disabled={isPending} >
            {isPending ? <div className="flex justify-center items-center"><Loader className="animate-spin" /> <span>Cadastrando...</span></div> : "Cadastrar"}
          </Button>
          {!isPending &&(
            <Link className="hover:bg-zinc-100 flex-1 p-1 flex justify-center items-center rounded-md text-sm font-semibold" href={`/app/services`} >Cancelar</Link>
          )} 
          </div>
        </Form>
        </div>
      </div>

  );
}