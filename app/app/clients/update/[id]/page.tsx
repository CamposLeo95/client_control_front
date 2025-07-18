import getClientById from "@/app/actions/clients/client-id";
import FormClient from "../../components/forms/form-client";

interface IUpdateClientProps {
  params: Promise<{ id: string }>;
}

export default async function updateClient({ params }: IUpdateClientProps) {
  const { id } = await params;

  const client = await getClientById(id);

  return (
       <div className="flex items-center justify-center ">
         <FormClient id={id} client={client} />
       </div>
  );
}