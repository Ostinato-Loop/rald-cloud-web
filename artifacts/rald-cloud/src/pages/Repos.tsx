import { useState } from "react";
import { useListRepos, useGetRepoStats, useCreateRepo, useSyncRepo, getListReposQueryKey, getGetRepoStatsQueryKey } from "@workspace/api-client-react";
import { ControlLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { GitBranch, CheckCircle, XCircle, Clock, Plus, RefreshCw, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CI_ICON: Record<string, React.ElementType> = {
  success: CheckCircle,
  failure: XCircle,
  pending: Clock,
  unknown: Clock,
};
const CI_COLOR: Record<string, string> = {
  success: "text-primary",
  failure: "text-destructive",
  pending: "text-yellow-500",
  unknown: "text-muted-foreground",
};

const createSchema = z.object({
  name: z.string().min(1, "Name required"),
  description: z.string().min(1, "Description required"),
});

function StatsBar() {
  const { data: stats, isLoading } = useGetRepoStats();
  if (isLoading) return <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6"><Skeleton className="h-16 col-span-2 md:col-span-5" /></div>;
  const items = [
    { label: "Total", value: stats?.total ?? 0, color: "text-foreground" },
    { label: "Green CI", value: stats?.greenCI ?? 0, color: "text-primary" },
    { label: "Failing CI", value: stats?.failingCI ?? 0, color: "text-destructive" },
    { label: "Pending", value: stats?.pending ?? 0, color: "text-yellow-500" },
    { label: "Open PRs", value: stats?.totalPRs ?? 0, color: "text-blue-400" },
  ];
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6" data-testid="repo-stats-bar">
      {items.map((s) => (
        <Card key={s.label} className="border-border/60">
          <CardContent className="p-3">
            <div className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CreateRepoDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const qc = useQueryClient();
  const createRepo = useCreateRepo();
  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = (values: z.infer<typeof createSchema>) => {
    createRepo.mutate({ data: { ...values, private: false } }, {
      onSuccess: () => {
        toast({ title: "Repo created", description: values.name });
        qc.invalidateQueries({ queryKey: getListReposQueryKey() });
        qc.invalidateQueries({ queryKey: getGetRepoStatsQueryKey() });
        setOpen(false);
        form.reset();
      },
      onError: () => toast({ title: "Error", description: "Failed to create repo", variant: "destructive" }),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5" data-testid="button-create-repo">
          <Plus className="h-3.5 w-3.5" /> New Repo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Create Repository</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Repository Name</FormLabel>
                <FormControl><Input placeholder="my-service" {...field} data-testid="input-repo-name" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Input placeholder="What does this repo do?" {...field} data-testid="input-repo-description" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" disabled={createRepo.isPending} className="w-full" data-testid="button-submit-create-repo">
              {createRepo.isPending ? "Creating..." : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function RepoRow({ repo }: { repo: { id: number; name: string; fullName: string; url: string; description?: string | null; ciStatus: string; openPRs?: number; updatedAt?: string; topics?: string[] } }) {
  const { toast } = useToast();
  const qc = useQueryClient();
  const syncRepo = useSyncRepo();
  const CiIcon = CI_ICON[repo.ciStatus] ?? Clock;

  const handleSync = () => {
    syncRepo.mutate({ name: repo.name }, {
      onSuccess: () => {
        toast({ title: "Synced", description: repo.name });
        qc.invalidateQueries({ queryKey: getListReposQueryKey() });
      },
      onError: () => toast({ title: "Sync failed", variant: "destructive" }),
    });
  };

  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-border/40 last:border-0 hover:bg-secondary/30 transition-colors" data-testid={`row-repo-${repo.id}`}>
      <CiIcon className={`h-4 w-4 shrink-0 ${CI_COLOR[repo.ciStatus] ?? "text-muted-foreground"}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{repo.name}</span>
          {(repo.topics ?? []).slice(0, 2).map((t) => (
            <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground truncate">{repo.description ?? "No description"}</p>
      </div>
      <div className="flex items-center gap-4 shrink-0 text-xs text-muted-foreground">
        {(repo.openPRs ?? 0) > 0 && (
          <span className="text-blue-400 font-mono" data-testid={`text-prs-${repo.id}`}>{repo.openPRs} PR</span>
        )}
        {repo.updatedAt && (
          <span className="hidden lg:block font-mono">{new Date(repo.updatedAt).toLocaleDateString()}</span>
        )}
        <a href={repo.url} target="_blank" rel="noopener noreferrer" data-testid={`link-repo-${repo.id}`}>
          <ExternalLink className="h-3.5 w-3.5 hover:text-primary transition-colors" />
        </a>
        <Button variant="ghost" size="sm" onClick={handleSync} disabled={syncRepo.isPending} className="h-6 px-2 text-xs" data-testid={`button-sync-${repo.id}`}>
          <RefreshCw className={`h-3 w-3 ${syncRepo.isPending ? "animate-spin" : ""}`} />
        </Button>
      </div>
    </div>
  );
}

export default function Repos() {
  const [filter, setFilter] = useState("");
  const { data: repos, isLoading } = useListRepos();
  const filtered = (repos ?? []).filter((r) => r.name.toLowerCase().includes(filter.toLowerCase()));
  const greenCount = (repos ?? []).filter((r) => r.ciStatus === "success").length;

  return (
    <ControlLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-blue-400" />
              Repositories
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Ostinato-Loop org ·&nbsp;
              <span className="text-primary font-mono">{greenCount}</span> green CI
            </p>
          </div>
          <CreateRepoDialog />
        </div>
        <StatsBar />
        <div className="flex items-center gap-3">
          <Input
            placeholder="Filter repositories..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-xs"
            data-testid="input-filter-repos"
          />
        </div>
        <Card className="border-border/60 overflow-hidden" data-testid="repos-table">
          {isLoading ? (
            <div className="p-4 space-y-2">{[...Array(10)].map((_, i) => <Skeleton key={i} className="h-12" />)}</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">No repositories found.</div>
          ) : (
            <div>{filtered.map((repo) => <RepoRow key={repo.id} repo={repo} />)}</div>
          )}
        </Card>
      </div>
    </ControlLayout>
  );
}
