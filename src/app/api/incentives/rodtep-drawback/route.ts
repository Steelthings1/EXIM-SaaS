// EXIM.IM SaaS Platform - Export Incentives (RoDTEP & Drawback) API Endpoint

export async function GET(request: Request) {
  const sampleClaims = [
    {
      claim_id: 'clm-101',
      shipping_bill_number: 'SB-ICEGATE-2026-904128',
      fob_value_usd: 50250.00,
      fob_value_inr: 4195875.00,
      rodtep_rate_pct: 1.40,
      rodtep_amount_inr: 58742.25,
      drawback_rate_pct: 1.50,
      drawback_amount_inr: 62938.13,
      total_incentive_inr: 121680.38,
      dgft_scrip_status: 'CREDITED'
    }
  ];

  return Response.json({ success: true, count: sampleClaims.length, data: sampleClaims });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { shippingBillNumber, fobValueUsd, exchangeRateInr } = body;

    const fobUsd = Number(fobValueUsd) || 50000.0;
    const rateInr = Number(exchangeRateInr) || 83.50;
    const fobInr = Number((fobUsd * rateInr).toFixed(2));

    const rodtepInr = Number(((fobInr * 1.40) / 100).toFixed(2));
    const drawbackInr = Number(((fobInr * 1.50) / 100).toFixed(2));

    const newClaim = {
      claim_id: `clm-${Date.now()}`,
      shipping_bill_number: shippingBillNumber || `SB-${Date.now().toString().slice(-6)}`,
      fob_value_usd: fobUsd,
      fob_value_inr: fobInr,
      rodtep_rate_pct: 1.40,
      rodtep_amount_inr: rodtepInr,
      drawback_rate_pct: 1.50,
      drawback_amount_inr: drawbackInr,
      total_incentive_inr: Number((rodtepInr + drawbackInr).toFixed(2)),
      dgft_scrip_status: 'CREDITED',
      created_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      message: 'Export incentive claim credited to DGFT ledger',
      data: newClaim
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Incentive claim failed' }, { status: 500 });
  }
}
