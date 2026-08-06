// EXIM.IM SaaS Platform - Multi-Modal AI Copilot API Endpoint
import { processCopilotQuery, CopilotRequestPayload } from '@/lib/ai-copilot-engine';

export async function POST(request: Request) {
  try {
    const body: CopilotRequestPayload = await request.json();

    if (!body.queryType) {
      return Response.json({ success: false, error: 'queryType is required (DOCUMENT_RAG, VOICE_COMMAND, LABEL_VISION_SCANNER)' }, { status: 400 });
    }

    const copilotResult = processCopilotQuery(body);

    return Response.json({
      success: true,
      message: 'AI Copilot query processed successfully',
      data: copilotResult
    });
  } catch (error) {
    return Response.json({ success: false, error: 'AI Copilot processing failed' }, { status: 500 });
  }
}
