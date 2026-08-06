// EXIM.IM SaaS Platform - LC Auditor V3 API Endpoint
import { auditLcPresentation, LcAuditInput } from '@/lib/banking-auditor-engine';

export async function GET(request: Request) {
  const sampleAudits = [
    {
      audit_id: 'aud-101',
      lc_number: 'LC-DB-2026-9041',
      issuing_bank: 'Emirates NBD Dubai',
      advising_bank: 'State Bank of India',
      lc_amount_usd: 50000.00,
      invoice_amount_usd: 49000.00,
      is_compliant: true,
      discrepancies: [],
      audit_status: 'COMPLIANT_READY_FOR_PRESENTATION',
      created_at: '2026-01-25T14:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleAudits.length, data: sampleAudits });
}

export async function POST(request: Request) {
  try {
    const body: LcAuditInput = await request.json();
    const result = auditLcPresentation(body);

    return Response.json({
      success: true,
      message: 'UCP 600 Letter of Credit pre-presentation audit completed',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'LC presentation audit failed' }, { status: 500 });
  }
}
