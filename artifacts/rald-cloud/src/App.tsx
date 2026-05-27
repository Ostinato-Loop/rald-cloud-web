import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import AuthGate from "@/components/AuthGate";

import EcosystemOverview from "./pages/EcosystemOverview";
import ControlHub from "./pages/ControlHub";
import Repos from "./pages/Repos";
import Deployments from "./pages/Deployments";
import Payments from "./pages/Payments";
import Logistics from "./pages/Logistics";
import Secrets from "./pages/Secrets";
import Expansion from "./pages/Expansion";
import Agents from "./pages/Agents";
import Referral from "./pages/Referral";

import Products from "./pages/landing/Products";
import LoopBusiness from "./pages/landing/LoopBusiness";
import PayRald from "./pages/landing/PayRald";
import Raldtics from "./pages/landing/Raldtics";
import LoopDispatch from "./pages/landing/LoopDispatch";
import LoopVoice from "./pages/landing/LoopVoice";
import RALDIdentity from "./pages/landing/RALDIdentity";
import GitRald from "./pages/landing/GitRald";
import RALDSDK from "./pages/landing/RALDSDK";
import RALDConsole from "./pages/landing/RALDConsole";
import LoopMessenger from "./pages/landing/LoopMessenger";
import DunaRald from "./pages/landing/DunaRald";

import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Public marketing routes */}
      <Route path="/" component={Products} />
      <Route path="/products" component={Products} />
      <Route path="/loop" component={LoopBusiness} />
      <Route path="/payrald" component={PayRald} />
      <Route path="/raldtics" component={Raldtics} />
      <Route path="/dispatch" component={LoopDispatch} />
      <Route path="/voice" component={LoopVoice} />
      <Route path="/identity" component={RALDIdentity} />
      <Route path="/gitrald" component={GitRald} />
      <Route path="/sdk" component={RALDSDK} />
      <Route path="/console" component={RALDConsole} />
      <Route path="/messenger" component={LoopMessenger} />
      <Route path="/dunarald" component={DunaRald} />
      <Route path="/referral" component={Referral} />

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
