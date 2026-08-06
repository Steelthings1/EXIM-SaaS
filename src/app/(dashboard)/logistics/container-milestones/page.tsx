"use client";

import React, { useState } from 'react';
import { Package, CheckCircle2, Clock, MapPin, AlertCircle, ArrowRight } from 'lucide-react';
import { recordContainerMilestone, ContainerMilestoneResult, MilestoneType } from '@/lib/ais-telemetry-engine';

export default function ContainerMilestonesPage() {
  const [container, setContainer] = useState('MSCU-9041285');
  const [milestone, setMilestone] = useState<MilestoneType>('LOADED_ON_VESSEL');
  const [location, setLocation] = useState('Nhava Sheva Port (INNSA Terminal 2)');
  const [notes, setNotes] = useState('Container loaded on MSC Oscar (Voyage 2604W). Cell position 14-02-08.');
  const [result, setResult] = useState<ContainerMilestoneResult | null>(null);

  const [milestones, setMilestones] = useState([
    {
      id: 'm-101',
      container: 'MSCU-9041285',
      event: 'LOADED_ON_VESSEL',
      location: 'Nhava Sheva Port (INNSA Terminal 2)',
      timestamp: '2026-02-05 09:30',
      notes: 'Container loaded on MSC Oscar (Voyage 2604W). Cell position 14-02-08.',
      stage: 2
    },
    {
      id: 'm-100',
      container: 'MSCU-9041285',
      event: 'GATE_IN',
      location: 'Nhava Sheva Port Gate 4',
      timestamp: '2026-02-04 16:15',
      notes: 'Gate-in verified with customs seal inspection passed.',
      stage: 1
    }
  ]);

  const handleRecordMilestone = () => {
    const res = recordContainerMilestone({
      containerNumber: container,
      milestoneEvent: milestone,
      locationName: location,
      notes
    });
    setResult(res);

    setMilestones([
      {
        id: `m-${Date.now()}`,
        container,
        event: milestone,
        location,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        notes,
        stage: res.pipelineStage
      },
      ...milestones
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Package className="w-7 h-7 text-indigo-400" />
            Container Milestone Pipeline & Event Timeline Ledger
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track container milestones: Gate-In, Loaded on Vessel, Departed Port, Transshipment, Arrived Port, Customs Hold, and Out of Charge.
          </p>
        </div>

        {/* Input Panel */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Record Container Milestone Event
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Container Number</label>
              <input
                type="text"
                value={container}
                onChange={(e) => setContainer(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Milestone Pipeline Stage</label>
              <select
                value={milestone}
                onChange={(e) => setMilestone(e.target.value as MilestoneType)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              >
                <option value="GATE_IN">1. Gate-In at Terminal</option>
                <option value="LOADED_ON_VESSEL">2. Loaded on Vessel</option>
                <option value="DEPARTED_PORT">3. Departed Port</option>
                <option value="TRANSSHIPMENT">4. Transshipment Hub</option>
                <option value="ARRIVED_PORT">5. Arrived Destination Port</option>
                <option value="CUSTOMS_HOLD">6. Customs Hold / Inspection</option>
                <option value="OUT_OF_CHARGE">7. Out of Charge / Gate-Out</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Location Name</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-sans mb-1 text-xs">Event Notes & Remarks</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs"
            />
          </div>

          <button
            onClick={handleRecordMilestone}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Record Container Event to Milestone Ledger</span>
          </button>
        </div>

        {/* Milestone Events List */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Container Milestone Event Timeline
          </h2>

          <div className="space-y-3">
            {milestones.map((m) => (
              <div key={m.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-white font-mono">{m.container} &bull; Stage {m.stage}/7</h3>
                  <span className="px-2.5 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {m.event}
                  </span>
                </div>

                <p className="text-slate-300 font-sans text-xs">{m.notes}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Location: {m.location}</span>
                  <span>Timestamp: {m.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
