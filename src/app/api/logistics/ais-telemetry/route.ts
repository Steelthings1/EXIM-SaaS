// EXIM.IM SaaS Platform - AIS Telemetry API Endpoint
import { processAisTelemetry, AisPositionInput } from '@/lib/ais-telemetry-engine';

export async function GET(request: Request) {
  const sampleVessels = [
    {
      mmsi: '636019284',
      vessel_name: 'MSC Oscar',
      latitude: 18.9500,
      longitude: 72.9500,
      speed_knots: 16.4,
      heading_degrees: 245,
      destination_port: 'Hamburg (DEHAM)',
      destination_eta: '2026-02-20T14:00:00Z',
      navigational_status: 'UNDERWAY_USING_ENGINE'
    }
  ];

  return Response.json({ success: true, count: sampleVessels.length, data: sampleVessels });
}

export async function POST(request: Request) {
  try {
    const body: AisPositionInput = await request.json();
    const result = processAisTelemetry(body);

    return Response.json({
      success: true,
      message: 'Satellite AIS vessel telemetry position updated',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'AIS telemetry parsing failed' }, { status: 500 });
  }
}
