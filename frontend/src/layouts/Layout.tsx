// src/components/Layout.jsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col flex-1 min-w-0 overflow-hidden gap-6">
        <Outlet /> {/* renders nested pages */}
      </main>
    </SidebarProvider>
  );
}
