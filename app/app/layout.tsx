import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { cookies } from "next/headers";
import axios from "axios";
import { MySelf } from "../types/user.type";
import { UserCircle } from "lucide-react";
const URL_API = process.env.NEXT_PUBLIC_API_URL;
export default async function LayoutApp({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get("api-token")?.value;

  const { data: user } = await axios.get<MySelf>(`${URL_API}/user/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <div className="flex min-h-screen">
      <SidebarProvider
      >
        <AppSidebar  />
        <main className="flex-1 px-4 bg-gray-100 w-full ">
          <div className="w-full flex items-center justify-between ">
            <SidebarTrigger />
              <div className="flex items-center gap-2 p-2">
                <UserCircle className="text-indigo-500"/>
                <span className="font-semibold text-lg italic">{user.name}</span>
              </div>
          </div>
          <div className=" lg:px-20 xl:px-20 2xl:px-20 py-4">
          {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}