'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  ShieldCheck,
  Truck,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function RegisterPage() {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Redirect to Company Onboarding Flow
      window.location.href = `/onboarding?company=${encodeURIComponent(companyName || 'My Logistics Company')}`;
    }, 800);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-base">LC</span>
            </div>
            <span className="text-2xl font-bold text-text-primary">
              Logi<span className="text-brand-400">core</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">
            Register Organization Workspace
          </h2>
          <p className="text-sm text-text-secondary">
            Set up isolated tenant workspace for your Philippine logistics enterprise
          </p>
        </div>

        <div className="glass-card p-8 shadow-card-hover border-surface-border">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-text-muted uppercase">Company / Business Name</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Royal Cargo Inc, Airspeed PH"
                className="w-full mt-1 px-4 py-2.5 bg-surface-elevated border border-surface-border rounded-lg text-sm text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-text-muted uppercase">Corporate Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.ph"
                className="w-full mt-1 px-4 py-2.5 bg-surface-elevated border border-surface-border rounded-lg text-sm text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-text-muted uppercase">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full mt-1 px-4 py-2.5 bg-surface-elevated border border-surface-border rounded-lg text-sm text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold rounded-lg text-sm transition-all duration-200 shadow-glow-teal flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Workspace & Start Onboarding</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-surface-border text-center text-xs text-text-muted">
            Already have an organization workspace?{' '}
            <Link href="/login" className="text-accent font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
