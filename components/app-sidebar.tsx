"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
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
import { LayoutDashboardIcon, ListIcon, FolderIcon, UsersIcon, Settings2Icon, CommandIcon, FolderTreeIcon } from "lucide-react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.svg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: (
        <FolderIcon
        />
      ),
    },
    {
      title: "Add Product",
      url: "/admin/products/add",
      icon: (
        <ListIcon
        />
      ),
    },
    {
      title: "Categories",
      url: "/admin/categories",
      icon: (
        <FolderTreeIcon />
      ),
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: (
        <UsersIcon
        />
      ),
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: (
        <ListIcon
        />
      ),
    },
    {
      title: "Reviews",
      url: "/admin/reviews",
      icon: (
        <ListIcon
        />
      ),
    },
  ],
  navClouds: [
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/admin/settings",
      icon: (
        <Settings2Icon
        />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
