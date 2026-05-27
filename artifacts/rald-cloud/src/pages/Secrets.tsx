import { useState } from "react";
import { useListSecrets, useUpsertSecret, useDeleteSecret, getListSecretsQueryKey } from "@workspace/api-client-react";
import { ControlLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { Key, Plus, Trash2, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ManagedSecretStatus } from "@workspace/api-client-react";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  active: { label: "Active", color: "text-primary border-primary/30", icon: CheckCircle },
  expiring_soon: { label: "Expiring Soon", color: "text-yellow-500 border-yellow-500/30", icon: AlertTriangle },
  expired: { label: "Expired", color: "text-destructive border-destructive/30", icon: XCircle },
};

const secretSchema = z.object({
  service: z.string().min(1, "Service required (e.g. TERMII)"),
  label: z.string().min(1, "Label required (e.g. API_KEY)"),
  value: z.string().min(1, "Value required"),
  expiresAt: z.string().optional(),
});

function AddSecretDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const qc = useQueryClient();
  const upsert = useUpsertSecret();
  const form = useForm<z.infer<typeof secretSchema>>({
    resolver: zodResolver(secretSchema),
    defaultValues: { service: "", label: "", value: "", expiresAt: "" },
  });

  const onSubmit = (values: z.infer<typeof secretSchema>) => {
    upsert.mutate({ data: { service: values.service, label: values.label, value: values.value, expiresAt: values.expiresAt || undefined } }, {
      onSuccess: () => {
        toast({ title: "Secret saved", description: `${values.service} / ${values.label}` });
        qc.invalidateQueries({ queryKey: getListSecretsQueryKey() });
        setOpen(false);
        form.reset();
      },
      onError: () => toast({ title: "Error", description: "Failed to save secret", variant: "destructive" }),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5" data-testid="button-add-secret">
          <Plus className="h-3.5 w-3.5" /> Add Secret
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Managed Secret</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="service" render={({ field }) => (
              <FormItem>
                <FormLabel>Service</FormLabel>
                <FormControl><Input placeholder="TERMII, FLUTTERWAVE, DIDWW..." {...field} data-testid="input-secret-service" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="label" render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl><Input placeholder="API_KEY, SECRET_KEY..." {...field} data-testid="input-secret-label" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="value" render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl><Input placeholder="Secret value" type="password" {...field} data-testid="input-secret-value" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="expiresAt" render={({ field }) => (
              <FormItem>
                <FormLabel>Expires At (optional)</FormLabel>
                <FormControl><Input type="datetime-local" {...field} data-testid="input-secret-expires" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" disabled={upsert.isPending} className="w-full" data-testid="button-submit-secret">
              {upsert.isPending ? "Saving..." : "Save Secret"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteButton({ id, label }: { id: string; label: string }) {
  const { toast } = useToast();
  const qc = useQueryClient();
  const del = useDeleteSecret();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive" data-testid={`button-delete-secret-${id}`}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete secret?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <strong>{label}</strong>. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => del.mutate({ id: id }, {
              onSuccess: () => {
                toast({ title: "Deleted", description: label });
                qc.invalidateQueries({ queryKey: getListSecretsQueryKey() });
              },
              onError: () => toast({ title: "Error deleting secret", variant: "destructive" }),
            })}
            className="bg-destructive hover:bg-destructive/90"
            data-testid={`button-confirm-delete-${id}`}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function Secrets() {
  const { data: secrets, isLoading } = useListSecrets();
  const [filter, setFilter] = useState("");
  const filtered = (secrets ?? []).filter((s) =>
    s.service.toLowerCase().includes(filter.toLowerCase()) ||
    s.label.toLowerCase().includes(filter.toLowerCase())
  );

  const totalActive = (secrets ?? []).filter((s) => s.status === "active").length;
  const totalExpiring = (secrets ?? []).filter((s) => s.status === "expiring_soon").length;
  const totalExpired = (secrets ?? []).filter((s) => s.status === "expired").length;

  return (
    <ControlLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <Key className="h-5 w-5 text-yellow-400" />
              Key Rotation Center
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              All 3rd-party service credentials — TERMII, Flutterwave, DIDWW, Tencent RTC &amp; more
            </p>
          </div>
          <AddSecretDialog />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Active", value: totalActive, color: "text-primary" },
            { label: "Expiring Soon", value: totalExpiring, color: "text-yellow-500" },
            { label: "Expired", value: totalExpired, color: "text-destructive" },
          ].map((s) => (
            <Card key={s.label} className="border-border/60">
              <CardContent className="p-3">
                <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Input
          placeholder="Filter by service or label..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-xs"
          data-testid="input-filter-secrets"
        />

        <Card className="border-border/60 overflow-hidden" data-testid="secrets-table">
          <div className="grid grid-cols-[1fr_1fr_140px_120px_80px] text-xs font-semibold uppercase tracking-widest text-muted-foreground px-4 py-2 border-b border-border/40 bg-secondary/30">
            <span>Service</span>
            <span>Label</span>
            <span>Value</span>
            <span>Rotated</span>
            <span></span>
          </div>
          {isLoading ? (
            <div className="p-4 space-y-2">{[...Array(8)].map((_, i) => <Skeleton key={i} className="h-10" />)}</div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm">No secrets found.</div>
          ) : (
            filtered.map((s) => {
              const cfg = STATUS_CONFIG[s.status ?? "active"] ?? STATUS_CONFIG["active"];
              const StatusIcon = cfg.icon;
              return (
                <div
                  key={s.id}
                  className="grid grid-cols-[1fr_1fr_140px_120px_80px] items-center px-4 py-2.5 border-b border-border/40 last:border-0 hover:bg-secondary/30 transition-colors"
                  data-testid={`row-secret-${s.id}`}
                >
                  <span className="text-sm font-semibold text-primary truncate">{s.service}</span>
                  <span className="text-sm text-foreground truncate">{s.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">···· {s.maskedValue}</span>
                  <span className="text-xs text-muted-foreground font-mono">{new Date(s.rotatedAt).toLocaleDateString()}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${cfg.color} gap-1`}>
                      <StatusIcon className="h-2.5 w-2.5" />
                      {cfg.label}
                    </Badge>
                    <DeleteButton id={s.id} label={`${s.service}/${s.label}`} />
                  </div>
                </div>
              );
            })
          )}
        </Card>
      </div>
    </ControlLayout>
  );
}
