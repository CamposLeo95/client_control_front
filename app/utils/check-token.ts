import { redirect } from "next/navigation";

export default function checkToken(token: string | null | undefined) {
   if (!token) {
    return
   }
   redirect("/app/clients");
}