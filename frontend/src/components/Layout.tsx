// src/components/Layout.jsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 bg-neutral-800 text-white w-screen h-screen">
        <SidebarTrigger className="absolute opacity-[0] hover:opacity-[100] "/>
        <Outlet /> {/* renders nested pages */}
      </main>
    </SidebarProvider>
  );
}
