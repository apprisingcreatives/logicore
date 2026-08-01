'use client';

import { useState } from 'react';
import { Truck, MapPin, Gauge, Fuel, Plus, X, AlertTriangle, ShieldCheck } from 'lucide-react';

const initialVehicles = [
  { plate: 'NCB-8812', type: 'Heavy Truck (10 wheeler)', status: 'in_transit', driver: 'Arnel Mendoza', speed: '62 km/h', fuel: '74%', location: 'SLEX Calamba Exit, Laguna' },
  { plate: 'CBU-4091', type: 'Refrigerated Cold Chain Truck', status: 'in_transit', driver: 'Danilo Cruz', speed: '48 km/h', fuel: '82%', location: 'Mandaue Reclamation Area, Cebu' },
  { plate: 'DVO-1204', type: 'Light Cargo Van', status: 'available', driver: 'Unassigned', speed: '0 km/h', fuel: '95%', location: 'Davao Hub Terminal, Buhangin' },
  { plate: 'MNL-8831', type: 'Container Tractor Head', status: 'maintenance', driver: 'Rodrigo Santos', speed: '0 km/h', fuel: '30%', location: 'Manila North Harbor Garage' },
];

export default function FleetPage() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ plate: '', type: 'Heavy Truck (10 wheeler)', driver: '' });

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      plate: newVehicle.plate.toUpperCase() || 'PH-8891',
      type: newVehicle.type,
      status: 'available',
      driver: newVehicle.driver || 'Unassigned',
      speed: '0 km/h',
      fuel: '100%',
      location: 'Manila Main Terminal',
    };
    setVehicles([created, ...vehicles]);
    setIsModalOpen(false);
    setNewVehicle({ plate: '', type: 'Heavy Truck (10 wheeler)', driver: '' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Fleet Intelligence & IoT Telemetry</h1>
          <p className="text-sm text-text-secondary mt-1">
            Real-time GPS tracking, fuel sensors, cold chain temperature monitoring, and driver safety scoring
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl text-sm shadow-glow-teal hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Register Vehicle</span>
        </button>
      </div>

      {/* GPS Tracking Map Banner */}
      <div className="glass-card p-6 bg-gradient-to-br from-surface-card to-surface-elevated border-surface-border relative overflow-hidden h-64 flex flex-col justify-between shadow-card-hover">
        <div className="flex justify-between items-start z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 text-accent text-xs font-bold border border-accent/30 mb-2 shadow-glow-teal">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Live Telemetry Feed Active
            </div>
            <h3 className="text-xl font-bold text-white">Archipelago GPS Tracking Active</h3>
          </div>
          <div className="flex gap-4 text-xs">
            <div className="glass-card px-4 py-2 text-center border-accent/40">
              <div className="text-text-muted">Active Vehicles</div>
              <div className="text-xl font-bold text-accent">{vehicles.length} Active</div>
            </div>
            <div className="glass-card px-4 py-2 text-center border-accent/40">
              <div className="text-text-muted">Avg Speed</div>
              <div className="text-xl font-bold text-white">54 km/h</div>
            </div>
          </div>
        </div>

        <div className="z-10 flex items-center gap-2 text-xs text-text-muted">
          <MapPin className="w-4 h-4 text-accent" />
          <span>Tracking active fleet vehicles across Luzon, Visayas, & Mindanao highway corridors</span>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicles.map((v) => (
          <div key={v.plate} className="glass-card p-5 space-y-4 hover:border-accent/50 transition-all shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono font-bold text-white text-base">{v.plate}</h4>
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

            <div className="grid grid-cols-3 gap-2 text-xs py-2 bg-surface-elevated/60 rounded-lg p-3 border border-surface-border">
              <div>
                <span className="text-text-muted text-2xs block">Driver</span>
                <span className="font-medium text-white">{v.driver}</span>
              </div>
              <div>
                <span className="text-text-muted text-2xs block">Speed</span>
                <span className="font-medium text-white flex items-center gap-1">
                  <Gauge className="w-3 h-3 text-accent" /> {v.speed}
                </span>
              </div>
              <div>
                <span className="text-text-muted text-2xs block">Fuel</span>
                <span className="font-medium text-white flex items-center gap-1">
                  <Fuel className="w-3 h-3 text-teal-400" /> {v.fuel}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-text-muted pt-1">
              <span className="flex items-center gap-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-text-muted" /> {v.location}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Register Vehicle Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-dark/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 space-y-4 border-2 border-accent/40 shadow-card-hover">
            <div className="flex justify-between items-center border-b border-surface-border pb-3">
              <h3 className="text-lg font-bold text-white">Register Fleet Vehicle</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddVehicle} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-text-muted uppercase">Plate Number</label>
                <input
                  type="text"
                  required
                  value={newVehicle.plate}
                  onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })}
                  placeholder="e.g. NKO-9921"
                  className="w-full mt-1 px-3 py-2 bg-surface-elevated border border-surface-border rounded-lg text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-muted uppercase">Vehicle Category</label>
                <select
                  value={newVehicle.type}
                  onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-surface-elevated border border-surface-border rounded-lg text-sm text-white"
                >
                  <option value="Heavy Truck (10 wheeler)">Heavy Truck (10 wheeler)</option>
                  <option value="Refrigerated Cold Chain Truck">Refrigerated Cold Chain Truck</option>
                  <option value="Light Cargo Van">Light Cargo Van</option>
                  <option value="Container Tractor Head">Container Tractor Head</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-text-muted uppercase">Assigned Driver</label>
                <input
                  type="text"
                  value={newVehicle.driver}
                  onChange={(e) => setNewVehicle({ ...newVehicle, driver: e.target.value })}
                  placeholder="e.g. Juan Dela Cruz"
                  className="w-full mt-1 px-3 py-2 bg-surface-elevated border border-surface-border rounded-lg text-sm text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold rounded-lg text-sm shadow-glow-teal mt-2"
              >
                Register & Attach Telemetry Sensor
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
