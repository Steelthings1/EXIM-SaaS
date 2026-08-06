// EXIM.IM SaaS Platform - Satellite AIS Vessel Tracking Telemetry API Endpoint
import { getVesselAisTelemetryTrail } from '@/lib/ais-tracking-engine';

export async function GET(request: Request) {
  const trail = getVesselAisTelemetryTrail('BKG-MAERSK-2026-9041', 'MAERSK MC-KINNEY MOLLER');
  return Response.json({ success: true, count: trail.length, data: trail });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookingReference, vesselName } = body;

    const trail = getVesselAisTelemetryTrail(
      bookingReference || 'BKG-MAERSK-2026-9041',
      vesselName || 'MAERSK MC-KINNEY MOLLER'
    );

    return Response.json({
      success: true,
      message: 'Satellite AIS Telemetry events fetched',
      data: trail
    });
  } catch (error) {
    return Response.json({ success: false, error: 'AIS tracking query failed' }, { status: 500 });
  }
}
