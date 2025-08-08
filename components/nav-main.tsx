"use client"

import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"


interface NavMainProps {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname()


  function isActivePathName(url: string) {
    if (url === pathname) return true
    return false
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {/* <SidebarMenuItem className="flex items-center gap-2">
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >

              <span className="sr-only">Inbox</span>
              <IconMail />
            </Button>
          </SidebarMenuItem> */}
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
          <Link href={item.url} key={item.title}  className={cn( isActivePathName(item.url) ? "bg-indigo-500 text-white rounded-lg" : "", )} >
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} className="cursor-pointer  py-6 px-2">
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
              </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
