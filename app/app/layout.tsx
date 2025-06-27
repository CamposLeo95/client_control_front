import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
    <SidebarProvider
    >
      <AppSidebar />
      <main className="flex-1 px-4 bg-gray-100 w-full ">
        <SidebarTrigger />
        <div className=" lg:px-20 xl:px-20 2xl:px-20 py-4">
        {children}
        </div>
      </main>
    </SidebarProvider>
    </div>
  );
}