// src/components/AppSidebar.jsx
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  LogOut,
  Edit,
  Delete,
  ChevronUp,
  Notebook,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const items = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Inbox", url: "/dashboard/inbox", icon: Inbox },
  { title: "Boards", url: "/dashboard/board", icon: Notebook },
  { title: "Calendar", url: "/dashboard/calendar", icon: Calendar },
  { title: "Search", url: "/dashboard/search", icon: Search },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>NeuraTasks</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  {/* Avatar */}
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.png" alt="Ahmed Farooq" />
                    <AvatarFallback>AF</AvatarFallback>
                  </Avatar>

                  {/* User Info */}
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-sm font-medium">Ahmed Farooq</span>
                    <span className="text-xs text-muted-foreground">
                      m@example.com
                    </span>
                  </div>

                  {/* Chevron */}
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              {/* Dropdown Content */}
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuItem>
                  <Edit className="mr-2 size-4" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Delete className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => console.log("Logout")}
                >
                  <LogOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
