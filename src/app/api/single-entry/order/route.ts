// EXIM.IM SaaS Platform - Single-Entry Master Order API Endpoint
import { calculateSingleEntryOrder, SingleEntryOrderPayload } from '@/lib/single-entry-engine';
import { analyzeTradeOrderIntegrity } from '@/lib/ai/doc-intelligence';

export async function POST(request: Request) {
  try {
    const payload: SingleEntryOrderPayload = await request.json();

    if (!payload.orderNumber || !payload.items || payload.items.length === 0) {
      return Response.json({ success: false, error: 'orderNumber and items array are required' }, { status: 400 });
    }

    const calcResult = calculateSingleEntryOrder(payload);
    const intelligenceReport = analyzeTradeOrderIntegrity(payload);

    return Response.json({
      success: true,
      data: {
        order: calcResult,
        docIntelligence: intelligenceReport
      }
    });
  } catch (error) {
    return Response.json({ success: false, error: 'Single entry order processing failed' }, { status: 500 });
  }
}
