import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import NotFound from "@/pages/not-found";
import AuthGate from "@/components/AuthGate";

// Lazy-load heavy pages for faster TTI
const EcosystemOverview = lazy(() => import("./pages/EcosystemOverview"));
const ControlHub        = lazy(() => import("./pages/ControlHub"));
const Repos             = lazy(() => import("./pages/Repos"));
const Deployments       = lazy(() => import("./pages/Deployments"));
const Payments          = lazy(() => import("./pages/Payments"));
const Logistics         = lazy(() => import("./pages/Logistics"));
const Secrets           = lazy(() => import("./pages/Secrets"));
const Expansion         = lazy(() => import("./pages/Expansion"));
const Agents            = lazy(() => import("./pages/Agents"));
const Referral          = lazy(() => import("./pages/Referral"));

const Home              = lazy(() => import("./pages/landing/Home"));
const RALDAlia          = lazy(() => import("./pages/landing/RALDAlia"));
const Products          = lazy(() => import("./pages/landing/Products"));
const LoopBusiness      = lazy(() => import("./pages/landing/LoopBusiness"));
const PayRald           = lazy(() => import("./pages/landing/PayRald"));
const Raldtics          = lazy(() => import("./pages/landing/Raldtics"));
const LoopDispatch      = lazy(() => import("./pages/landing/LoopDispatch"));
const LoopVoice         = lazy(() => import("./pages/landing/LoopVoice"));
const RALDIdentity      = lazy(() => import("./pages/landing/RALDIdentity"));
const GitRald           = lazy(() => import("./pages/landing/GitRald"));
const RALDSDK           = lazy(() => import("./pages/landing/RALDSDK"));
const RALDConsole       = lazy(() => import("./pages/landing/RALDConsole"));
const LoopMessenger     = lazy(() => import("./pages/landing/LoopMessenger"));
const DunaRald          = lazy(() => import("./pages/landing/DunaRald"));
const RALDElimu         = lazy(() => import("./pages/landing/RALDElimu"));
const Developers        = lazy(() => import("./pages/landing/Developers"));

const PrivacyPolicy     = lazy(() => import("./pages/legal/PrivacyPolicy"));
const TermsOfService    = lazy(() => import("./pages/legal/TermsOfService"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#00FF88", borderTopColor: "transparent" }} />
    </div>
  );
}

const queryClient = new QueryClient();

/** Map from subdomain prefix → internal route path */
const SUBDOMAIN_MAP: Record<string, string> = {
  payrald: "/payrald",
  raldtics: "/raldtics",
  dunarald: "/dunarald",
  business: "/loop",
  dispatch: "/dispatch",
  voice: "/voice",
  loop: "/loop",
  messenger: "/messenger",
  elimu: "/elimu",
  developers: "/developers",
  dev: "/developers",
};

function SubdomainRedirect() {
  const [, navigate] = useLocation();
  useEffect(() => {
    const hostname = window.location.hostname;
    // e.g. payrald.rald.cloud → subdomain = "payrald"
    const parts = hostname.split(".");
    if (parts.length >= 3) {
      const sub = parts[0].toLowerCase();
      const target = SUBDOMAIN_MAP[sub];
      if (target && window.location.pathname === "/") {
        navigate(target, { replace: true });
      }
    }
  }, [navigate]);
  return null;
}

function Router() {
  return (
    <>
      <SubdomainRedirect />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          {/* Public marketing routes */}
          <Route path="/" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/loop" component={LoopBusiness} />
          <Route path="/payrald" component={PayRald} />
          <Route path="/raldtics" component={Raldtics} />
          <Route path="/dispatch" component={LoopDispatch} />
          <Route path="/voice" component={LoopVoice} />
          <Route path="/alia" component={RALDAlia} />
          <Route path="/identity" component={RALDIdentity} />
          <Route path="/gitrald" component={GitRald} />
          <Route path="/sdk" component={RALDSDK} />
          <Route path="/console" component={RALDConsole} />
          <Route path="/messenger" component={LoopMessenger} />
          <Route path="/dunarald" component={DunaRald} />
          <Route path="/elimu" component={RALDElimu} />
          <Route path="/referral" component={Referral} />
          <Route path="/developers" component={Developers} />

          {/* Legal pages */}
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/terms" component={TermsOfService} />

          {/* Auth-gated control routes */}
          <Route path="/control">
            <AuthGate><EcosystemOverview /></AuthGate>
          </Route>
          <Route path="/control/hub">
            <AuthGate><ControlHub /></AuthGate>
          </Route>
          <Route path="/control/repos">
            <AuthGate><Repos /></AuthGate>
          </Route>
          <Route path="/control/deployments">
            <AuthGate><Deployments /></AuthGate>
          </Route>
          <Route path="/control/payments">
            <AuthGate><Payments /></AuthGate>
          </Route>
          <Route path="/control/logistics">
            <AuthGate><Logistics /></AuthGate>
          </Route>
          <Route path="/control/secrets">
            <AuthGate><Secrets /></AuthGate>
          </Route>
          <Route path="/control/expansion">
            <AuthGate><Expansion /></AuthGate>
          </Route>
          <Route path="/control/agents">
            <AuthGate><Agents /></AuthGate>
          </Route>

          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
