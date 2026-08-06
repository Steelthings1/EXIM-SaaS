// EXIM.IM SaaS Platform - Copilot Chat API Endpoint
import { processCopilotQuery, CopilotChatInput } from '@/lib/multimodal-copilot-engine';

export async function POST(request: Request) {
  try {
    const body: CopilotChatInput = await request.json();
    const result = processCopilotQuery(body);

    return Response.json({
      success: true,
      message: 'Copilot Document RAG & Voice query processed',
      data: result
    }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, error: 'Copilot query failed' }, { status: 500 });
  }
}
