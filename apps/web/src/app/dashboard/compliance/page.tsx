'use client';

import { Shield, FileText, CheckCircle2, AlertTriangle, Scale, Building, ExternalLink } from 'lucide-react';

export default function CompliancePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Philippine Regulatory & Customs Compliance</h1>
          <p className="text-sm text-text-secondary mt-1">
            Automated Bureau of Customs (BOC E2M), PEZA Economic Zone permits, and DTI-FTEB accreditation engine
          </p>
        </div>
      </div>

      {/* Compliance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 border-l-4 border-l-brand-500">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-400">
              <Building className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded text-2xs font-semibold bg-teal-500/10 text-teal-400">ACTIVE</span>
          </div>
          <h3 className="font-bold text-text-primary text-base">BOC Accreditation</h3>
          <p className="text-xs text-text-muted mt-1">E2M Clearance Code: BOC-ACC-2026-9921</p>
          <div className="mt-4 pt-3 border-t border-surface-border text-2xs text-text-secondary flex justify-between">
            <span>Expires: Dec 31, 2026</span>
            <span className="text-teal-400 font-semibold">100% Compliant</span>
          </div>
        </div>

        <div className="glass-card p-5 border-l-4 border-l-teal-500">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
              <Shield className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded text-2xs font-semibold bg-teal-500/10 text-teal-400">ACTIVE</span>
          </div>
          <h3 className="font-bold text-text-primary text-base">PEZA Ecozone Portal</h3>
          <p className="text-xs text-text-muted mt-1">BERMS / LMS Integrated System</p>
          <div className="mt-4 pt-3 border-t border-surface-border text-2xs text-text-secondary flex justify-between">
            <span>Zones Covered: 14 Ecozones</span>
            <span className="text-teal-400 font-semibold">PTOPS Verified</span>
          </div>
        </div>

        <div className="glass-card p-5 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Scale className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded text-2xs font-semibold bg-amber-500/10 text-amber-400">JUNE 2025 COMPLIANT</span>
          </div>
          <h3 className="font-bold text-text-primary text-base">DTI-FTEB Capital Rules</h3>
          <p className="text-xs text-text-muted mt-1">Paid-Up Capital Audit (NVOCC: ₱5M)</p>
          <div className="mt-4 pt-3 border-t border-surface-border text-2xs text-text-secondary flex justify-between">
            <span>Category: NVOCC Enterprise</span>
            <span className="text-amber-400 font-semibold">₱5,000,000 Verified</span>
          </div>
        </div>
      </div>

      {/* Duty & VAT Calculator Tool */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
          <FileText className="w-5 h-5 text-brand-400" />
          Automated BOC Customs Assessment Engine (CAO 01-2025)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          <div className="bg-surface-elevated p-4 rounded-xl space-y-1">
            <span className="text-2xs text-text-muted font-semibold uppercase">Declared Value (PHP)</span>
            <div className="text-lg font-mono font-bold text-text-primary">₱ 1,250,000.00</div>
          </div>
          <div className="bg-surface-elevated p-4 rounded-xl space-y-1">
            <span className="text-2xs text-text-muted font-semibold uppercase">Customs Duty (5%)</span>
            <div className="text-lg font-mono font-bold text-brand-400">₱ 62,500.00</div>
          </div>
          <div className="bg-surface-elevated p-4 rounded-xl space-y-1">
            <span className="text-2xs text-text-muted font-semibold uppercase">VAT Assessment (12%)</span>
            <div className="text-lg font-mono font-bold text-teal-400">₱ 157,500.00</div>
          </div>
          <div className="bg-surface-elevated p-4 rounded-xl space-y-1 border border-brand-500/30">
            <span className="text-2xs text-text-muted font-semibold uppercase">Total Duties Payable</span>
            <div className="text-lg font-mono font-bold text-amber-400">₱ 220,000.00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
