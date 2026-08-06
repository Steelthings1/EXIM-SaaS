"use client";

import React, { useState } from 'react';
import { MapPin, Warehouse, Anchor, Plus, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function BranchWarehouseRegistryPage() {
  const [branches, setBranches] = useState([
    {
      id: 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
      code: 'HQ-MUM',
      name: 'Mumbai Head Office & Port Hub',
      portCode: 'INNSA1',
      isHeadOffice: true,
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'IND',
      postalCode: '400051',
      warehouses: [
        {
          id: 'w-1',
          name: 'Nhava Sheva Bonded Customs Warehouse #1',
          type: 'BONDED_CUSTOMS',
          icdCode: 'INNSA1',
          isBonded: true,
          capacity: '45,000 sq ft',
          registrationNo: 'CUS-BOND-2024-MH-9982'
        }
      ]
    },
    {
      id: 'd4e5f6a7-b89c-0d1e-2f3a-4b5c6d7e8f9a',
      code: 'BR-DEL',
      name: 'Delhi Inland Container Depot Branch',
      portCode: 'INTKD6',
      isHeadOffice: false,
      city: 'New Delhi',
      state: 'Delhi',
      country: 'IND',
      postalCode: '110020',
      warehouses: [
        {
          id: 'w-2',
          name: 'Tughlakabad ICD Freight Terminal Warehouse',
          type: 'INLAND_CONTAINER_DEPOT',
          icdCode: 'INTKD6',
          isBonded: true,
          capacity: '75,000 sq ft',
          registrationNo: 'ICD-TKD-DEPOT-041'
        }
      ]
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newBranch, setNewBranch] = useState({
    code: '',
    name: '',
    portCode: '',
    city: '',
    state: '',
    country: 'IND',
    postalCode: ''
  });

  const handleAddBranch = (e: React.FormEvent) => {
    e.preventDefault();
    setBranches([
      ...branches,
      {
        id: `br-${Date.now()}`,
        code: newBranch.code.toUpperCase(),
        name: newBranch.name,
        portCode: newBranch.portCode.toUpperCase() || 'INMAA1',
        isHeadOffice: false,
        city: newBranch.city,
        state: newBranch.state,
        country: newBranch.country,
        postalCode: newBranch.postalCode,
        warehouses: []
      }
    ]);
    setShowAddModal(false);
    setNewBranch({ code: '', name: '', portCode: '', city: '', state: '', country: 'IND', postalCode: '' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Warehouse className="w-7 h-7 text-indigo-400" />
              Branch & Warehouse Registry
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage operating branch locations, Inland Container Depots (ICD), seaport codes, and bonded customs warehouses.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Register Branch / Warehouse</span>
          </button>
        </div>

        {/* Branch Cards */}
        <div className="space-y-6">
          {branches.map((branch) => (
            <div key={branch.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-bold text-white">{branch.name}</h2>
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-slate-800 text-indigo-300 border border-slate-700">
                        {branch.code}
                      </span>
                      {branch.isHeadOffice && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          HEAD OFFICE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {branch.city}, {branch.state}, {branch.country} ({branch.postalCode})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                  <Anchor className="w-4 h-4 text-indigo-400" />
                  <span>Port/ICD Code: <strong className="text-indigo-300">{branch.portCode}</strong></span>
                </div>
              </div>

              {/* Associated Warehouses */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Warehouse className="w-3.5 h-3.5 text-indigo-400" />
                  Associated Customs Warehouses ({branch.warehouses.length})
                </h3>

                {branch.warehouses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {branch.warehouses.map((wh) => (
                      <div key={wh.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-slate-200">{wh.name}</span>
                          {wh.isBonded && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              CUSTOMS BONDED
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 font-mono">
                          <div>ICD Code: <span className="text-slate-200">{wh.icdCode}</span></div>
                          <div>Capacity: <span className="text-slate-200">{wh.capacity}</span></div>
                        </div>
                        <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-900">
                          Customs Reg: {wh.registrationNo}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No warehouses registered for this branch office yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-5">
              <h2 className="text-lg font-bold text-white">Register New Operating Branch</h2>

              <form onSubmit={handleAddBranch} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Branch Code (e.g., BR-CHE)</label>
                  <input
                    type="text"
                    required
                    value={newBranch.code}
                    onChange={(e) => setNewBranch({ ...newBranch, code: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Branch Name</label>
                  <input
                    type="text"
                    required
                    value={newBranch.name}
                    onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Port/ICD Code (e.g., INMAA1)</label>
                    <input
                      type="text"
                      value={newBranch.portCode}
                      onChange={(e) => setNewBranch({ ...newBranch, portCode: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={newBranch.city}
                      onChange={(e) => setNewBranch({ ...newBranch, city: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg text-xs"
                  >
                    Save Branch
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
