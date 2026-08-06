// EXIM.IM SaaS Platform - Compliance API: Fuzzy Sanctions Screener
import { screenEntity } from '@/lib/compliance/sanctions-screener';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { entityName, thresholdScore } = body;

    if (!entityName) {
      return Response.json({ success: false, error: 'entityName is required' }, { status: 400 });
    }

    const result = screenEntity(entityName, thresholdScore ? Number(thresholdScore) : 0.70);

    return Response.json({
      success: true,
      data: result
    });
  } catch (error) {
    return Response.json({ success: false, error: 'Sanctions screening failed' }, { status: 500 });
  }
}
