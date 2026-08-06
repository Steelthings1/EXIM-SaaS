// EXIM.IM SaaS Platform - Marine Cargo Insurance API Endpoint

export async function GET(request: Request) {
  const samplePolicies = [
    {
      policy_id: 'pol-101',
      policy_number: 'POL-ICICI-2026-8810',
      insurer_name: 'ICICI Lombard General Insurance Co Ltd',
      coverage_clause: 'INSTITUTE_CARGO_CLAUSES_A', // All-Risks Coverage
      cif_valuation_usd: 50250.00,
      sum_insured_usd: 55275.00, // 110% of CIF Valuation
      premium_rate_pct: 0.25, // 0.25%
      total_premium_usd: 138.19,
      status: 'ACTIVE'
    }
  ];

  return Response.json({ success: true, count: samplePolicies.length, data: samplePolicies });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cifValuationUsd, premiumRatePct, insurerName, coverageClause } = body;

    const cif = Number(cifValuationUsd) || 50000.0;
    const sumInsured = Number((cif * 1.10).toFixed(2)); // 110% CIF Math
    const ratePct = Number(premiumRatePct) || 0.25;
    const totalPremium = Number(((sumInsured * ratePct) / 100).toFixed(2));

    const newPolicy = {
      policy_id: `pol-${Date.now()}`,
      policy_number: `POL-MAR-${Date.now().toString().slice(-6)}`,
      insurer_name: insurerName || 'ICICI Lombard Marine Underwriters',
      coverage_clause: coverageClause || 'INSTITUTE_CARGO_CLAUSES_A',
      cif_valuation_usd: cif,
      sum_insured_usd: sumInsured,
      premium_rate_pct: ratePct,
      total_premium_usd: totalPremium,
      status: 'ACTIVE',
      created_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      message: 'Marine Cargo Insurance policy issued with 110% CIF sum insured valuation',
      data: newPolicy
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Invalid insurance policy payload' }, { status: 400 });
  }
}
