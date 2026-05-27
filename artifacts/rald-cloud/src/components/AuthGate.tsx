import { useState, useEffect, useCallback } from "react";
import { Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthUser {
  id: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string | null;
}

function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data?.user ?? null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  const login = useCallback(() => {
    window.location.href = "/api/auth/login";
  }, []);

  return { user, isLoading, isAuthenticated: !!user, login };
}

interface AuthGateProps {
  children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const { isLoading, isAuthenticated, login } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center" data-testid="auth-loading">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 text-[#00C97C] animate-spin mx-auto" />
          <p className="text-white/40 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6" data-testid="auth-gate">
        <div className="relative text-center max-w-md w-full">
          <div className="absolute inset-0 -top-40 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: "#00C97C" }} />
          <div className="relative z-10 p-8 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#00C97C]/30 bg-[#00C97C]/10">
              <Shield className="h-7 w-7 text-[#00C97C]" />
            </div>
            <h1 className="text-2xl font-black text-white mb-2">
              RALD<span className="text-[#00C97C]">.cloud</span>
            </h1>
            <h2 className="text-lg font-bold text-white mb-2">Control Center</h2>
            <p className="text-white/40 text-sm mb-8 leading-relaxed">
              Sign in to access your enterprise dashboard, manage deployments, and monitor the ecosystem.
            </p>
            <Button
              onClick={login}
              className="w-full bg-[#00C97C] hover:bg-[#00a865] text-black font-bold text-sm h-11 rounded-xl"
              data-testid="button-login"
            >
              Sign in to continue
            </Button>
            <p className="text-white/20 text-xs mt-6">
              Secured by Replit · Enterprise SSO
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
