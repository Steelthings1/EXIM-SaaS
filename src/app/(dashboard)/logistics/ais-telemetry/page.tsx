"use client";

import React, { useState } from 'react';
import { Satellite, Compass, Navigation, Clock, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { processAisTelemetry, AisPositionResult } from '@/lib/ais-telemetry-engine';

export default function AisTelemetryPage() {
  const [mmsi, setMmsi] = useState('636019284');
  const [vessel, setVessel] = useState('MSC Oscar');
  const [lat, setLat] = useState(18.9500);
  const [lng, setLng] = useState(72.9500);
  const [speed, setSpeed] = useState(16.4);
  const [heading, setHeading] = useState(245);
  const [dest, setDest] = useState('Hamburg (DEHAM)');
  const [eta, setEta] = useState('2026-02-20T14:00');
  const [result, setResult] = useState<AisPositionResult | null>(null);

  const [vessels, setVessels] = useState([
    {
      id: 'v-101',
      mmsi: '636019284',
      name: 'MSC Oscar',
      lat: 18.9500,
      lng: 72.9500,
      speed: 16.4,
      heading: 245,
      dest: 'Hamburg (DEHAM)',
      eta: '2026-02-20 14:00',
      status: 'UNDERWAY_USING_ENGINE'
    }
  ]);

  const handleUpdateTelemetry = () => {
    const res = processAisTelemetry({
      mmsi,
      vesselName: vessel,
      latitude: lat,
      longitude: lng,
      speedKnots: speed,
      headingDegrees: heading,
      destinationPort: dest,
      destinationEta: eta
    });
    setResult(res);

    setVessels([
      {
        id: `v-${Date.now()}`,
        mmsi,
        name: vessel,
        lat,
        lng,
        speed,
        heading,
        dest,
        eta,
        status: res.navigationalStatus
      },
      ...vessels
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Satellite className="w-7 h-7 text-indigo-400" />
            Real-Time Satellite AIS Vessel Telemetry Map
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Live ocean vessel positioning, MMSI tracking, speed in knots, compass heading, and destination ETA predictions.
          </p>
        </div>

        {/* Live Telemetry Inputs */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Update Satellite AIS Vessel Signal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">MMSI Identifier</label>
              <input
                type="text"
                value={mmsi}
                onChange={(e) => setMmsi(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Vessel Name</label>
              <input
                type="text"
                value={vessel}
                onChange={(e) => setVessel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Latitude</label>
              <input
                type="number"
                step="0.0001"
                value={lat}
                onChange={(e) => setLat(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Longitude</label>
              <input
                type="number"
                step="0.0001"
                value={lng}
                onChange={(e) => setLng(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Speed (Knots)</label>
              <input
                type="number"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Heading (° Deg)</label>
              <input
                type="number"
                value={heading}
                onChange={(e) => setHeading(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Destination Port</label>
              <input
                type="text"
                value={dest}
                onChange={(e) => setDest(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Destination ETA</label>
              <input
                type="datetime-local"
                value={eta}
                onChange={(e) => setEta(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <button
            onClick={handleUpdateTelemetry}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
          >
            <Satellite className="w-4 h-4 text-emerald-400" />
            <span>Update Satellite AIS Telemetry Signal</span>
          </button>
        </div>

        {/* Live Vessels Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Tracked Ocean Vessels (Satellite AIS Live)
          </h2>

          <div className="space-y-3">
            {vessels.map((v) => (
              <div key={v.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{v.name} (MMSI: {v.mmsi})</h3>
                  <p className="text-slate-400 font-sans mt-0.5">Destination: {v.dest}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Position</span>
                    <span className="text-slate-200">{v.lat.toFixed(4)}°N, {v.lng.toFixed(4)}°E</span>
                  </div>

                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Speed / Heading</span>
                    <span className="text-emerald-400 font-bold">{v.speed} Knots &bull; {v.heading}°</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                    {v.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
