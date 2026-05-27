import { useState } from "react";
import { useListPaymentProviders, useGetPaymentStats, useSavePaymentProvider, getListPaymentProvidersQueryKey, getGetPaymentStatsQueryKey } from "@workspace/api-client-react";
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
import { CreditCard, CheckCircle, AlertCircle, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const credSchema = z.object({
  apiKey: z.string().min(1, "API Key required"),
  secretKey: z.string().optional(),
  webhookSecret: z.string().optional(),
});

function CredentialsDialog({ provider }: { provider: { id: string; name: string; slug: string } }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const qc = useQueryClient();
  const save = useSavePaymentProvider();
  const form = useForm<z.infer<typeof credSchema>>({
    resolver: zodResolver(credSchema),
    defaultValues: { apiKey: "", secretKey: "", webhookSecret: "" },
  });

  const onSubmit = (values: z.infer<typeof credSchema>) => {
    save.mutate({ data: { slug: provider.slug, ...values } }, {
      onSuccess: () => {
        toast({ title: "Credentials saved", description: provider.name });
        qc.invalidateQueries({ queryKey: getListPaymentProvidersQueryKey() });
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
                <FormControl><Input placeholder="sk_live_..." type="password" {...field} data-testid={`input-apikey-${provider.slug}`} /></FormControl>
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
            <FormField control={form.control} name="webhookSecret" render={({ field }) => (
              <FormItem>
                <FormLabel>Webhook Secret (optional)</FormLabel>
                <FormControl><Input placeholder="whsec_..." type="password" {...field} data-testid={`input-webhooksecret-${provider.slug}`} /></FormControl>
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
  const { data: stats, isLoading } = useGetPaymentStats();
  if (isLoading) return <Skeleton className="h-48 w-full" />;
  const byProvider = stats?.byProvider ?? [];
  return (
    <Card className="border-border/60" data-testid="payment-stats-panel">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Payment Volume</CardTitle>
          <div className="text-right">
            <div className="text-xl font-bold font-mono text-primary">
              ₦{((stats?.totalVolume ?? 0) / 1_000_000).toFixed(1)}M
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              {(stats?.totalTransactions ?? 0).toLocaleString()} transactions
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
                formatter={(v: number) => [`₦${v.toLocaleString()}`, "Volume"]}
              />
              <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      )}
    </Card>
  );
}

export default function Payments() {
  const { data: providers, isLoading } = useListPaymentProviders();
  const qc = useQueryClient();
  const save = useSavePaymentProvider();
  const { toast } = useToast();

  const toggleProvider = (slug: string, enabled: boolean, priority: number) => {
    save.mutate({ data: { slug, apiKey: "", enabled, priority } }, {
      onSuccess: () => qc.invalidateQueries({ queryKey: getListPaymentProvidersQueryKey() }),
      onError: () => toast({ title: "Error toggling provider", variant: "destructive" }),
    });
  };

  return (
    <ControlLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Nigerian Payment Routing
          </h1>
          <p className="text-sm text-muted-foreground mt-1">10 providers — intelligent routing by success rate &amp; priority</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <Card className="border-border/60 overflow-hidden" data-testid="payment-providers-table">
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
                    {p.successRate != null && (
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="h-1 w-24 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${p.successRate}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">{p.successRate.toFixed(1)}%</span>
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
