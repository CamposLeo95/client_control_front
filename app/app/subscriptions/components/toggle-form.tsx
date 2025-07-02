'use client';

import { toggleSubscription } from "@/app/actions/subscriptions/toggle-subscription";
import { Switch } from "@/components/ui/switch";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function ToggleForm({ id, checked }: { id: number; checked: boolean }) {
  const {refresh} = useRouter();
 const [state, toggleAction, _isPending] = useActionState(toggleSubscription, {
      id,
      verifyReq: true,
      message: "",
      isSuccess: false
 });

 useEffect(() => {
   if (state?.isSuccess) {
    refresh();
   }
 } , [state]);

  return (
    <Form action={toggleAction} className="flex items-center gap-2">
      <Switch checked={checked} type="submit"  />
    </Form>
  );
}