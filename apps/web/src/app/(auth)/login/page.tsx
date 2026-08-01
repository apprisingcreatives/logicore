'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Lock, Mail, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [loginMode, setLoginMode] = useState<'company' | 'user'>('company');
  const [companySlug, setCompanySlug] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 800);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header */}
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
            Enterprise Portal Access
          </h2>
          <p className="text-sm text-text-secondary">
            Sign in to your organization or company workspace
          </p>
        </div>

        {/* Company vs User Mode Switcher */}
        <div className="glass-card p-1.5 flex gap-1 rounded-xl">
          <button
            type="button"
            onClick={() => setLoginMode('company')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              loginMode === 'company'
                ? 'bg-brand-500 text-white shadow-glow-brand'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Company Tenant Access</span>
          </button>
          <button
            type="button"
            onClick={() => setLoginMode('user')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              loginMode === 'user'
                ? 'bg-brand-500 text-white shadow-glow-brand'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Standard User Login</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8 shadow-card-hover border-surface-border">
          <form onSubmit={handleSubmit} className="space-y-5">
            {loginMode === 'company' && (
              <div className="space-y-1.5 animate-fade-in">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Company ID or Subdomain Slug
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={companySlug}
                    onChange={(e) => setCompanySlug(e.target.value)}
                    placeholder="e.g. 2go-express, fast-logistics, royal-cargo"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-elevated border border-surface-border rounded-lg text-sm text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                  />
                </div>
                <p className="text-2xs text-text-muted">
                  Enforces isolated tenant Row-Level Security (RLS) policies
                </p>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Corporate Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@logicore.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-elevated border border-surface-border rounded-lg text-sm text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs text-accent hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-elevated border border-surface-border rounded-lg text-sm text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold rounded-lg text-sm transition-all duration-200 shadow-glow-teal flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.02]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authenticate Organization</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-surface-border text-center text-xs text-text-muted">
            Need to onboard a new logistics company?{' '}
            <Link href="/register" className="text-accent font-semibold hover:underline">
              Register Tenant
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-2xs text-text-muted">
          <ShieldCheck className="w-4 h-4 text-accent" />
          <span>Protected by Enterprise SOC2 & Multi-Tenant RLS Encryption</span>
        </div>
      </div>
    </div>
  );
}
