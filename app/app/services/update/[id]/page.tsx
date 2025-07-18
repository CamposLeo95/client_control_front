import getServiceById from "@/app/actions/services/service-id";
import FormService from "../../components/forms/form-service";

interface RegisterProps {
  params: Promise<{ id: string }>;
}

export default async function Register({ params }: RegisterProps){

  const { id } = await params;

  const service = await getServiceById(id);

  return(
    <div className="flex items-center justify-center ">
      <FormService id={id} service={service} />
    </div>
  )
}