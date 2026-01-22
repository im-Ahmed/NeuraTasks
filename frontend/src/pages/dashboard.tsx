import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card"; 

// Sidebar data
const sidebarItems = [
  {
    title: "Dashboard",
    description: "Overview of your stats and key metrics",
    icon: "🍨",
    href: "/dashboard", 
  },
  {
    title: "Profile",
    description: "Manage your personal information",
    icon: "🧑",
    href: "/profile",
  },
  {
    title: "Settings",
    description: "Customize your account settings",
    icon: "🕸️",
    href: "/settings",
  },
  {
    title: "Notifications",
    description: "View and manage alerts",
    icon: "🆕",
    href: "/notifications",
  },
];
const Dashboard = () => {
  return <h1>dashboard</h1>
};

export default Dashboard;