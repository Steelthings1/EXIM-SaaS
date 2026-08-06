"use client";

import React, { useState } from 'react';
import { Compass, Satellite, MapPin, CheckCircle2, Clock, Navigation } from 'lucide-react';
import { getVesselAisTelemetryTrail, AisTrackingEvent } from '@/lib/ais-tracking-engine';

export default function SatelliteAisTrackingPage() {
  const [bookingRef, setBookingRef] = useState('BKG-MAERSK-2026-9041');
  const telemetry: AisTrackingEvent[] = getVesselAisTelemetryTrail(bookingRef);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Satellite className="w-7 h-7 text-indigo-400" />
              Satellite AIS Vessel Live Telemetry & Tracking Map
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Real-time satellite GPS vessel positioning, port gate-in timestamps, berth arrival events, and ocean speed knots telemetry.
            </p>
          </div>
        </div>

        {/* Telemetry Summary Banner */}
        <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs text-indigo-400 font-mono font-bold block uppercase">Tracking Booking Ref: {bookingRef}</span>
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-1">
                <Navigation className="w-5 h-5 text-emerald-400" />
                MAERSK MC-KINNEY MOLLER (IMO 9632064)
              </h2>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live AIS Ping: 17.8 Knots (Gulf of Oman)
              </span>
            </div>
          </div>
        </div>

        {/* Telemetry Events Trail Timeline */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-400" />
            Satellite Telemetry Trail
          </h3>

          <div className="space-y-4">
            {telemetry.map((evt, idx) => (
              <div key={evt.eventId} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between font-bold text-indigo-300">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    {evt.milestoneName}
                  </span>
                  <span className="text-slate-500">{new Date(evt.eventTimestamp).toUTCString()}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-slate-300 pt-1">
                  <div>
                    <span className="text-slate-500 block text-[10px] font-sans">Location / Port</span>
                    <span>{evt.portName}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] font-sans">GPS Coordinates</span>
                    <span>{evt.latitude}&deg;N, {evt.longitude}&deg;E</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] font-sans">Vessel Speed</span>
                    <span className="text-emerald-400 font-bold">{evt.speedKnots} Knots</span>
                  </div>
                </div>

                <p className="text-slate-400 font-sans text-[11px] border-t border-slate-900 pt-1">{evt.statusMessage}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
