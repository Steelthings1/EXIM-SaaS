// EXIM.IM SaaS Platform - Incentive Claims V3 API Endpoint
import { calculateIncentiveClaim, IncentiveClaimInput } from '@/lib/export-incentive-engine';

export async function GET(request: Request) {
  const sampleClaims = [
    {
      claim_id: 'clm-101',
      claim_number: 'CLM-DGFT-2026-9041',
      shipping_bill_number: 'SB-INNSA-904128',
      scheme_type: 'RODTEP',
      fob_value_inr: 4091500.00,
      incentive_rate_pct: 1.40,
      claim_amount_inr: 57281.00,
      scroll_number: 'SCRL-ICEGATE-2026-88123',
      claim_status: 'SCROLL_ISSUED',
      created_at: '2026-02-03T10:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleClaims.length, data: sampleClaims });
}

export async function POST(request: Request) {
  try {
    const body: IncentiveClaimInput = await request.json();
    const result = calculateIncentiveClaim(body);

    return Response.json({
      success: true,
      message: 'Export incentive claim calculated and e-scrip scroll generated',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Incentive claim calculation failed' }, { status: 500 });
  }
}
