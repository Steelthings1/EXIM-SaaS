// EXIM.IM SaaS Platform - Export Incentive Realization API Endpoint
import { calculateExportIncentives, IncentiveClaimInput } from '@/lib/trade-finance-engine';

export async function GET(request: Request) {
  const sampleClaims = [
    {
      claim_id: 'claim-101',
      claim_number: 'CLM-INC-2026-9041',
      shipping_bill_number: 'SB-INNSA-904128',
      fob_value_inr: 4091500.00,
      rodtep_rate_pct: 1.40,
      rodtep_amount_inr: 57281.00,
      drawback_rate_pct: 1.50,
      drawback_amount_inr: 61372.50,
      total_incentive_inr: 118653.50,
      status: 'SCROLL_GENERATED',
      created_at: '2026-02-15T14:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleClaims.length, data: sampleClaims });
}

export async function POST(request: Request) {
  try {
    const body: IncentiveClaimInput = await request.json();
    const result = calculateExportIncentives(body);

    return Response.json({
      success: true,
      message: 'Export incentives (RoDTEP & Duty Drawback) calculated and e-scrip scroll generated',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Export incentive calculation failed' }, { status: 500 });
  }
}
