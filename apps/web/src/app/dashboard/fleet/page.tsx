'use client';

import { Truck, AlertTriangle, ShieldCheck, MapPin, Gauge, Fuel } from 'lucide-react';

const mockVehicles = [
  { plate: 'NCB-8812', type: 'Heavy Truck (10 wheeler)', status: 'in_transit', driver: 'Arnel Mendoza', speed: '62 km/h', fuel: '74%', location: 'SLEX Calamba Exit, Laguna' },
  { plate: 'CBU-4091', type: 'Refrigerated Cold Chain Truck', status: 'in_transit', driver: 'Danilo Cruz', speed: '48 km/h', fuel: '82%', location: 'Mandaue Reclamation Area, Cebu' },
  { plate: 'DVO-1204', type: 'Light Cargo Van', status: 'available', driver: 'Unassigned', speed: '0 km/h', fuel: '95%', location: 'Davao Hub Terminal, Buhangin' },
  { plate: 'MNL-8831', type: 'Container Tractor Head', status: 'maintenance', driver: 'Rodrigo Santos', speed: '0 km/h', fuel: '30%', location: 'Manila North Harbor Garage' },
];

export default function FleetPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Fleet Intelligence & IoT Telemetry</h1>
          <p className="text-sm text-text-secondary mt-1">
            Real-time GPS tracking, fuel sensors, cold chain temperature monitoring, and driver safety scoring
          </p>
        </div>
      </div>

      {/* Map simulation banner */}
      <div className="glass-card p-6 bg-gradient-to-br from-surface-card to-surface-elevated border-surface-border relative overflow-hidden h-64 flex flex-col justify-between">
        <div className="flex justify-between items-start z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-medium border border-teal-500/20 mb-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" /> Live Telemetry Feed
            </div>
            <h3 className="text-lg font-bold text-text-primary">Archipelago GPS Tracking Active</h3>
          </div>
          <div className="flex gap-4 text-xs">
            <div className="glass-card px-3 py-2 text-center">
              <div className="text-text-muted">Active Vehicles</div>
              <div className="text-lg font-bold text-teal-400">98 / 156</div>
            </div>
            <div className="glass-card px-3 py-2 text-center">
              <div className="text-text-muted">Avg Speed</div>
              <div className="text-lg font-bold text-brand-400">54 km/h</div>
            </div>
          </div>
        </div>

        {/* Abstract Map Nodes Visual */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-[500px] h-[300px] border border-dashed border-brand-400/40 rounded-full animate-spin [animation-duration:30s]" />
        </div>

        <div className="z-10 flex items-center gap-2 text-xs text-text-muted">
          <MapPin className="w-4 h-4 text-brand-400" />
          <span>Tracking 98 active vehicles across Luzon, Visayas, & Mindanao highway corridors</span>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockVehicles.map((v) => (
          <div key={v.plate} className="glass-card p-5 space-y-4 hover:border-surface-border-light transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono font-bold text-text-primary text-base">{v.plate}</h4>
                  <p className="text-2xs text-text-muted">{v.type}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-2xs font-semibold ${
                v.status === 'in_transit' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' :
                v.status === 'available' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' :
                'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {v.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs py-2 bg-surface-elevated/40 rounded-lg p-3">
              <div>
                <span className="text-text-muted text-2xs block">Driver</span>
                <span className="font-medium text-text-primary">{v.driver}</span>
              </div>
              <div>
                <span className="text-text-muted text-2xs block">Current Speed</span>
                <span className="font-medium text-text-primary flex items-center gap-1">
                  <Gauge className="w-3 h-3 text-brand-400" /> {v.speed}
                </span>
              </div>
              <div>
                <span className="text-text-muted text-2xs block">Fuel Level</span>
                <span className="font-medium text-text-primary flex items-center gap-1">
                  <Fuel className="w-3 h-3 text-teal-400" /> {v.fuel}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-text-muted pt-1">
              <span className="flex items-center gap-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-text-muted" /> {v.location}
              </span>
              <button className="text-brand-400 hover:text-brand-300 font-medium">Telematics →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
