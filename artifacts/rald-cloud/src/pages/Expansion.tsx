import { useListRegions, useGetExpansionRecommendations, useGetExpansionMetrics } from "@workspace/api-client-react";
import { ControlLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, MapPin, DollarSign, Users, Zap } from "lucide-react";

function MetricsBar() {
  const { data: metrics, isLoading } = useGetExpansionMetrics();
  if (isLoading) return <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6"><Skeleton className="h-16 col-span-5" /></div>;

  const items = [
    { label: "Total Revenue", value: `₦${((metrics?.totalRevenue ?? 0) / 1_000_000).toFixed(1)}M`, color: "text-primary" },
    { label: "Top Region", value: metrics?.topRegion ?? "—", color: "text-foreground" },
    { label: "Avg Growth", value: metrics?.avgGrowth != null ? `+${metrics.avgGrowth.toFixed(1)}%` : "—", color: "text-primary" },
    { label: "Monthly Growth", value: metrics?.monthlyGrowth != null ? `+${metrics.monthlyGrowth.toFixed(1)}%` : "—", color: "text-blue-400" },
    { label: "Regions Active", value: metrics?.regionsExpanded ?? 0, color: "text-orange-400" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6" data-testid="expansion-metrics-bar">
      {items.map((s) => (
        <Card key={s.label} className="border-border/60">
          <CardContent className="p-3">
            <div className={`text-lg font-bold font-mono ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function RegionCard({ region }: { region: { id: string; name: string; country: string; state: string; revenue: number; transactions: number; growth: number; activemerchants?: number; profitScore?: number; expandable?: boolean } }) {
  const isPositive = region.growth >= 0;
  return (
    <Card
      className={`border-border/60 ${region.expandable ? "border-primary/30 hover:border-primary/60" : ""} transition-colors`}
      data-testid={`card-region-${region.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-semibold text-sm text-foreground">{region.name}</span>
              {region.expandable && (
                <Badge variant="outline" className="text-xs text-primary border-primary/30">Expandable</Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{region.state}, {region.country}</span>
          </div>
          <span className={`text-sm font-bold font-mono ${isPositive ? "text-primary" : "text-destructive"}`}>
            {isPositive ? "+" : ""}{region.growth.toFixed(1)}%
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground flex items-center gap-1"><DollarSign className="h-3 w-3" />Revenue</span>
            <span className="font-mono text-foreground">₦{(region.revenue / 1_000_000).toFixed(2)}M</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground flex items-center gap-1"><Zap className="h-3 w-3" />Transactions</span>
            <span className="font-mono text-foreground">{region.transactions.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" />Merchants</span>
            <span className="font-mono text-foreground">{(region.activemerchants ?? 0).toLocaleString()}</span>
          </div>
          {region.profitScore != null && (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Profit Score</span>
                <span className="font-mono text-primary">{region.profitScore}</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${Math.min(100, region.profitScore)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const PRIORITY_COLOR: Record<string, string> = {
  high: "text-primary border-primary/30",
  medium: "text-yellow-500 border-yellow-500/30",
  low: "text-muted-foreground border-muted-foreground/30",
};

function RecommendationsPanel() {
  const { data: recs, isLoading } = useGetExpansionRecommendations();
  if (isLoading) return <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-20" />)}</div>;

  return (
    <div className="space-y-3" data-testid="expansion-recommendations">
      {(recs ?? []).slice(0, 5).map((r) => (
        <Card key={r.region} className="border-border/60 hover:border-primary/30 transition-colors" data-testid={`card-rec-${r.region}`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-foreground">{r.region}</span>
                  <Badge variant="outline" className={`text-xs ${PRIORITY_COLOR[r.priority ?? "low"]}`}>
                    {r.priority ?? "low"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.reason}</p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-sm font-bold font-mono text-primary">
                  ₦{(r.estimatedRevenue / 1_000_000).toFixed(1)}M
                </div>
                <div className="text-xs text-muted-foreground">est. revenue</div>
                <div className="text-xs font-mono text-foreground mt-1">Score: {r.score}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function Expansion() {
  const { data: regions, isLoading } = useListRegions();

  return (
    <ControlLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-400" />
            Self-Expansion by Region
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            AI-driven profit scoring across Nigerian states + Ghana &amp; Kenya
          </p>
        </div>
        <MetricsBar />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Regional Performance</h2>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(12)].map((_, i) => <Skeleton key={i} className="h-48" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-testid="regions-grid">
                {(regions ?? []).map((r) => <RegionCard key={r.id} region={r} />)}
              </div>
            )}
          </div>
          <aside>
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">AI Expansion Recommendations</h2>
            <RecommendationsPanel />
          </aside>
        </div>
      </div>
    </ControlLayout>
  );
}
