import { useGetEcosystemSummary, useGetDeploymentSummary, useGetRepoStats, useGetExpansionMetrics, useGetAgentActivity } from "@workspace/api-client-react";
import { ControlLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Server, GitBranch, Cloud, TrendingUp, Activity, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "wouter";

function MetricCard({
  title, value, sub, icon: Icon, iconColor, href, testId
}: {
  title: string; value: string | number; sub?: string; icon: React.ElementType;
  iconColor: string; href: string; testId: string;
}) {
  return (
    <Link href={href}>
      <Card
        className="bg-card border-border/60 hover:border-primary/40 transition-colors cursor-pointer"
        data-testid={testId}
      >
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{title}</CardTitle>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold font-mono text-foreground">{value}</div>
          {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
        </CardContent>
      </Card>
    </Link>
  );
}

function SummaryCards() {
  const { data: eco, isLoading: ecoLoading } = useGetEcosystemSummary();
  const { data: deploy, isLoading: depLoading } = useGetDeploymentSummary();
  const { data: repos, isLoading: repoLoading } = useGetRepoStats();
  const { data: expansion, isLoading: expLoading } = useGetExpansionMetrics();

  if (ecoLoading || depLoading || repoLoading || expLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 rounded-lg" />)}
      </div>
    );
  }

  const healthSub = `${eco?.degraded ?? 0} degraded · ${eco?.down ?? 0} down`;
  const repoSub = `${repos?.greenCI ?? 0} green CI · ${repos?.failingCI ?? 0} failing`;
  const deploySub = `${deploy?.totalPages ?? 0} pages · ${deploy?.totalWorkers ?? 0} workers`;
  const expSub = `${expansion?.regionsExpanded ?? 0} regions active`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="control-summary-cards">
      <MetricCard title="Ecosystem Health" value={`${eco?.healthy ?? 0}/${eco?.total ?? 0}`} sub={healthSub} icon={Server} iconColor="text-primary" href="/control" testId="card-ecosystem-health" />
      <MetricCard title="Repositories" value={repos?.total ?? 0} sub={repoSub} icon={GitBranch} iconColor="text-blue-400" href="/control/repos" testId="card-repos" />
      <MetricCard title="Deployments" value={deploy?.activeDeployments ?? 0} sub={deploySub} icon={Cloud} iconColor="text-purple-400" href="/control/deployments" testId="card-deployments" />
      <MetricCard title="Expansion Score" value={expansion?.avgGrowth != null ? `+${expansion.avgGrowth.toFixed(1)}%` : "—"} sub={expSub} icon={TrendingUp} iconColor="text-orange-400" href="/control/expansion" testId="card-expansion" />
    </div>
  );
}

function ActivityTable() {
  const { data: activity, isLoading } = useGetAgentActivity();
  const items = (activity ?? []).slice(0, 10);

  const STATUS_BADGE: Record<string, string> = {
    success: "text-primary border-primary/30",
    failed: "text-destructive border-destructive/30",
    running: "text-blue-400 border-blue-400/30",
  };

  return (
    <Card className="border-border/60" data-testid="agent-activity-table">
      <CardHeader>
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          Recent Agent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-4 space-y-2">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-8" />)}
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground p-4">No activity yet.</p>
        ) : (
          <div className="divide-y divide-border/40">
            {items.map((a) => (
              <div key={a.id} className="flex items-center px-4 py-2.5 gap-4" data-testid={`activity-row-${a.id}`}>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-primary mr-2">{a.agentName}</span>
                  <span className="text-xs text-foreground">{a.action}</span>
                  {a.detail && <span className="text-xs text-muted-foreground ml-2 truncate hidden md:inline">{a.detail}</span>}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant="outline" className={`text-xs ${STATUS_BADGE[a.status ?? "success"] ?? ""}`}>
                    {a.status ?? "success"}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono hidden lg:block">
                    {new Date(a.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const QUICK_LINKS = [
  { label: "Repos & CI", href: "/control/repos", icon: GitBranch },
  { label: "Deployments", href: "/control/deployments", icon: Cloud },
  { label: "Payments", href: "/control/payments", icon: CheckCircle },
  { label: "Logistics", href: "/control/logistics", icon: TrendingUp },
  { label: "Secrets", href: "/control/secrets", icon: AlertTriangle },
  { label: "Expansion", href: "/control/expansion", icon: TrendingUp },
];

export default function ControlHub() {
  return (
    <ControlLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Control Center</h1>
          <p className="text-sm text-muted-foreground mt-1">Platform governance — all systems</p>
        </div>
        <SummaryCards />
        <div>
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Quick Navigation</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {QUICK_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <button
                    className="w-full flex flex-col items-center gap-2 p-3 rounded-lg border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-colors text-xs text-muted-foreground hover:text-foreground"
                    data-testid={`button-quicklink-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
        <ActivityTable />
      </div>
    </ControlLayout>
  );
}
