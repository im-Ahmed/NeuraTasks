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
  return (
    <div className="min-h-screen bg-[#0a0f1a] grid grid-rows-[auto_1fr_auto] text-white">
      {/* first row */}
      <div className="p-6  ">
       <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold">Boards</h1>
        <div className="flex items-center gap-3">
          <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg font-medium transition-colors">
            Create Board
          </button>
          <button className="p-2 rounded-lg bg-[#1a1f2e] hover:bg-[#2a3349] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button className="p-2 rounded-lg bg-[#1a1f2e] hover:bg-[#2a3349] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
      </div>
      {/* this is second row */}
      <div className="min-h-[300px] bg-[#0a0f1a]  p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-4 md:col-span-1">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                window.location.href = item.href;
              }}
              className="
                w-full text-left 
              "
              aria-label={`Go to ${item.title}`}
            >
              <Card className=" bg-[#73778162] border-none text-white">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription className="text-[#dce0ebe0]">{item.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="justify-end ">
                  <span className="text-sm text-muted-foreground group-hover:text-primary">
                    Go →
                  </span>
                </CardFooter>
              </Card>
            </button>
          ))}
        </div>
        {/* main content */}
        <div className="md:col-span-2 bg-[#73778162]  border-none rounded-xl shadow-sm p-8 text-center flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Main Content Area</h2>
          <p className="text-lg text-muted-foreground text-[#dce0ebe0]">
            Click any sidebar card to navigate!
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;