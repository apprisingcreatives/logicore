'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Building2,
  MapPin,
  ShieldCheck,
  Truck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Warehouse,
  FileCheck,
} from 'lucide-react';

function OnboardingContent() {
  const searchParams = useSearchParams();
  const companyNameParam = searchParams.get('company') || 'Enterprise Logistics PH';

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Industry & Fleet Type
  const [industry, setIndustry] = useState('freight_forwarder');
  const [fleetSize, setFleetSize] = useState('25-100');

  // Step 2: Primary Regions & Hubs
  const [primaryRegion, setPrimaryRegion] = useState('NCR & South Luzon');

  // Step 3: Regulatory Accreditations
  const [bocAccredited, setBocAccredited] = useState(true);
  const [pezaRegistered, setPezaRegistered] = useState(true);

  // Step 4: AI Copilot Assistant Setup
  const [aiEnabled, setAiEnabled] = useState(true);

  const handleNext = () => {
    if (step < 4) {
      setStep((step + 1) as any);
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/40 text-accent text-xs font-bold shadow-glow-teal mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Logicore Organization Onboarding
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome, {companyNameParam}!
          </h1>
          <p className="text-sm text-text-secondary">
            Configure your enterprise tenant workspace in 4 easy steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="glass-card p-4 rounded-xl flex items-center justify-between border-surface-border">
          {[
            { num: 1, label: 'Profile & Fleet' },
            { num: 2, label: 'Hub Regions' },
            { num: 3, label: 'Compliance' },
            { num: 4, label: 'AI Copilot' },
          ].map((item) => (
            <div key={item.num} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                  step >= item.num
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-glow-teal'
                    : 'bg-surface-elevated text-text-muted border border-surface-border'
                }`}
              >
                {step > item.num ? <CheckCircle2 className="w-4 h-4 text-white" /> : item.num}
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${step >= item.num ? 'text-white' : 'text-text-muted'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step Card Body */}
        <div className="glass-card p-8 shadow-card-hover border-2 border-accent/30 space-y-6">
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-3 border-b border-surface-border pb-4">
                <Building2 className="w-6 h-6 text-accent" />
                <div>
                  <h3 className="text-lg font-bold text-white">Select Logistics Domain</h3>
                  <p className="text-xs text-text-muted">Tailors dashboard KPIs for your business operations</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'freight_forwarder', title: 'Freight Forwarding', desc: 'Sea, air & customs clearance' },
                  { id: 'trucking', title: 'Road Express Trucking', desc: 'First/last mile fleet distribution' },
                  { id: 'warehouse', title: '3PL & WMS Warehousing', desc: 'Storage, pick-pack & cold chain' },
                  { id: 'shipping_line', title: 'Domestic Shipping Line', desc: 'Container vessel & RoRo operations' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setIndustry(opt.id)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      industry === opt.id
                        ? 'bg-surface-elevated border-accent text-white shadow-glow-teal'
                        : 'bg-surface-card border-surface-border text-text-secondary hover:border-text-muted'
                    }`}
                  >
                    <div className="font-bold text-sm text-white">{opt.title}</div>
                    <div className="text-2xs text-text-muted mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs font-semibold text-text-muted uppercase">Fleet & Vehicle Size</label>
                <select
                  value={fleetSize}
                  onChange={(e) => setFleetSize(e.target.value)}
                  className="w-full mt-1.5 px-4 py-2.5 bg-surface-elevated border border-surface-border rounded-lg text-sm text-white font-bold"
                >
                  <option value="1-10">1 – 10 Vehicles / Trucks</option>
                  <option value="11-25">11 – 25 Vehicles / Trucks</option>
                  <option value="25-100">25 – 100 Enterprise Fleet</option>
                  <option value="100+">100+ Multi-Regional Fleet</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-3 border-b border-surface-border pb-4">
                <MapPin className="w-6 h-6 text-teal-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">Primary Philippine Hub Regions</h3>
                  <p className="text-xs text-text-muted">Sets default GPS geofencing & regional telemetry</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  'NCR & South Luzon (Manila, Batangas, Laguna)',
                  'Visayas Inter-Island Corridor (Cebu, Iloilo, Bacolod)',
                  'Mindanao Gateway (Davao, Cagayan de Oro, Zamboanga)',
                  'Nationwide Archipelago Coverage',
                ].map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setPrimaryRegion(region)}
                    className={`w-full p-4 rounded-xl text-left border flex items-center justify-between transition-all ${
                      primaryRegion === region
                        ? 'bg-surface-elevated border-teal-400 text-white shadow-glow-teal'
                        : 'bg-surface-card border-surface-border text-text-secondary'
                    }`}
                  >
                    <span className="font-semibold text-sm">{region}</span>
                    {primaryRegion === region && <CheckCircle2 className="w-5 h-5 text-teal-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-3 border-b border-surface-border pb-4">
                <FileCheck className="w-6 h-6 text-amber-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">Regulatory Integration Setup</h3>
                  <p className="text-xs text-text-muted">Enable automated compliance filings for Philippine agencies</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-surface-card border border-surface-border rounded-xl cursor-pointer">
                  <div>
                    <span className="font-bold text-sm text-white block">Bureau of Customs (BOC E2M) Portal</span>
                    <span className="text-xs text-text-muted">Enable automated E2M customs declaration submissions</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={bocAccredited}
                    onChange={(e) => setBocAccredited(e.target.checked)}
                    className="w-5 h-5 accent-accent rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-surface-card border border-surface-border rounded-xl cursor-pointer">
                  <div>
                    <span className="font-bold text-sm text-white block">PEZA Economic Zone Integration</span>
                    <span className="text-xs text-text-muted">Auto-verify PTOPS permits for ecozone tax exemption</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={pezaRegistered}
                    onChange={(e) => setPezaRegistered(e.target.checked)}
                    className="w-5 h-5 accent-accent rounded"
                  />
                </label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5 animate-fade-in text-center py-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center mx-auto shadow-glow-brand">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Gemini AI Operations Assistant Ready</h3>
                <p className="text-xs text-text-muted max-w-md mx-auto mt-1">
                  Your tenant workspace is configured with AI anomaly detection, automatic route optimization, and natural language query tools.
                </p>
              </div>

              <div className="p-4 bg-surface-elevated border border-surface-border rounded-xl text-xs text-text-secondary text-left space-y-2">
                <div className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  Workspace Ready Summary:
                </div>
                <ul className="space-y-1 list-disc list-inside text-text-muted pl-1">
                  <li>Tenant: <strong className="text-white">{companyNameParam}</strong></li>
                  <li>Region: <strong className="text-white">{primaryRegion}</strong></li>
                  <li>Compliance: <strong className="text-white">BOC & PEZA Active</strong></li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-surface-border">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="px-5 py-2.5 bg-surface-elevated hover:bg-surface-hover text-white font-semibold rounded-lg text-xs"
              >
                Back
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3 bg-gradient-to-r from-primary via-brand-500 to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold rounded-xl text-sm transition-all shadow-glow-brand flex items-center gap-2"
            >
              <span>{step === 4 ? 'Complete Onboarding & Open Command Center' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center text-text-muted">Loading onboarding...</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
