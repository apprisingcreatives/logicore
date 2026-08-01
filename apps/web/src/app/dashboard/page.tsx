import {
  Package,
  Truck,
  Warehouse,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Activity,
  Ship,
  Brain,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Command Center',
};

// ── Mock Data ─────────────────────────────────────────────

const kpis = {
  shipments: {
    total: 2847,
    inTransit: 423,
    delivered: 2189,
    delayed: 47,
    onTimeRate: 96.8,
    trend: 5.2,
  },
  fleet: {
    totalVehicles: 156,
    activeVehicles: 98,
    utilization: 62.8,
    maintenanceDue: 12,
    trend: 2.1,
  },
  warehouse: {
    totalWarehouses: 8,
    avgOccupancy: 73.5,
    itemsProcessedToday: 1247,
    pendingInbound: 34,
    trend: -1.3,
  },
  revenue: {
    thisMonth: 12_450_000,
    trend: 8.5,
  },
};

const recentActivity = [
  {
    id: '1',
    type: 'shipment' as const,
    action: 'Delivered',
    description: 'LC-2026-A3F7-K9M2 delivered to Manila — received by J. Santos',
    time: '2 min ago',
    severity: 'success' as const,
  },
  {
    id: '2',
    type: 'fleet' as const,
    action: 'Alert',
    description: 'Vehicle MNL-TRK-042 — maintenance overdue by 3 days',
    time: '15 min ago',
    severity: 'warning' as const,
  },
  {
    id: '3',
    type: 'ai' as const,
    action: 'Insight',
    description: 'Anomaly detected: Cebu-Davao route showing 23% increase in transit time',
    time: '1 hour ago',
    severity: 'info' as const,
  },
  {
    id: '4',
    type: 'shipment' as const,
    action: 'In Transit',
    description: 'LC-2026-B7K2-P4M8 departed Port of Cebu — ETA Davao: Aug 4',
    time: '2 hours ago',
    severity: 'info' as const,
  },
  {
    id: '5',
    type: 'warehouse' as const,
    action: 'Low Stock',
    description: 'Warehouse NCR-01 Zone B: SKU-4821 below reorder point (qty: 12)',
    time: '3 hours ago',
    severity: 'warning' as const,
  },
];

const topRoutes = [
  { route: 'Manila → Cebu', volume: 847, change: 12.3 },
  { route: 'Manila → Davao', volume: 623, change: 8.7 },
  { route: 'Cebu → Manila', volume: 589, change: -2.1 },
  { route: 'Manila → CDO', volume: 412, change: 15.4 },
  { route: 'Subic → Manila', volume: 387, change: 5.8 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Command Center
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Real-time overview of your logistics operations
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Activity className="w-4 h-4 text-teal-400" />
          <span>Live</span>
          <span className="status-dot-active" />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="kpi-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-brand-400" />
            </div>
            <TrendBadge value={kpis.shipments.trend} />
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {kpis.shipments.total.toLocaleString()}
          </p>
          <p className="text-sm text-text-muted mt-1">Total Shipments</p>
          <div className="mt-4 flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-teal-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {kpis.shipments.delivered.toLocaleString()} delivered
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <Clock className="w-3.5 h-3.5" />
              {kpis.shipments.inTransit} in transit
            </span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-teal-400" />
            </div>
            <TrendBadge value={kpis.fleet.trend} />
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {kpis.fleet.utilization}%
          </p>
          <p className="text-sm text-text-muted mt-1">Fleet Utilization</p>
          <div className="mt-4 flex items-center gap-4 text-xs">
            <span className="text-text-secondary">
              {kpis.fleet.activeVehicles}/{kpis.fleet.totalVehicles} active
            </span>
            {kpis.fleet.maintenanceDue > 0 && (
              <span className="flex items-center gap-1 text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                {kpis.fleet.maintenanceDue} maintenance
              </span>
            )}
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Warehouse className="w-5 h-5 text-amber-400" />
            </div>
            <TrendBadge value={kpis.warehouse.trend} />
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {kpis.warehouse.avgOccupancy}%
          </p>
          <p className="text-sm text-text-muted mt-1">Avg Warehouse Occupancy</p>
          <div className="mt-4 flex items-center gap-4 text-xs">
            <span className="text-text-secondary">
              {kpis.warehouse.totalWarehouses} warehouses
            </span>
            <span className="text-text-secondary">
              {kpis.warehouse.itemsProcessedToday.toLocaleString()} processed today
            </span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-green-400" />
            </div>
            <TrendBadge value={kpis.revenue.trend} />
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {kpis.shipments.onTimeRate}%
          </p>
          <p className="text-sm text-text-muted mt-1">On-Time Delivery Rate</p>
          <div className="mt-4 flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-red-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              {kpis.shipments.delayed} delayed
            </span>
            <span className="text-teal-400">
              ₱{(kpis.revenue.thisMonth / 1_000_000).toFixed(1)}M this month
            </span>
          </div>
        </div>
      </div>

      {/* Activity Feed & Routes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary">
              Live Activity
            </h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-surface-hover transition-colors">
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400">
                    {item.action}
                  </span>
                  <p className="text-sm text-text-secondary mt-1 truncate">{item.description}</p>
                </div>
                <span className="text-xs text-text-muted whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary">Top Routes</h2>
          </div>
          <div className="space-y-4">
            {topRoutes.map((route, i) => (
              <div key={route.route} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">{route.route}</p>
                  <p className="text-xs text-text-muted">{route.volume} shipments</p>
                </div>
                <span className="text-xs font-bold text-teal-400">+{route.change}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TrendBadge({ value }: { value: number }) {
  const isPositive = value >= 0;
  return (
    <span className={cn('text-xs px-2 py-1 rounded-full font-medium', isPositive ? 'bg-teal-500/10 text-teal-400' : 'bg-red-500/10 text-red-400')}>
      {isPositive ? '+' : ''}{value}%
    </span>
  );
}
