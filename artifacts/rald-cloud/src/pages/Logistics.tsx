import { useState } from "react";
import { useListLogisticsProviders, useGetLogisticsStats, useSaveLogisticsProvider, getListLogisticsProvidersQueryKey } from "@workspace/api-client-react";
import { ControlLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { Truck, CheckCircle, AlertCircle, Key, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const credSchema = z.object({
  apiKey: z.string().min(1, "API Key required"),
  secretKey: z.string().optional(),
  baseUrl: z.string().optional(),
});

function CredentialsDialog({ provider }: { provider: { id: string; name: string; slug: string } }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const qc = useQueryClient();
  const save = useSaveLogisticsProvider();
  const form = useForm<z.infer<typeof credSchema>>({
    resolver: zodResolver(credSchema),
    defaultValues: { apiKey: "", secretKey: "", baseUrl: "" },
  });

  const onSubmit = (values: z.infer<typeof credSchema>) => {
    save.mutate({ data: { slug: provider.slug, ...values } }, {
      onSuccess: () => {
        toast({ title: "Credentials saved", description: provider.name });
        qc.invalidateQueries({ queryKey: getListLogisticsProvidersQueryKey() });
        setOpen(false);
        form.reset();
      },
      onError: () => toast({ title: "Error", description: "Failed to save credentials", variant: "destructive" }),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs h-7" data-testid={`button-credentials-${provider.slug}`}>
          <Key className="h-3 w-3" /> Add Credentials
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{provider.name} — Credentials</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="apiKey" render={({ field }) => (
              <FormItem>
                <FormLabel>API Key</FormLabel>
                <FormControl><Input placeholder="API key" type="password" {...field} data-testid={`input-apikey-${provider.slug}`} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="secretKey" render={({ field }) => (
              <FormItem>
                <FormLabel>Secret Key (optional)</FormLabel>
                <FormControl><Input placeholder="Secret key" type="password" {...field} data-testid={`input-secretkey-${provider.slug}`} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="baseUrl" render={({ field }) => (
              <FormItem>
                <FormLabel>Base URL (optional)</FormLabel>
                <FormControl><Input placeholder="https://api.provider.com" {...field} data-testid={`input-baseurl-${provider.slug}`} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" disabled={save.isPending} className="w-full" data-testid={`button-submit-cred-${provider.slug}`}>
              {save.isPending ? "Saving..." : "Save Credentials"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function StatsPanel() {
  const { data: stats, isLoading } = useGetLogisticsStats();
  if (isLoading) return <Skeleton className="h-48 w-full" />;
  const byProvider = stats?.byProvider ?? [];
  return (
    <Card className="border-border/60" data-testid="logistics-stats-panel">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Shipments</CardTitle>
          <div className="text-right">
            <div className="text-xl font-bold font-mono text-primary">
              {(stats?.totalShipments ?? 0).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              {stats?.delivered ?? 0} delivered · {stats?.pending ?? 0} pending
            </div>
          </div>
        </div>
      </CardHeader>
      {byProvider.length > 0 && (
        <CardContent>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={byProvider} barSize={20}>
              <XAxis dataKey="provider" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, fontSize: 11 }}
                formatter={(v: number) => [`${v}`, "Shipments"]}
              />
              <Bar dataKey="count" fill="hsl(var(--chart-2))" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      )}
    </Card>
  );
}

export default function Logistics() {
  const { data: providers, isLoading } = useListLogisticsProviders();
  const qc = useQueryClient();
  const save = useSaveLogisticsProvider();
  const { toast } = useToast();

  const toggleProvider = (slug: string, enabled: boolean, priority: number) => {
    save.mutate({ data: { slug, apiKey: "", enabled, priority } }, {
      onSuccess: () => qc.invalidateQueries({ queryKey: getListLogisticsProvidersQueryKey() }),
      onError: () => toast({ title: "Error toggling provider", variant: "destructive" }),
    });
  };

  return (
    <ControlLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Truck className="h-5 w-5 text-orange-400" />
            Nigerian Logistics Routing
          </h1>
          <p className="text-sm text-muted-foreground mt-1">10 providers — route by coverage, speed &amp; delivery rate</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <Card className="border-border/60 overflow-hidden" data-testid="logistics-providers-table">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Providers</CardTitle>
            </CardHeader>
            <div>
              {isLoading ? (
                <div className="p-4 space-y-2">{[...Array(10)].map((_, i) => <Skeleton key={i} className="h-14" />)}</div>
              ) : (providers ?? []).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 px-4 py-3 border-b border-border/40 last:border-0 hover:bg-secondary/30 transition-colors"
                  data-testid={`row-provider-${p.slug}`}
                >
                  <div className="w-6 text-center text-xs font-mono text-muted-foreground">{p.priority}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{p.name}</span>
                      {p.hasCredentials ? (
                        <CheckCircle className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                    {(p.coverage ?? []).length > 0 && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{p.coverage?.slice(0, 3).join(", ")}</p>
                    )}
                    {p.deliveryRate != null && (
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="h-1 w-24 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-chart-2 rounded-full" style={{ width: `${p.deliveryRate}%`, backgroundColor: "hsl(var(--chart-2))" }} />
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">{p.deliveryRate.toFixed(1)}%</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant="outline" className={`text-xs ${p.hasCredentials ? "text-primary border-primary/30" : "text-muted-foreground"}`}>
                      {p.hasCredentials ? "Configured" : "Not set"}
                    </Badge>
                    <CredentialsDialog provider={p} />
                    <Switch
                      checked={p.enabled}
                      onCheckedChange={(v) => toggleProvider(p.slug, v, p.priority)}
                      data-testid={`switch-provider-${p.slug}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <StatsPanel />
        </div>
      </div>
    </ControlLayout>
  );
}
