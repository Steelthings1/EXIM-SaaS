// EXIM.IM SaaS Platform - Container Milestones API Endpoint
import { recordContainerMilestone, ContainerMilestoneInput } from '@/lib/ais-telemetry-engine';

export async function GET(request: Request) {
  const sampleEvents = [
    {
      event_id: 'evt-101',
      container_number: 'MSCU-9041285',
      milestone_event: 'LOADED_ON_VESSEL',
      location_name: 'Nhava Sheva Port (INNSA Terminal 2)',
      event_timestamp: '2026-02-05T09:30:00Z',
      notes: 'Container loaded on MSC Oscar (Voyage 2604W). Cell position 14-02-08.',
      pipeline_stage: 2
    }
  ];

  return Response.json({ success: true, count: sampleEvents.length, data: sampleEvents });
}

export async function POST(request: Request) {
  try {
    const body: ContainerMilestoneInput = await request.json();
    const result = recordContainerMilestone(body);

    return Response.json({
      success: true,
      message: 'Container milestone event logged successfully',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Container milestone logging failed' }, { status: 500 });
  }
}
