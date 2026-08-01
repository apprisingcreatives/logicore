'use client';

import { useState } from 'react';
import { Package, Search, Plus, Filter, ArrowUpDown, ChevronRight, X, CheckCircle2 } from 'lucide-react';

const initialShipments = [
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
];

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState(initialShipments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);

  // New Shipment Form State
  const [newForm, setNewForm] = useState({
    origin: '',
    destination: '',
    sender: '',
    receiver: '',
    mode: 'road',
    weight: '',
  });

  const handleCreateShipment = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: Date.now().toString(),
      trackingNumber: `LC-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}-K9M2`,
      referenceNumber: `PO-${Math.floor(10000 + Math.random() * 90000)}`,
      mode: newForm.mode,
      status: 'in_transit',
      priority: 'express',
      origin: newForm.origin || 'Manila Hub',
      destination: newForm.destination || 'Cebu Port',
      sender: newForm.sender || 'Enterprise Sender',
      receiver: newForm.receiver || 'Enterprise Consignee',
      weight: newForm.weight ? `${newForm.weight} kg` : '500 kg',
      eta: 'Aug 05, 2026',
    };

    setShipments([created, ...shipments]);
    setIsModalOpen(false);
    setNewForm({ origin: '', destination: '', sender: '', receiver: '', mode: 'road', weight: '' });
  };

  const filteredShipments = shipments.filter((s) => {
    const matchesSearch =
      s.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl text-sm transition-all shadow-glow-teal hover:scale-105"
        >
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
            placeholder="Search tracking, origin, destination..."
            className="w-full pl-10 pr-4 py-2 bg-surface-elevated border border-surface-border rounded-lg text-sm text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-surface-elevated border border-surface-border rounded-lg text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            <option value="all">All Statuses</option>
            <option value="delivered">Delivered</option>
            <option value="in_transit">In Transit</option>
            <option value="customs_hold">Customs Hold</option>
          </select>
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
              {filteredShipments.map((s) => (
                <tr key={s.id} className="hover:bg-surface-hover/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-mono font-semibold text-white">{s.trackingNumber}</div>
                    <div className="text-xs text-text-muted">{s.referenceNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize px-2.5 py-1 rounded-md text-2xs font-semibold bg-surface-elevated border border-surface-border text-accent">
                      {s.mode}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-2xs font-semibold ${
                      s.status === 'delivered' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' :
                      s.status === 'in_transit' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {s.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="text-xs font-medium text-white truncate">{s.origin}</div>
                    <div className="text-2xs text-text-muted truncate">→ {s.destination}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-medium text-white">{s.receiver}</div>
                    <div className="text-2xs text-text-muted">From: {s.sender}</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-white">{s.weight}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedShipment(s)}
                      className="px-3 py-1 bg-surface-elevated hover:bg-surface-hover border border-surface-border rounded-lg text-2xs font-bold text-accent"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Shipment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-dark/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 space-y-4 border-2 border-accent/40 shadow-card-hover">
            <div className="flex justify-between items-center border-b border-surface-border pb-3">
              <h3 className="text-lg font-bold text-white">Create New Inter-Island Shipment</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateShipment} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-text-muted uppercase">Origin Hub</label>
                <input
                  type="text"
                  required
                  value={newForm.origin}
                  onChange={(e) => setNewForm({ ...newForm, origin: e.target.value })}
                  placeholder="e.g. North Harbor, Tondo, Manila"
                  className="w-full mt-1 px-3 py-2 bg-surface-elevated border border-surface-border rounded-lg text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-muted uppercase">Destination Terminal</label>
                <input
                  type="text"
                  required
                  value={newForm.destination}
                  onChange={(e) => setNewForm({ ...newForm, destination: e.target.value })}
                  placeholder="e.g. Sasa Port, Davao City"
                  className="w-full mt-1 px-3 py-2 bg-surface-elevated border border-surface-border rounded-lg text-sm text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-text-muted uppercase">Sender</label>
                  <input
                    type="text"
                    required
                    value={newForm.sender}
                    onChange={(e) => setNewForm({ ...newForm, sender: e.target.value })}
                    placeholder="San Miguel Corp"
                    className="w-full mt-1 px-3 py-2 bg-surface-elevated border border-surface-border rounded-lg text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-muted uppercase">Receiver</label>
                  <input
                    type="text"
                    required
                    value={newForm.receiver}
                    onChange={(e) => setNewForm({ ...newForm, receiver: e.target.value })}
                    placeholder="Visayas Depot"
                    className="w-full mt-1 px-3 py-2 bg-surface-elevated border border-surface-border rounded-lg text-sm text-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-text-muted uppercase">Transport Mode</label>
                <select
                  value={newForm.mode}
                  onChange={(e) => setNewForm({ ...newForm, mode: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-surface-elevated border border-surface-border rounded-lg text-sm text-white"
                >
                  <option value="multimodal">Multimodal (Road + RoRo Sea)</option>
                  <option value="sea">Sea Cargo Freight</option>
                  <option value="air">Domestic Air Cargo</option>
                  <option value="road">Road Express Trucking</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold rounded-lg text-sm shadow-glow-teal mt-2"
              >
                Dispatch Shipment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Shipment Details Drawer Modal */}
      {selectedShipment && (
        <div className="fixed inset-0 z-50 bg-dark/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full p-6 space-y-4 border-2 border-brand-500/40">
            <div className="flex justify-between items-center border-b border-surface-border pb-3">
              <div>
                <span className="font-mono text-xs text-accent">{selectedShipment.trackingNumber}</span>
                <h3 className="text-base font-bold text-white">Shipment Tracking Lifecycle</h3>
              </div>
              <button onClick={() => setSelectedShipment(null)} className="text-text-muted hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 bg-surface-elevated/40 rounded-lg">
                <div><span className="text-text-muted block">Origin</span><span className="font-bold text-white">{selectedShipment.origin}</span></div>
                <div><span className="text-text-muted block">Destination</span><span className="font-bold text-white">{selectedShipment.destination}</span></div>
              </div>
              <div className="p-3 bg-surface-elevated/40 rounded-lg space-y-1">
                <span className="text-text-muted block font-semibold">Consignee Details</span>
                <p className="text-white font-bold">{selectedShipment.receiver}</p>
                <p className="text-text-muted">Shipper: {selectedShipment.sender}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedShipment(null)}
              className="w-full py-2 bg-surface-elevated hover:bg-surface-hover text-white font-bold rounded-lg text-xs"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
