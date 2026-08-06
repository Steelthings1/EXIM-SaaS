// EXIM.IM SaaS Platform - 26-Step Pipeline Tracker API Endpoint
import { advancePipelineStage, PIPELINE_STAGES_26, PipelineInstanceState } from '@/lib/workflow-engine';

export async function GET(request: Request) {
  const activePipelines: PipelineInstanceState[] = [
    {
      orderNumber: 'EXIM-2026-9041',
      currentStepIndex: 12,
      currentStage: PIPELINE_STAGES_26[11], // Stage 12: Shipping Bill Filed
      progressPct: 48.0,
      history: [
        { stepIndex: 1, stageCode: 'INQUIRY_LEAD', completedAt: '2026-01-10T08:00:00Z' },
        { stepIndex: 4, stageCode: 'CONTRACT_EXECUTED', completedAt: '2026-01-15T10:30:00Z' },
        { stepIndex: 10, stageCode: 'WAREHOUSE_STAGED', completedAt: '2026-02-01T14:00:00Z' }
      ]
    }
  ];

  return Response.json({ success: true, count: activePipelines.length, data: activePipelines });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { currentState } = body;

    if (!currentState || !currentState.currentStepIndex) {
      return Response.json({ success: false, error: 'currentState with currentStepIndex is required' }, { status: 400 });
    }

    const updatedState = advancePipelineStage(currentState);

    return Response.json({
      success: true,
      message: `Trade pipeline advanced to Stage ${updatedState.currentStepIndex}: ${updatedState.currentStage.stageName}`,
      data: updatedState
    });
  } catch (error) {
    return Response.json({ success: false, error: 'Pipeline advancement failed' }, { status: 500 });
  }
}
