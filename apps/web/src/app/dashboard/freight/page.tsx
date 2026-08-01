'use client';

import { Ship, Anchor, FileText, CheckCircle2, Clock, Shield } from 'lucide-react';

const mockBookings = [
  { bookingNumber: 'FB-2026-9901', mode: 'sea', incoterms: 'CIF', vessel: 'MV Manila Star', pol: 'Port of Manila', pod: 'Port of Cebu', etd: 'Aug 03, 2026', status: 'customs_clearance' },
  { bookingNumber: 'FB-2026-9908', mode: 'air', incoterms: 'DDP', vessel: 'PR-810 Cargo Flight', pol: 'NAIA Pasay', pod: 'Francisco Bangoy Airport Davao', etd: 'Aug 02, 2026', status: 'cleared' },
];

export default function FreightPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Freight Forwarding & Sea Cargo</h1>
          <p className="text-sm text-text-secondary mt-1">
            Container booking management, vessel schedules, Incoterms tracking, and port declarations
          </p>
        </div>
      </div>

      <div className="glass-card overflow-hidden p-6 space-y-4">
        <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
          <Ship className="w-5 h-5 text-brand-400" />
          Active Sea & Air Freight Bookings
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-secondary">
            <thead className="bg-surface-elevated/60 text-2xs uppercase tracking-wider text-text-muted font-semibold border-b border-surface-border">
              <tr>
                <th className="px-4 py-3">Booking #</th>
                <th className="px-4 py-3">Incoterms</th>
                <th className="px-4 py-3">Vessel / Carrier</th>
                <th className="px-4 py-3">Port Loading → Discharge</th>
                <th className="px-4 py-3">ETD</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {mockBookings.map((b) => (
                <tr key={b.bookingNumber} className="hover:bg-surface-hover/50 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-text-primary">{b.bookingNumber}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-2xs font-bold bg-brand-500/10 text-brand-400">
                      {b.incoterms}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-medium text-text-primary">{b.vessel}</td>
                  <td className="px-4 py-3 text-xs">{b.pol} → {b.pod}</td>
                  <td className="px-4 py-3 text-xs font-mono">{b.etd}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-2xs font-semibold ${
                      b.status === 'cleared' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {b.status.replace('_', ' ')}
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
