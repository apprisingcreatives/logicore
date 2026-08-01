'use client';

import { Bell, Search, User, ChevronDown } from 'lucide-react';

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 bg-surface/80 backdrop-blur-xl border-b border-surface-border">
      {/* ── Search ──────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search shipments, vehicles, inventory..."
            className="w-full pl-10 pr-4 py-2 bg-surface-elevated border border-surface-border rounded-lg text-sm text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
          />

          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-surface-elevated rounded text-2xs text-text-muted border border-surface-border">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* ── Right Side ──────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-text-muted hover:bg-surface-hover hover:text-text-secondary transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User Menu */}
        <button className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-surface-hover transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-text-primary">Admin User</p>
            <p className="text-2xs text-text-muted">Demo Organization</p>
          </div>
          <ChevronDown className="w-4 h-4 text-text-muted hidden md:block" />
        </button>
      </div>
    </header>
  );
}
