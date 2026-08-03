'use client';

import { BarChart3, TrendingUp, DollarSign, PackageCheck, ShieldCheck, Download } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Analytics & Business Intelligence</h1>
          <p className="text-sm text-text-secondary mt-1">
            Executive performance reporting, revenue insights, SLA compliance, and regional cargo distribution
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface-elevated hover:bg-surface-hover border border-surface-border text-text-primary font-semibold rounded-xl text-sm transition-all">
          <Download className="w-4 h-4" />
          <span>Export Executive PDF</span>
        </button>
      </div>

      {/* Revenue & Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 space-y-2">
          <div className="flex justify-between items-center text-xs text-text-muted">
            <span>Monthly Revenue</span>
            <DollarSign className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-text-primary">₱ 14,850,000</div>
          <div className="text-2xs text-teal-400 font-semibold">+12.4% vs last month</div>
        </div>

        <div className="glass-card p-5 space-y-2">
          <div className="flex justify-between items-center text-xs text-text-muted">
            <span>Avg Cost Per Km</span>
            <TrendingUp className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-text-primary">₱ 42.80</div>
          <div className="text-2xs text-teal-400 font-semibold">-4.1% fuel efficiency gain</div>
        </div>

        <div className="glass-card p-5 space-y-2">
          <div className="flex justify-between items-center text-xs text-text-muted">
            <span>On-Time SLA Rate</span>
            <PackageCheck className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-text-primary">96.8%</div>
          <div className="text-2xs text-teal-400 font-semibold">Exceeds 95% target</div>
        </div>

        <div className="glass-card p-5 space-y-2">
          <div className="flex justify-between items-center text-xs text-text-muted">
            <span>BOC Clearance Speed</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-text-primary">1.4 Days</div>
          <div className="text-2xs text-teal-400 font-semibold">-0.8 days vs industry avg</div>
        </div>
      </div>

      {/* Analytics Visualization Placeholder */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-base font-bold text-text-primary">Inter-Island Tonnage Distribution (Luzon / Visayas / Mindanao)</h3>
        <div className="h-64 bg-surface-elevated/40 rounded-xl border border-surface-border flex items-center justify-center text-text-muted text-sm">
          <BarChart3 className="w-8 h-8 text-brand-400 mr-2" />
          <span>Interactive Recharts Visualization Ingesting Live Telemetry Points</span>
        </div>
      </div>
    </div>
  );
}
