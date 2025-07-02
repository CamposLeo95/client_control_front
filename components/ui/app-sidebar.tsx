"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { BadgeDollarSign, FileArchive, Handshake, LayoutDashboard, User, UserCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Separator } from "./separator"
import { MySelf } from "@/app/types/user.type"



export function AppSidebar() {

  const activePath = usePathname()

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
      <SidebarContent className="bg-zinc-800 text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="flex  items-center justify-between  px-4">
            <div className="flex w-full items-center gap-2 ">
              <Link href="/app/dashboard" className="flex items-center ">
                <Image src="/logo.png" alt="Admin Panel"  width={80} height={80}/>
              </Link>


            </div>
          </SidebarGroupLabel>
          <Separator className="mt-5 mb-2" />
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className={`hover:bg-indigo-400 cursor-pointer h-12  hover:text-white rounded-xs text-sm font-semibold active:bg-indigo-500 active:text-white ${activePath.startsWith(item.url) ? 'bg-indigo-500 text-white' : ''}`}>
                  <SidebarMenuButton asChild className={`hover:bg-indigo-500 hover:text-white rounded-xs text-sm font-semibold active:bg-indigo-600 active:text-white ${activePath.startsWith(item.url)  ? 'bg-indigo-600 text-white' : ''}`}>
                    <Link href={item.url} className="h-full" >
                    <div className="flex items-center gap-2 h-full ">
                      <item.icon className="w-5 h-5"/>
                      <span>{item.title}</span>
                    </div>
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