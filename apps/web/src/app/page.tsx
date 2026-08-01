import Link from 'next/link';
import {
  ArrowRight,
  Ship,
  Truck,
  Warehouse,
  Brain,
  Shield,
  BarChart3,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* ── Header ──────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">LC</span>
            </div>
            <span className="text-xl font-bold text-text-primary">
              Logi<span className="text-brand-400">core</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Features
            </a>
            <a href="#platform" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Platform
            </a>
            <a href="#compliance" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Compliance
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white text-sm font-bold rounded-lg border-2 border-accent/60 transition-all duration-300 shadow-glow-teal hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-accent/15 border border-accent/40 text-accent font-semibold text-xs shadow-glow-teal">
            <Brain className="w-4 h-4 text-accent" />
            AI-Powered Logistics Intelligence
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-text-primary">The Command Center</span>
            <br />
            <span className="gradient-text">for Philippine Logistics</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Unify your transportation, fleet, warehouse, and freight operations
            into a single AI-powered platform — purpose-built for the archipelago.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="/register"
              className="inline-flex items-center gap-2.5 px-9 py-4 bg-gradient-to-r from-primary via-brand-500 to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold text-base rounded-xl border-2 border-white/30 transition-all duration-300 shadow-glow-brand hover:scale-105 hover:-translate-y-1"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2.5 px-9 py-4 bg-surface-elevated hover:bg-surface-hover text-text-primary font-bold text-base rounded-xl border-2 border-accent/40 transition-all duration-300 shadow-glow-teal hover:scale-105"
            >
              View Demo Dashboard
            </Link>
          </div>


        </div>
      </section>

      {/* ── Features Grid ───────────────────────────────────── */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              One Platform. Complete Visibility.
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Replace your disconnected tools with a unified logistics intelligence platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Truck,
                title: 'Transportation Management',
                description: 'End-to-end shipment lifecycle — from booking to proof of delivery. Multimodal routing across sea, land, and air.',
                color: 'brand',
              },
              {
                icon: Ship,
                title: 'Fleet Intelligence',
                description: 'Real-time GPS tracking, IoT telemetry, predictive maintenance, and AI-optimized route planning.',
                color: 'teal',
              },
              {
                icon: Warehouse,
                title: 'Warehouse Operations',
                description: 'Inventory management, zone configuration, cold chain monitoring, and pick-pack-ship workflows.',
                color: 'amber',
              },
              {
                icon: Shield,
                title: 'Compliance Engine',
                description: 'Built-in BOC, PEZA, and DTI-FTEB compliance workflows. Automated customs declaration processing.',
                color: 'brand',
              },
              {
                icon: Brain,
                title: 'AI Assistant',
                description: 'Natural language queries, demand forecasting, anomaly detection, and intelligent document extraction.',
                color: 'teal',
              },
              {
                icon: BarChart3,
                title: 'Analytics & Reporting',
                description: 'Real-time dashboards, custom report builder, regional volume analysis, and executive insights.',
                color: 'amber',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="kpi-card group cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enterprise Registration CTA Banner ────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto glass-card p-10 md:p-14 text-center border-2 border-accent/40 bg-gradient-to-r from-surface-card via-surface-elevated to-surface-card relative overflow-hidden shadow-card-hover">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
            Ready to Transform Your Logistics Fleet?
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Join enterprise logistics leaders like 2GO, FAST Logistics, and Royal Cargo.
            Set up your organization tenant workspace in under 2 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-primary via-brand-500 to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold text-lg rounded-xl border-2 border-white/30 transition-all duration-300 shadow-glow-brand hover:scale-105"
            >
              <span>Deploy Logicore for Your Company</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <p className="text-2xs text-text-muted mt-6">
            Instant multi-tenant setup • BOC E2M Integration • 14-day free trial
          </p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}

      <footer className="py-12 px-6 border-t border-surface-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">LC</span>
            </div>
            <span className="text-sm font-semibold text-text-secondary">
              Logicore
            </span>
          </div>
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Logicore. Built for Philippine logistics.
          </p>
        </div>
      </footer>
    </div>
  );
}
