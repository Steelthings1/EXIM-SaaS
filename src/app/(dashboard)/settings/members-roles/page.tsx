"use client";

import React, { useState } from 'react';
import { Users, UserPlus, Shield, CheckCircle2, Lock, Eye, Sparkles, Filter } from 'lucide-react';
import { ROLE_DEFINITIONS, AppRole } from '@/lib/rbac';

export default function MembersRolesPage() {
  const [members, setMembers] = useState([
    {
      id: '1',
      name: 'Vikramaditya Singhania',
      email: 'owner@apexexim.com',
      role: 'ORG_OWNER' as AppRole,
      status: 'ACTIVE',
      joinedAt: '2025-01-15',
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'export.mgr@apexexim.com',
      role: 'EXPORT_MANAGER' as AppRole,
      status: 'ACTIVE',
      joinedAt: '2025-02-01',
    },
    {
      id: '3',
      name: 'Rajesh Verma',
      email: 'compliance@apexexim.com',
      role: 'COMPLIANCE_OFFICER' as AppRole,
      status: 'ACTIVE',
      joinedAt: '2025-02-10',
    },
    {
      id: '4',
      name: 'Anil Kumar',
      email: 'cha.broker@customspartners.in',
      role: 'CUSTOMS_BROKER' as AppRole,
      status: 'ACTIVE',
      joinedAt: '2025-03-01',
    }
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newInvite, setNewInvite] = useState({
    email: '',
    fullName: '',
    role: 'EXPORT_MANAGER' as AppRole
  });

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMembers([
      ...members,
      {
        id: `mem-${Date.now()}`,
        name: newInvite.fullName || newInvite.email.split('@')[0],
        email: newInvite.email,
        role: newInvite.role,
        status: 'INVITED',
        joinedAt: new Date().toISOString().split('T')[0]
      }
    ]);
    setShowInviteModal(false);
    setNewInvite({ email: '', fullName: '', role: 'EXPORT_MANAGER' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Users className="w-7 h-7 text-indigo-400" />
              Members & Granular RBAC Permissions Matrix
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Invite internal trade team members and external Customs Brokers (CHA), Freight Forwarders, and Trade Auditors across 19 RBAC roles.
            </p>
          </div>

          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite Team Member / External Partner</span>
          </button>
        </div>

        {/* Directory Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-400" />
              Active Organization Directory ({members.length})
            </span>
            <span className="text-xs text-slate-500">19 Role RBAC Engine Active</span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {members.map((member) => {
              const roleInfo = ROLE_DEFINITIONS[member.role];
              return (
                <div key={member.id} className="p-4 flex items-center justify-between hover:bg-slate-850/50 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-slate-800 text-white flex items-center justify-center font-bold text-sm">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-100 text-sm">{member.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          member.status === 'ACTIVE'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {member.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">{member.email}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-indigo-950/80 border border-indigo-800/50 text-indigo-300 text-xs font-semibold rounded-lg">
                      {roleInfo ? roleInfo.title : member.role}
                    </span>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Joined {member.joinedAt}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-400" />
                Invite Trade Member / External Partner
              </h2>

              <form onSubmit={handleInviteSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={newInvite.fullName}
                    onChange={(e) => setNewInvite({ ...newInvite, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={newInvite.email}
                    onChange={(e) => setNewInvite({ ...newInvite, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Select RBAC Trade Role (19 Roles Available)</label>
                  <select
                    value={newInvite.role}
                    onChange={(e) => setNewInvite({ ...newInvite, role: e.target.value as AppRole })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  >
                    {Object.values(ROLE_DEFINITIONS).map((def) => (
                      <option key={def.code} value={def.code}>
                        {def.title} [{def.category}]
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg text-xs"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
