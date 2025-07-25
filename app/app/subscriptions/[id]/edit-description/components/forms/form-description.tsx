"use client"

import { editSubscriptionDescription } from "@/app/actions/subscriptions/edit-subscription-description";
import InfoToggleRow from "@/components/info-toggle-row";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Info, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

interface FormDescriptionProps {
  id: string;
  description: string;
}
export default function FormDescription({ id, description }: FormDescriptionProps) {
  const { push } = useRouter();
  const [descriptionValue, setDescriptionValue] = useState(description || "");
  const [state, editDescriptionAction, isPending] = useActionState(editSubscriptionDescription, {
    verifyReq: true,
    message: "",
    isSuccess: false,
  });

    useEffect(() => {
      if (state?.isSuccess) {
        push(`/app/subscriptions/${id}`);
      }
    }, [state]);


  return (
    <form action={editDescriptionAction} >
        <div className="mt-1">
          <InfoToggleRow icon={<Info />} label="Descrição" content={null} />
          <textarea
            id="description"
            name="description"
            className="w-full mt-2 p-3 border rounded-md resize-none font-semibold outline text-indigo-400 placeholder:italic placeholder:text-indigo-400"
            rows={4}
            placeholder="Descrição do pagamento..."
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
          />
        </div>
        <input type="hidden" name="id" value={id} />
        <div className="flex gap-2 mt-2">
          <Button type="submit" className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer" disabled={isPending}>
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" /> <span>Salvando...</span>
              </div>
            ) : (
              "Salvar Descrição"
            )}
          </Button>
        </div>
    </form>
  )
}