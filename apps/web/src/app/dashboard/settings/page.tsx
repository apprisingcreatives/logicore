'use client';

import { Building2, Key, Users, Bell, Shield, Database } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Organization Settings</h1>
        <p className="text-sm text-text-secondary mt-1">
          Manage tenant profile, security policies, API credentials, and team role permissions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-5 space-y-3 border-l-4 border-l-brand-500">
          <Building2 className="w-6 h-6 text-brand-400" />
          <h3 className="font-bold text-text-primary text-base">Tenant Organization</h3>
          <p className="text-xs text-text-muted">Domain, logo, TIN, & government accreditation codes</p>
        </div>

        <div className="glass-card p-5 space-y-3 border-l-4 border-l-teal-500">
          <Users className="w-6 h-6 text-teal-400" />
          <h3 className="font-bold text-text-primary text-base">Team & Access Control</h3>
          <p className="text-xs text-text-muted">Manage 9 predefined RBAC roles & user seat licenses</p>
        </div>

        <div className="glass-card p-5 space-y-3 border-l-4 border-l-amber-500">
          <Key className="w-6 h-6 text-amber-400" />
          <h3 className="font-bold text-text-primary text-base">API Keys & Webhooks</h3>
          <p className="text-xs text-text-muted">EMQX MQTT broker keys, Semaphore SMS, & BOC endpoints</p>
        </div>
      </div>
    </div>
  );
}
