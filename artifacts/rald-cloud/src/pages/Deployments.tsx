import { useState } from "react";
import { useListPagesProjects, useListWorkers, useGetDeploymentSummary, useCreatePagesProject } from "@workspace/api-client-react";
import { ControlLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { getListPagesProjectsQueryKey } from "@workspace/api-client-react";
import { Cloud, Server, Plus, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SummaryBar() {
  const { data: summary, isLoading } = useGetDeploymentSummary();
  if (isLoading) return <div className="grid grid-cols-3 gap-4 mb-6"><Skeleton className="h-16 col-span-3" /></div>;
  const items = [
    { label: "Pages Projects", value: summary?.totalPages ?? 0, color: "text-purple-400" },
    { label: "Workers", value: summary?.totalWorkers ?? 0, color: "text-blue-400" },
    { label: "Active Deployments", value: summary?.activeDeployments ?? 0, color: "text-primary" },
  ];
  return (
    <div className="grid grid-cols-3 gap-4 mb-6" data-testid="deployment-summary-bar">
      {items.map((s) => (
        <Card key={s.label} className="border-border/60">
          <CardContent className="p-3">
            <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const pagesSchema = z.object({
  name: z.string().min(1, "Name required"),
  repoName: z.string().min(1, "Repo name required"),
  buildCommand: z.string().optional(),
  outputDir: z.string().optional(),
});

function CreatePagesDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const qc = useQueryClient();
  const createPages = useCreatePagesProject();
  const form = useForm<z.infer<typeof pagesSchema>>({
    resolver: zodResolver(pagesSchema),
    defaultValues: { name: "", repoName: "", buildCommand: "pnpm build", outputDir: "dist" },
  });

  const onSubmit = (values: z.infer<typeof pagesSchema>) => {
    createPages.mutate({ data: values }, {
      onSuccess: () => {
        toast({ title: "Pages project created", description: values.name });
        qc.invalidateQueries({ queryKey: getListPagesProjectsQueryKey() });
        setOpen(false);
        form.reset();
      },
      onError: () => toast({ title: "Error", description: "Failed to create pages project", variant: "destructive" }),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5" data-testid="button-create-pages">
          <Plus className="h-3.5 w-3.5" /> Deploy Pages
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>New Cloudflare Pages Project</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {(["name", "repoName", "buildCommand", "outputDir"] as const).map((field) => (
              <FormField key={field} control={form.control} name={field} render={({ field: f }) => (
                <FormItem>
                  <FormLabel>{field === "repoName" ? "GitHub Repo" : field.replace(/([A-Z])/g, " $1").trim()}</FormLabel>
                  <FormControl><Input {...f} data-testid={`input-pages-${field}`} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            ))}
            <Button type="submit" disabled={createPages.isPending} className="w-full" data-testid="button-submit-create-pages">
              {createPages.isPending ? "Creating..." : "Create Project"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function PagesTab() {
  const { data: pages, isLoading } = useListPagesProjects();
  const STATUS_COLOR: Record<string, string> = { active: "text-primary", inactive: "text-muted-foreground", building: "text-yellow-500" };
  return (
    <div className="space-y-3" data-testid="pages-list">
      {isLoading ? (
        [...Array(4)].map((_, i) => <Skeleton key={i} className="h-20" />)
      ) : (pages ?? []).length === 0 ? (
        <div className="text-center text-muted-foreground text-sm py-12">No Pages projects found.</div>
      ) : (
        (pages ?? []).map((p) => (
          <Card key={p.id} className="border-border/60" data-testid={`card-pages-${p.id}`}>
            <CardContent className="p-4 flex items-center gap-4">
              <Cloud className="h-5 w-5 text-purple-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground text-sm">{p.name}</span>
                  <Badge variant="outline" className={`text-xs ${STATUS_COLOR[p.status] ?? ""}`}>{p.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground font-mono">{p.subdomain}.pages.dev</p>
                {p.customDomain && <p className="text-xs text-primary font-mono">{p.customDomain}</p>}
              </div>
              {p.latestDeploy && (
                <span className="text-xs text-muted-foreground font-mono shrink-0 hidden md:block">
                  {new Date(p.latestDeploy).toLocaleDateString()}
                </span>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

function WorkersTab() {
  const { data: workers, isLoading } = useListWorkers();
  return (
    <div className="space-y-3" data-testid="workers-list">
      {isLoading ? (
        [...Array(3)].map((_, i) => <Skeleton key={i} className="h-20" />)
      ) : (workers ?? []).length === 0 ? (
        <div className="text-center text-muted-foreground text-sm py-12">No Workers deployed.</div>
      ) : (
        (workers ?? []).map((w) => (
          <Card key={w.id} className="border-border/60" data-testid={`card-worker-${w.id}`}>
            <CardContent className="p-4 flex items-center gap-4">
              <Server className="h-5 w-5 text-blue-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-medium text-foreground text-sm">{w.id}</span>
                <p className="text-xs text-muted-foreground font-mono">{(w.size / 1024).toFixed(1)} KB</p>
                {(w.routes ?? []).length > 0 && (
                  <p className="text-xs text-muted-foreground truncate">{w.routes?.join(", ")}</p>
                )}
              </div>
              {w.modifiedOn && (
                <span className="text-xs text-muted-foreground font-mono shrink-0 hidden md:block">
                  {new Date(w.modifiedOn).toLocaleDateString()}
                </span>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default function Deployments() {
  return (
    <ControlLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <Cloud className="h-5 w-5 text-purple-400" />
              Cloudflare Deployments
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Pages projects &amp; Workers — production edge</p>
          </div>
          <CreatePagesDialog />
        </div>
        <SummaryBar />
        <Tabs defaultValue="pages">
          <TabsList className="mb-4">
            <TabsTrigger value="pages" data-testid="tab-pages">Pages Projects</TabsTrigger>
            <TabsTrigger value="workers" data-testid="tab-workers">Workers</TabsTrigger>
          </TabsList>
          <TabsContent value="pages"><PagesTab /></TabsContent>
          <TabsContent value="workers"><WorkersTab /></TabsContent>
        </Tabs>
      </div>
    </ControlLayout>
  );
}
