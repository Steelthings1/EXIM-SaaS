// EXIM.IM SaaS Platform - e-Scrip Ledger API Endpoint
import { utilizeEscripCredit, EscripUtilizeInput } from '@/lib/export-incentive-engine';

export async function GET(request: Request) {
  const sampleLedger = [
    {
      escrip_id: 'esc-101',
      scroll_number: 'SCRL-ICEGATE-2026-88123',
      scheme_type: 'RODTEP',
      issued_credit_inr: 57281.00,
      utilized_credit_inr: 20000.00,
      available_balance_inr: 37281.00,
      expiration_date: '2027-02-03',
      created_at: '2026-02-03T10:30:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleLedger.length, data: sampleLedger });
}

export async function POST(request: Request) {
  try {
    const body: EscripUtilizeInput = await request.json();
    const result = utilizeEscripCredit(57281.00, body);

    return Response.json({
      success: true,
      message: 'e-Scrip credit duty offset applied against import Bill of Entry',
      data: result
    }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, error: 'e-Scrip utilization failed' }, { status: 500 });
  }
}
