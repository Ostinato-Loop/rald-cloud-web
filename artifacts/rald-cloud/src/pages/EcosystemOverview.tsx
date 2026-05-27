import { useListServices, useGetEcosystemSummary, useGetAgentActivity } from "@workspace/api-client-react";
import { Navbar } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, CheckCircle, AlertTriangle, XCircle, Server, GitBranch, Cloud, Zap } from "lucide-react";
import { Link } from "wouter";

const STATUS_COLOR: Record<string, string> = {
  healthy: "text-primary",
  degraded: "text-yellow-500",
  down: "text-destructive",
  unknown: "text-muted-foreground",
};

const STATUS_ICON: Record<string, React.ElementType> = {
  healthy: CheckCircle,
  degraded: AlertTriangle,
  down: XCircle,
  unknown: Server,
};

const CATEGORY_DOT: Record<string, string> = {
  commerce: "bg-primary",
  payments: "bg-blue-500",
  analytics: "bg-purple-500",
  logistics: "bg-orange-500",
  voice: "bg-pink-500",
  identity: "bg-cyan-500",
  devtools: "bg-indigo-500",
  sdk: "bg-green-600",
  admin: "bg-yellow-500",
  observability: "bg-red-500",
  ai: "bg-violet-500",
  docs: "bg-slate-500",
};

function SummaryBar() {
  const { data: summary, isLoading } = useGetEcosystemSummary();
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>
    );
  }
  const stats = [
    { label: "Total Services", value: summary?.total ?? 0, icon: Server, color: "text-foreground" },
    { label: "Healthy", value: summary?.healthy ?? 0, icon: CheckCircle, color: "text-primary" },
    { label: "Total Repos", value: summary?.totalRepos ?? 0, icon: GitBranch, color: "text-blue-400" },
    { label: "Green CI", value: summary?.greenRepos ?? 0, icon: Zap, color: "text-primary" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" data-testid="summary-bar">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <Card key={s.label} className="bg-card border-border/60">
            <CardContent className="pt-4 pb-4 flex items-center gap-3">
              <Icon className={`h-8 w-8 ${s.color}`} />
              <div>
                <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function ServiceGrid() {
  const { data: services, isLoading } = useListServices();
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => <Skeleton key={i} className="h-36 rounded-lg" />)}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="service-grid">
      {(services ?? []).map((svc) => {
        const Icon = STATUS_ICON[svc.status] ?? Server;
        const colorClass = STATUS_COLOR[svc.status] ?? "text-muted-foreground";
        const dot = CATEGORY_DOT[svc.category] ?? "bg-muted";
        return (
          <Card
            key={svc.id}
            className="bg-card border-border/60 hover:border-primary/40 transition-colors cursor-pointer group"
            data-testid={`card-service-${svc.id}`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className={`inline-block h-2 w-2 rounded-full ${dot}`} />
                  <CardTitle className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {svc.name}
                  </CardTitle>
                </div>
                <Icon className={`h-4 w-4 ${colorClass}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{svc.description ?? "—"}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">{svc.domain}</span>
                <Badge
                  variant="outline"
                  className={`text-xs ${colorClass} border-current/30`}
                  data-testid={`badge-status-${svc.id}`}
                >
                  {svc.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function AgentFeed() {
  const { data: activity, isLoading } = useGetAgentActivity();
  const items = (activity ?? []).slice(0, 8);
  return (
    <div data-testid="agent-feed">
      <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Agent Activity</h3>
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-10" />)}
        </div>
      ) : items.length === 0 ? (
        <p className="text-xs text-muted-foreground">No recent activity.</p>
      ) : (
        <div className="space-y-2">
          {items.map((a) => (
            <div
              key={a.id}
              className="flex items-start gap-2 p-2 rounded bg-secondary/40 border border-border/30"
              data-testid={`activity-row-${a.id}`}
            >
              <Activity className="h-3 w-3 mt-0.5 text-primary shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-medium text-foreground">{a.agentName}</span>
                <span className="text-xs text-muted-foreground mx-1">—</span>
                <span className="text-xs text-muted-foreground truncate">{a.action}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function EcosystemOverview() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="container max-w-screen-2xl flex-1 py-8 px-4 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              RALD<span className="text-primary">.cloud</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">African infrastructure — unified command</p>
          </div>
          <Link href="/control">
            <button
              className="text-xs px-3 py-1.5 rounded border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
              data-testid="button-goto-control"
            >
              Control Center
            </button>
          </Link>
        </div>
        <SummaryBar />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">
              Ecosystem Services
            </h2>
            <ServiceGrid />
          </div>
          <aside>
            <AgentFeed />
          </aside>
        </div>
      </div>
    </div>
  );
}
