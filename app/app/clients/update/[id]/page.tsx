import getClientById from "@/app/actions/clients/client-id";
import FormClient from "../../components/forms/form-client";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface IUpdateClientProps {
  params: Promise<{ id: string }>;
}

export default async function updateClient({ params }: IUpdateClientProps) {
  const { id } = await params;

  const client = await getClientById(id);

  if(!client) {
    return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white px-4 text-center">
        <AlertTriangle size={64} className="text-indigo-400 mb-4" />
        <h1 className="text-5xl font-bold mb-2">404</h1>
        <p className="text-lg mb-6">Oops! Cliente não encontrada!</p>
        <Link
          href="/auth/login"
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded text-white font-semibold"
        >
          Voltar para o Início
        </Link>
      </div>
    )
  }

  return (
       <div className="flex items-center justify-center ">
         <FormClient id={id} client={client} />
       </div>
  );
}