'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Truck,
  Warehouse as WarehouseIcon,
  Ship,
  Brain,
  BarChart3,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  {
    label: 'OVERVIEW',
    items: [
      { name: 'Command Center', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      { name: 'Shipments', href: '/dashboard/shipments', icon: Package },
      { name: 'Fleet', href: '/dashboard/fleet', icon: Truck },
      { name: 'Warehouse', href: '/dashboard/warehouse', icon: WarehouseIcon },
      { name: 'Freight', href: '/dashboard/freight', icon: Ship },
    ],
  },
  {
    label: 'INTELLIGENCE',
    items: [
      { name: 'AI Assistant', href: '/dashboard/ai', icon: Brain },
      { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { name: 'Compliance', href: '/dashboard/compliance', icon: Shield },
      { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen flex flex-col bg-surface border-r border-surface-border transition-all duration-300',
        collapsed ? 'w-[68px]' : 'w-[260px]',
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-surface-border shrink-0">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">LC</span>
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-text-primary whitespace-nowrap animate-fade-in">
              Logi<span className="text-brand-400">core</span>
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navigation.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="px-3 mb-2 text-2xs font-semibold text-text-muted uppercase tracking-wider">
                {group.label}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-brand-500/10 text-brand-400 font-bold'
                        : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                      collapsed && 'justify-center px-0',
                    )}
                    title={collapsed ? item.name : undefined}
                  >
                    <item.icon
                      className={cn(
                        'w-5 h-5 shrink-0',
                        isActive ? 'text-brand-400' : 'text-text-muted',
                      )}
                    />
                    {!collapsed && (
                      <span className="whitespace-nowrap">{item.name}</span>
                    )}
                    {isActive && !collapsed && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-400" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* AI Quick Action */}
      {!collapsed && (
        <div className="px-3 pb-3">
          <Link
            href="/dashboard/ai"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-brand-500/10 to-teal-500/10 border border-brand-500/20 text-sm text-brand-300 hover:from-brand-500/20 hover:to-teal-500/20 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 text-brand-400" />
            <div>
              <p className="font-medium text-brand-300">Ask AI</p>
              <p className="text-xs text-text-muted">Intelligent assistant</p>
            </div>
          </Link>
        </div>
      )}

      {/* Collapse Toggle */}
      <div className="px-3 pb-4 shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-text-muted hover:bg-surface-hover hover:text-text-secondary transition-colors text-sm"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
