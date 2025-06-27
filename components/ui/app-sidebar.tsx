import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator
} from "@/components/ui/sidebar"
import { BadgeDollarSign, FileArchive, Handshake, LayoutDashboard, TowerControl, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Separator } from "./separator"

export function AppSidebar() {

  const items = [
  {
    title: "Dashboard",
    url: "/app/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Clientes",
    url: "/app/clients",
    icon: User,
  },
  {
    title: "Assinaturas",
    url: "/app/subscriptions",
    icon: FileArchive,
  },
  {
    title: "Pagamentos",
    url: "/app/payments",
    icon: BadgeDollarSign,
  },
  {
    title: "Serviços",
    url: "/app/services",
    icon: Handshake,
  },
]
  return (
   <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-2 py-4">
              <Image src="/admin-panel.png" alt="Admin Panel"  width={24} height={24}/>
              <span className="uppercase font-bold">Controle de Clientes</span>
            </div>
          </SidebarGroupLabel>
          <Separator className="my-4" />
            
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}