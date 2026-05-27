import { useListAgents, useGetAgentActivity } from "@workspace/api-client-react";
import { ControlLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Cpu, Activity, CheckCircle, AlertCircle, Clock } from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string; icon: React.ElementType }> = {
  active: { label: "Active", color: "text-primary border-primary/30", dot: "bg-primary", icon: CheckCircle },
  idle: { label: "Idle", color: "text-muted-foreground border-muted-foreground/30", dot: "bg-muted-foreground", icon: Clock },
  error: { label: "Error", color: "text-destructive border-destructive/30", dot: "bg-destructive", icon: AlertCircle },
};

const ACTIVITY_STATUS: Record<string, string> = {
  success: "text-primary",
  failed: "text-destructive",
  running: "text-blue-400",
};

const AGENT_COLORS = [
  "text-primary", "text-blue-400", "text-purple-400",
  "text-orange-400", "text-pink-400", "text-cyan-400", "text-yellow-400",
];

function AgentCard({ agent, index }: { agent: { id: string; name: string; role: string; status: string; tasksToday?: number; lastAction?: string | null; description?: string }; index: number }) {
  const cfg = STATUS_CONFIG[agent.status] ?? STATUS_CONFIG["idle"];
  const StatusIcon = cfg.icon;
  const accentColor = AGENT_COLORS[index % AGENT_COLORS.length];

  return (
    <Card className="border-border/60 hover:border-primary/30 transition-colors" data-testid={`card-agent-${agent.id}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0`}>
              <Cpu className={`h-4 w-4 ${accentColor}`} />
            </div>
            <div>
              <CardTitle className={`text-sm font-bold ${accentColor}`}>{agent.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{agent.role}</p>
            </div>
          </div>
          <Badge variant="outline" className={`text-xs gap-1 ${cfg.color}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot} inline-block`} />
            {cfg.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {agent.description && (
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{agent.description}</p>
        )}
        <div className="flex items-center justify-between text-xs">
          <div className="text-muted-foreground">
            Tasks today: <span className="font-mono text-foreground">{agent.tasksToday ?? 0}</span>
          </div>
          {agent.lastAction && (
            <span className="text-muted-foreground font-mono">{new Date(agent.lastAction).toLocaleTimeString()}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function AgentFleet() {
  const { data: agents, isLoading } = useListAgents();
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(7)].map((_, i) => <Skeleton key={i} className="h-36" />)}
      </div>
    );
  }
  const activeCount = (agents ?? []).filter((a) => a.status === "active").length;
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Fleet — {(agents ?? []).length} Agents</h2>
        <Badge variant="outline" className="text-xs text-primary border-primary/30">
          {activeCount} active
        </Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" data-testid="agents-grid">
        {(agents ?? []).map((agent, i) => <AgentCard key={agent.id} agent={agent} index={i} />)}
      </div>
    </div>
  );
}

function ActivityFeed() {
  const { data: activity, isLoading } = useGetAgentActivity();
  const items = activity ?? [];

  return (
    <div data-testid="activity-feed">
      <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">
        Live Activity Feed
      </h2>
      <Card className="border-border/60 overflow-hidden">
        <div className="grid grid-cols-[120px_1fr_100px_80px_120px] text-xs font-semibold uppercase tracking-widest text-muted-foreground px-4 py-2 border-b border-border/40 bg-secondary/30 hidden md:grid">
          <span>Agent</span>
          <span>Action</span>
          <span>Detail</span>
          <span>Status</span>
          <span>Time</span>
        </div>
        {isLoading ? (
          <div className="p-4 space-y-2">{[...Array(8)].map((_, i) => <Skeleton key={i} className="h-10" />)}</div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground text-sm">No activity yet.</div>
        ) : (
          <div className="divide-y divide-border/40">
            {items.map((a) => (
              <div
                key={a.id}
                className="flex flex-col md:grid md:grid-cols-[120px_1fr_100px_80px_120px] items-start md:items-center px-4 py-2.5 hover:bg-secondary/30 transition-colors gap-1 md:gap-0"
                data-testid={`activity-row-${a.id}`}
              >
                <span className="text-xs font-semibold text-primary truncate">{a.agentName}</span>
                <span className="text-xs text-foreground truncate">{a.action}</span>
                <span className="text-xs text-muted-foreground truncate hidden md:block">{a.detail ?? "—"}</span>
                <span className={`text-xs font-medium ${ACTIVITY_STATUS[a.status ?? "success"] ?? "text-foreground"}`}>
                  {a.status ?? "success"}
                </span>
                <span className="text-xs text-muted-foreground font-mono">{new Date(a.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default function Agents() {
  return (
    <ControlLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" />
            AI Agent Fleet
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Atlas · Sentinel · Nova · Forge · Echo · Pulse · Lee — autonomous operators
          </p>
        </div>
        <AgentFleet />
        <ActivityFeed />
      </div>
    </ControlLayout>
  );
}
