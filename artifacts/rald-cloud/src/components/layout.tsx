import { Link, useLocation } from "wouter";
import { Activity, Box, Cloud, Database, Globe, Key, Settings, ShieldAlert, Truck, Cpu, Network, Server } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2" data-testid="link-home">
            <span className="hidden font-bold sm:inline-block">
              RALD<span className="text-primary">.cloud</span>
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground"
              data-testid="link-nav-overview"
            >
              Overview
            </Link>
            <Link
              href="/control"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              data-testid="link-nav-control"
            >
              Control Center
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function ControlSidebar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/control", label: "Dashboard", icon: Activity },
    { href: "/control/repos", label: "Repositories", icon: Box },
    { href: "/control/deployments", label: "Deployments", icon: Cloud },
    { href: "/control/payments", label: "Payments", icon: Database },
    { href: "/control/logistics", label: "Logistics", icon: Truck },
    { href: "/control/secrets", label: "Secrets", icon: Key },
    { href: "/control/expansion", label: "Expansion", icon: Globe },
    { href: "/control/agents", label: "AI Agents", icon: Cpu },
  ];

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block md:w-64 border-r border-border/40 bg-sidebar">
      <div className="h-full py-6 pl-8 pr-6 overflow-y-auto">
        <div className="space-y-4">
          <div className="py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight text-foreground">
              Command
            </h2>
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href || (location.startsWith(item.href) && item.href !== "/control");
                return (
                  <Link key={item.href} href={item.href}>
                    <button
                      className={`w-full flex items-center justify-start gap-2 px-2 py-1.5 text-sm rounded-md transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                      data-testid={`link-sidebar-${item.label.toLowerCase()}`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function ControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <div className="container flex-1 items-start md:grid md:grid-cols-[250px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10">
        <ControlSidebar />
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr]">
          <div className="mx-auto w-full min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
