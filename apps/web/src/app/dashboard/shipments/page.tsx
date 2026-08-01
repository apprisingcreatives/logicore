'use client';

import { useState } from 'react';
import { Package, Search, Plus, Filter, ArrowUpDown, Truck, MapPin, Calendar, Clock, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';

const mockShipments = [
  {
    id: '1',
    trackingNumber: 'LC-2026-A3F7-K9M2',
    referenceNumber: 'PO-99120',
    mode: 'multimodal',
    status: 'delivered',
    priority: 'express',
    origin: 'North Harbor, Tondo, Manila',
    destination: 'Mandaue City, Cebu',
    sender: 'San Miguel Corp Distribution',
    receiver: 'Visayas Retail Hub',
    weight: '1,420 kg',
    eta: 'Aug 02, 2026',
  },
  {
    id: '2',
    trackingNumber: 'LC-2026-B7K2-P4M8',
    referenceNumber: 'PO-99124',
    mode: 'sea',
    status: 'in_transit',
    priority: 'priority',
    origin: 'Batangas Port, Batangas',
    destination: 'Sasa Port, Davao City',
    sender: 'Universal Robina Corp',
    receiver: 'Mindanao Commercial Depot',
    weight: '12,500 kg',
    eta: 'Aug 04, 2026',
  },
  {
    id: '3',
    trackingNumber: 'LC-2026-C9N3-R5X7',
    referenceNumber: 'INV-44102',
    mode: 'air',
    status: 'customs_hold',
    priority: 'same_day',
    origin: 'NAIA Cargo Terminal, Pasay',
    destination: 'Baguio City, Benguet',
    sender: 'PharmaTech Solutions',
    receiver: 'Northern Luzon General Hospital',
    weight: '85 kg',
    eta: 'Aug 02, 2026',
  },
  {
    id: '4',
    trackingNumber: 'LC-2026-D4P1-W8Z9',
    referenceNumber: 'SO-1004',
    mode: 'road',
    status: 'out_for_delivery',
    priority: 'standard',
    origin: 'PEZA Ecozone, Santa Rosa, Laguna',
    destination: 'BGC, Taguig, NCR',
    sender: 'TechAssembly PH Inc',
    receiver: 'Digital World BGC Store',
    weight: '450 kg',
    eta: 'Aug 02, 2026',
  },
];

export default function ShipmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Shipment Management (TMS)</h1>
          <p className="text-sm text-text-secondary mt-1">
            Track and orchestrate inter-island multimodal shipments across the Philippine archipelago
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-semibold rounded-xl text-sm transition-all shadow-glow-brand">
          <Plus className="w-4 h-4" />
          <span>New Shipment</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by tracking number, sender, or destination..."
            className="w-full pl-10 pr-4 py-2 bg-surface-elevated border border-surface-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500/40"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-surface-elevated border border-surface-border rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Status</span>
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-surface-elevated border border-surface-border rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort by ETA</span>
          </button>
        </div>
      </div>

      {/* Shipment Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-secondary">
            <thead className="bg-surface-elevated/60 text-2xs uppercase tracking-wider text-text-muted font-semibold border-b border-surface-border">
              <tr>
                <th className="px-6 py-4">Tracking & Ref</th>
                <th className="px-6 py-4">Mode</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Origin & Destination</th>
                <th className="px-6 py-4">Parties</th>
                <th className="px-6 py-4">Weight</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {mockShipments.map((s) => (
                <tr key={s.id} className="hover:bg-surface-hover/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-mono font-semibold text-text-primary">{s.trackingNumber}</div>
                    <div className="text-xs text-text-muted">{s.referenceNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize px-2.5 py-1 rounded-md text-2xs font-semibold bg-surface-elevated border border-surface-border text-brand-300">
                      {s.mode}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="text-xs font-medium text-text-primary truncate">{s.origin}</div>
                    <div className="text-2xs text-text-muted truncate">→ {s.destination}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-medium text-text-primary">{s.receiver}</div>
                    <div className="text-2xs text-text-muted">From: {s.sender}</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{s.weight}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
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

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    delivered: { label: 'Delivered', className: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
    in_transit: { label: 'In Transit', className: 'bg-brand-500/10 text-brand-400 border-brand-500/20' },
    customs_hold: { label: 'Customs Hold', className: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    out_for_delivery: { label: 'Out for Delivery', className: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
  };

  const conf = map[status] || { label: status, className: 'bg-gray-500/10 text-gray-400 border-gray-500/20' };

  return (
    <span className={`px-2.5 py-1 rounded-full text-2xs font-semibold border ${conf.className}`}>
      {conf.label}
    </span>
  );
}
