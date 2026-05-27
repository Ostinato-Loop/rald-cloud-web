import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Copy, Check, Share2, Users, TrendingUp, Gift } from "lucide-react";
import { LandingNav } from "./landing/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ReferralStats {
  code: string;
  referrerName: string;
  productSlug: string;
  uses: number;
  maxUses: number;
  reward: string;
  active: boolean;
  totalReferrals: number;
  converted: number;
  pending: number;
}

const REWARD_LABELS: Record<string, string> = {
  "3_months_free": "3 months free",
  "6_months_free": "6 months free",
  "1_month_free": "1 month free",
  "50_percent_off": "50% off for 3 months",
};

function GenerateForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api-server/api/referrals/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, productSlug: "all" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setCode(data.code);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const shareUrl = code ? `${window.location.origin}/products?ref=${code}` : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-lg">
      {!code ? (
        <form onSubmit={handleGenerate} className="space-y-3" data-testid="generate-referral-form">
          <div className="flex gap-3">
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 w-36"
              data-testid="input-gen-name"
            />
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 flex-1"
              data-testid="input-gen-email"
            />
          </div>
          <Button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-[#00C97C] text-black font-bold hover:bg-[#00a865] gap-2"
            data-testid="button-gen-submit"
          >
            {loading ? "Generating..." : "Generate My Referral Link"} <ArrowRight className="h-4 w-4" />
          </Button>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </form>
      ) : (
        <div className="space-y-4" data-testid="referral-code-display">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/40 mb-0.5">Your referral code</p>
              <p className="text-xl font-black font-mono text-[#00C97C]">{code}</p>
            </div>
            <Badge className="bg-[#00C97C]/10 text-[#00C97C] border-[#00C97C]/30 shrink-0">Active</Badge>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white/3 border border-white/8">
            <span className="text-xs text-white/40 flex-1 truncate font-mono">{shareUrl}</span>
            <Button
              size="sm"
              onClick={handleCopy}
              className="shrink-0 bg-[#00C97C] text-black hover:bg-[#00a865] h-7 text-xs gap-1"
              data-testid="button-copy-code"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <p className="text-xs text-white/30">Share this link. Every signup earns them <span className="text-[#00C97C]">3 months free</span> and moves you up the waitlist.</p>
        </div>
      )}
    </div>
  );
}

function LookupForm() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [error, setError] = useState("");

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api-server/api/referrals/code/${code.toUpperCase().trim()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Code not found");
      setStats(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg" data-testid="lookup-form">
      <form onSubmit={handleLookup} className="flex gap-3 mb-4">
        <Input
          placeholder="Enter referral code e.g. RALD-XK7P2Q"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 font-mono"
          data-testid="input-lookup-code"
        />
        <Button type="submit" disabled={loading} variant="outline" className="border-white/20 text-white hover:bg-white/10 shrink-0" data-testid="button-lookup-submit">
          {loading ? "..." : "Look up"}
        </Button>
      </form>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {stats && (
        <div className="space-y-3" data-testid="lookup-stats">
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Users, label: "Total Referred", value: stats.totalReferrals, color: "text-[#00C97C]" },
              { icon: TrendingUp, label: "Converted", value: stats.converted, color: "text-blue-400" },
              { icon: Gift, label: "Pending", value: stats.pending, color: "text-yellow-400" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.label} className="bg-white/3 border-white/10">
                  <CardContent className="p-3 text-center">
                    <Icon className={`h-4 w-4 mx-auto mb-1 ${s.color}`} />
                    <div className={`text-xl font-black font-mono ${s.color}`}>{s.value}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wide">{s.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="p-3 rounded-xl bg-white/3 border border-white/10 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/40">Code</span>
              <span className="font-mono text-white font-bold">{stats.code}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-white/40">Uses</span>
              <span className="font-mono text-white">{stats.uses} / {stats.maxUses}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-white/40">Reward</span>
              <span className="text-[#00C97C] text-xs font-semibold">{REWARD_LABELS[stats.reward] ?? stats.reward}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function JoinForm() {
  const [code, setCode] = useState(new URLSearchParams(window.location.search).get("ref") ?? "");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ message: string; reward: string } | null>(null);
  const [error, setError] = useState("");

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api-server/api/referrals/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.toUpperCase().trim(), email, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="max-w-lg p-6 rounded-2xl border border-[#00C97C]/30 bg-[#00C97C]/5 text-center" data-testid="join-success">
        <div className="text-2xl text-[#00C97C] font-black mb-2">Referral accepted!</div>
        <p className="text-white/60 text-sm">{result.message}</p>
        <p className="text-[#00C97C] text-sm font-semibold mt-2">Reward: {REWARD_LABELS[result.reward] ?? result.reward}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleJoin} className="space-y-3 max-w-lg" data-testid="join-referral-form">
      <Input
        placeholder="Referral code (RALD-XXXXXX)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 font-mono"
        data-testid="input-join-code"
      />
      <div className="flex gap-3">
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 w-36"
          data-testid="input-join-name"
        />
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 flex-1"
          data-testid="input-join-email"
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-[#00C97C] text-black font-bold hover:bg-[#00a865]" data-testid="button-join-submit">
        {loading ? "Joining..." : "Join with Referral Code"}
      </Button>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}

export default function Referral() {
  const [tab, setTab] = useState<"generate" | "join" | "lookup">("generate");

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <LandingNav productName="" accentColor="#00C97C" />
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: "#00C97C" }} />
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00C97C]/30 text-xs font-medium text-[#00C97C] mb-6 bg-[#00C97C]/10">
            <Share2 className="h-3 w-3" /> Referral Program
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Give <span className="text-[#00C97C]">3 months free</span>.<br />Move up the list.
          </h1>
          <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
            Every person you refer gets 3 months free access. You move up the waitlist. Everyone wins.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { icon: Gift, title: "They get", value: "3 months free", color: "#00C97C" },
            { icon: TrendingUp, title: "You get", value: "Priority access", color: "#38bdf8" },
            { icon: Users, title: "Limit", value: "100 referrals", color: "#a78bfa" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="p-4 rounded-2xl border border-white/8 text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
                <Icon className="h-5 w-5 mx-auto mb-2" style={{ color: s.color }} />
                <p className="text-xs text-white/40 mb-1">{s.title}</p>
                <p className="font-bold text-sm text-white">{s.value}</p>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 mb-8 p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
          {(["generate", "join", "lookup"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${tab === t ? "bg-[#00C97C] text-black" : "text-white/40 hover:text-white"}`}
              data-testid={`tab-${t}`}
            >
              {t === "generate" ? "Get My Link" : t === "join" ? "Join with Code" : "Check Stats"}
            </button>
          ))}
        </div>

        {tab === "generate" && <GenerateForm />}
        {tab === "join" && <JoinForm />}
        {tab === "lookup" && <LookupForm />}
      </div>
    </div>
  );
}
