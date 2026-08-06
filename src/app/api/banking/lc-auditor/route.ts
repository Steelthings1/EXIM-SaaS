// EXIM.IM SaaS Platform - LC Auditor API Endpoint
import { auditLcPresentation, LcAuditInput } from '@/lib/trade-finance-engine';

export async function GET(request: Request) {
  const sampleLcs = [
    {
      lc_id: 'lc-101',
      lc_number: 'LC-DB-2026-9041',
      issuing_bank: 'Deutsche Bank AG (Frankfurt)',
      advising_bank: 'State Bank of India (Mumbai)',
      lc_amount_usd: 50000.00,
      invoice_amount_usd: 49000.00,
      discrepancy_count: 0,
      discrepancies: [],
      status: 'AUDITED_COMPLIANT',
      created_at: '2026-02-05T10:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleLcs.length, data: sampleLcs });
}

export async function POST(request: Request) {
  try {
    const body: LcAuditInput = await request.json();
    const result = auditLcPresentation(body);

    return Response.json({
      success: true,
      message: 'Letter of Credit UCP 600 audit completed',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'LC audit failed' }, { status: 500 });
  }
}
