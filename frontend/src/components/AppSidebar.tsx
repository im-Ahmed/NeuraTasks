import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  LogOut,
  Edit,
  Delete,
  ChevronRight,
  ChevronLeft,
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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const items = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Inbox", url: "/dashboard/inbox", icon: Inbox },
  { title: "Boards", url: "/dashboard/board", icon: Notebook },
  { title: "Tasks", url: "/dashboard/task", icon: Notebook },
  { title: "Calendar", url: "/dashboard/calendar", icon: Calendar },
  { title: "Search", url: "/dashboard/search", icon: Search },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
 const { state, toggleSidebar, isMobile } = useSidebar();
const isCollapsed = state === "collapsed";

  return (
    <>
      {/* Mobile-only: Left edge persistent arrow */}
     {isMobile && (
  <button
    onClick={() => {
      console.log("toggle click");
      toggleSidebar();
    }}
    aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
    className="
      fixed right-0 top-1/2 -translate-y-1/2
      z-[100]
      p-1 bg-gray-400
      text-gray-700 hover:text-black
      transition
    "
  >
   {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
  </button>
)}

      <Sidebar collapsible="icon" className="group-data-[side=left]:border-r">
        {/* Desktop-only toggle button (hover effect) */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
            className={cn(
              "absolute -right-4 top-[50%] z-50",
              "flex h-9 w-9 items-center justify-center rounded-full",
              "bg-background border border-border shadow-sm text-muted-foreground",
              "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100",
              "hover:bg-accent hover:text-accent-foreground",
              "transition-all duration-200 active:scale-95"
            )}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        )}

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>NeuraTasks</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
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
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar.png" alt="Ahmed Farooq" />
                      <AvatarFallback>AF</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-left leading-tight">
                      <span className="text-sm font-medium">Ahmed Farooq</span>
                      <span className="text-xs text-muted-foreground">
                        m@example.com
                      </span>
                    </div>
                    <ChevronRight
                      className={cn(
                        "ml-auto size-4 transition-transform",
                        isCollapsed && "rotate-180"
                      )}
                    />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
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
    </>
  );
}