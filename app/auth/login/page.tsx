import { cookies } from "next/headers";
import LoginForm from "./components/login-form";
import checkToken from "@/app/utils/check-token";


export default async function LoginPage() {
  const token = (await cookies()).get("api-token")?.value;
  checkToken(token);
  return (
    <LoginForm />
  )
  
}
