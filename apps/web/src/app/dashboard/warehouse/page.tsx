'use client';

import { Warehouse, Boxes, AlertTriangle, ShieldCheck, ArrowUpRight, BarChart2 } from 'lucide-react';

const mockWarehouses = [
  { code: 'NCR-WH-01', name: 'Manila North Harbor Hub', type: 'bonded', area: '12,500 sqm', occupancy: 82, peza: true, manager: 'Ramon Santos' },
  { code: 'CEB-WH-02', name: 'Mandaue Logistics Logistics Center', type: 'cold_storage', area: '8,000 sqm', occupancy: 91, peza: false, manager: 'Elena Gomez' },
  { code: 'DVO-WH-01', name: 'Davao Sasa Freight Terminal', type: 'general', area: '15,000 sqm', occupancy: 64, peza: true, manager: 'Carlos Reyes' },
];

const mockInventory = [
  { sku: 'SKU-PH-881', name: 'San Miguel Beverage Cases', warehouse: 'Manila North Harbor Hub', qty: 4200, unit: 'cases', coldChain: false, status: 'In Stock' },
  { sku: 'SKU-PH-402', name: 'Refrigerated Poultry Consignment', warehouse: 'Mandaue Logistics Center', qty: 350, unit: 'boxes', coldChain: true, status: 'Low Stock' },
  { sku: 'SKU-PH-109', name: 'Electronics Components (PEZA)', warehouse: 'Davao Sasa Terminal', qty: 12500, unit: 'pcs', coldChain: false, status: 'In Stock' },
];

export default function WarehousePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Warehouse Management (WMS)</h1>
          <p className="text-sm text-text-secondary mt-1">
            Real-time zone occupancy, PEZA bonded stock tracking, and cold-chain inventory monitoring
          </p>
        </div>
      </div>

      {/* Warehouse Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockWarehouses.map((w) => (
          <div key={w.code} className="glass-card p-5 border-t-4 border-t-brand-500 hover:border-surface-border-light transition-all space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-2xs text-brand-400 font-bold">{w.code}</span>
                <h3 className="font-bold text-text-primary text-base">{w.name}</h3>
              </div>
              {w.peza && (
                <span className="px-2 py-0.5 rounded text-2xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  PEZA ZONE
                </span>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-text-muted">
                <span>Occupancy</span>
                <span className="font-bold text-text-primary">{w.occupancy}%</span>
              </div>
              <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${w.occupancy > 90 ? 'bg-red-500' : w.occupancy > 75 ? 'bg-amber-500' : 'bg-teal-500'}`}
                  style={{ width: `${w.occupancy}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-surface-border flex justify-between text-2xs text-text-muted">
              <span>Area: {w.area}</span>
              <span>Manager: {w.manager}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Inventory SKU Table */}
      <div className="glass-card overflow-hidden space-y-4 p-6">
        <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
          <Boxes className="w-5 h-5 text-brand-400" />
          Active SKU Inventory Level
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-secondary">
            <thead className="bg-surface-elevated/60 text-2xs uppercase tracking-wider text-text-muted font-semibold border-b border-surface-border">
              <tr>
                <th className="px-4 py-3">SKU & Item Name</th>
                <th className="px-4 py-3">Warehouse Location</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Cold Chain</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {mockInventory.map((item) => (
                <tr key={item.sku} className="hover:bg-surface-hover/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-mono font-bold text-text-primary text-xs">{item.sku}</div>
                    <div className="text-xs text-text-muted">{item.name}</div>
                  </td>
                  <td className="px-4 py-3 text-xs">{item.warehouse}</td>
                  <td className="px-4 py-3 font-mono text-xs font-bold text-text-primary">
                    {item.qty.toLocaleString()} {item.unit}
                  </td>
                  <td className="px-4 py-3">
                    {item.coldChain ? (
                      <span className="px-2 py-0.5 rounded text-2xs font-semibold bg-teal-500/10 text-teal-400">
                        🧊 Required (2-8°C)
                      </span>
                    ) : (
                      <span className="text-xs text-text-muted">Standard</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-2xs font-semibold ${
                      item.status === 'Low Stock' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
