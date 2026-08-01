'use client';

import { useState } from 'react';

const mockAssignedTrips = [
  { id: '1', tracking: 'LC-2026-A3F7-K9M2', origin: 'North Harbor, Manila', destination: 'Mandaue City, Cebu', cargo: 'Beverage Crates (1,420 kg)', status: 'In Transit' },
  { id: '2', tracking: 'LC-2026-B7K2-P4M8', origin: 'Batangas Port', destination: 'Sasa Port, Davao', cargo: 'Food Supplies (12,500 kg)', status: 'Pending Pickup' },
];

export default function MobilePreviewPage() {
  const [gpsActive, setGpsActive] = useState(true);
  const [activeTab, setActiveTab] = useState<'trips' | 'pod'>('trips');
  const [podSuccess, setPodSuccess] = useState(false);

  const handleCapturePOD = (tracking: string) => {
    setPodSuccess(true);
    setTimeout(() => setPodSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
      <div className="text-center mb-6 space-y-1">
        <h1 className="text-2xl font-bold text-white">Logicore Driver Mobile App Simulator</h1>
        <p className="text-sm text-text-muted">React Native / Expo Driver Mobile App interactive browser simulator</p>
      </div>

      {/* iPhone Device Frame */}
      <div className="w-[380px] h-[780px] bg-[#0A2540] rounded-[48px] border-[10px] border-[#173654] shadow-2xl flex flex-col overflow-hidden relative">
        {/* Notch */}
        <div className="w-32 h-5 bg-[#173654] rounded-b-2xl mx-auto z-50 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-surface-card" />
        </div>

        {/* Mobile Header Bar */}
        <div className="px-5 py-3 border-b border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold text-xs">
              LC
            </div>
            <span className="font-bold text-white text-sm">Logicore <span className="text-accent">Driver</span></span>
          </div>

          <button
            onClick={() => setGpsActive(!gpsActive)}
            className={`px-2.5 py-1 rounded-full text-2xs font-bold flex items-center gap-1.5 ${
              gpsActive ? 'bg-teal-500/15 text-accent border border-accent/30' : 'bg-red-500/15 text-red-400 border border-red-500/30'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${gpsActive ? 'bg-accent animate-pulse' : 'bg-red-500'}`} />
            {gpsActive ? 'GPS Live' : 'GPS Offline'}
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-surface-border bg-surface-card/40">
          <button
            onClick={() => setActiveTab('trips')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${
              activeTab === 'trips' ? 'border-accent text-accent bg-accent/5' : 'border-transparent text-text-muted'
            }`}
          >
            Assigned Trips
          </button>
          <button
            onClick={() => setActiveTab('pod')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${
              activeTab === 'pod' ? 'border-accent text-accent bg-accent/5' : 'border-transparent text-text-muted'
            }`}
          >
            Digital POD
          </button>
        </div>

        {/* Mobile Body View */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {podSuccess && (
            <div className="p-3 bg-teal-500/20 border border-teal-500/40 rounded-xl text-teal-400 text-xs font-bold flex items-center gap-2">
              <span>✓ Proof of Delivery & Geo-Signature synced to Cloud!</span>
            </div>
          )}

          {activeTab === 'trips' ? (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">Active Assignments</h3>
              {mockAssignedTrips.map((item) => (
                <div key={item.id} className="bg-surface-card border border-surface-border rounded-xl p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-accent text-sm">{item.tracking}</span>
                    <span className="px-2 py-0.5 rounded text-2xs font-semibold bg-accent/15 text-accent border border-accent/30">
                      {item.status}
                    </span>
                  </div>

                  <div className="bg-surface-elevated/60 p-3 rounded-lg space-y-1 text-2xs">
                    <span className="text-text-muted block uppercase">Origin</span>
                    <span className="font-semibold text-white block">{item.origin}</span>
                    <span className="text-text-muted block uppercase pt-1">Destination</span>
                    <span className="font-semibold text-white block">→ {item.destination}</span>
                  </div>

                  <p className="text-2xs text-text-muted">Cargo: {item.cargo}</p>

                  <button
                    onClick={() => handleCapturePOD(item.tracking)}
                    className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-lg text-xs transition-all shadow-glow-brand"
                  >
                    📷 Capture Proof of Delivery
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">Geo-Stamped POD Camera</h3>
              <div className="h-52 bg-surface-elevated rounded-xl border-2 border-dashed border-surface-border flex flex-col items-center justify-center text-center p-4">
                <span className="text-xs text-text-muted">📷 Camera Viewfinder Simulation</span>
                <span className="text-2xs text-accent mt-2 font-mono">Lat: 14.5995° N, Lng: 120.9842° E</span>
              </div>
              <button
                onClick={() => handleCapturePOD('LC-2026-A3F7')}
                className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl text-xs shadow-glow-teal"
              >
                Confirm Delivery & Sign
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
