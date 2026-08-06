// EXIM.IM SaaS Platform - LC Checker UCP 600 API Endpoint
import { auditLetterOfCredit } from '@/lib/lc-checker-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lc, docs } = body;

    if (!lc || !docs) {
      return Response.json({ success: false, error: 'lc and docs payloads are required' }, { status: 400 });
    }

    const auditResult = auditLetterOfCredit(lc, docs);

    return Response.json({
      success: true,
      message: 'LC UCP 600 Discrepancy Audit Completed',
      data: auditResult
    });
  } catch (error) {
    return Response.json({ success: false, error: 'LC audit failed' }, { status: 500 });
  }
}
