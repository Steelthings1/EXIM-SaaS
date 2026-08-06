// EXIM.IM SaaS Platform - Compliance API: HS Code Natural Language Classification
import { classifyProductDescription } from '@/lib/ai/hs-classifier';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { description, country } = body;

    if (!description) {
      return Response.json({ success: false, error: 'Product description is required' }, { status: 400 });
    }

    const result = await classifyProductDescription(description, country || 'IND');

    return Response.json({
      success: true,
      data: result
    });
  } catch (error) {
    return Response.json({ success: false, error: 'HS classification failed' }, { status: 500 });
  }
}
