"use client"

import { MySelf } from "@/app/types/user.type"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconInnerShadowTop,
  IconListDetails,
  IconUsers
} from "@tabler/icons-react"
import * as React from "react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [

    {
      title: "Clientes",
      url: "/app/clients",
      icon: IconListDetails,
    },
    {
      title: "Assinaturas",
      url: "/app/subscriptions",
      icon: IconChartBar,
    },
    {
      title: "Pagamentos",
      url: "/app/payments",
      icon: IconFolder,
    },
    {
      title: "Serviços",
      url: "/app/services",
      icon: IconUsers,
    },
  ],
}

interface AppSidebarProps {
  user: MySelf
}

export function AppSidebar({ user, ...props }: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}  >
      <SidebarHeader  >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/app/clients">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Controle de Clientes</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent >
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter >
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
