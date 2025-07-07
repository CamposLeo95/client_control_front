import { ModeToggle } from "@/components/mode-toggle";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import axios from "axios";
import { cookies } from "next/headers";
import { MySelf } from "../types/user.type";
import { Suspense } from "react";
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
        <AppSidebar user={user} />
        <main className="flex-1 px-4  w-full ">
          <div className="w-full flex items-center justify-between ">
            <div className="flex items-center gap-2 p-2">
              <SidebarTrigger />
              <ModeToggle />
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