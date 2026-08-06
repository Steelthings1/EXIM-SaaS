// EXIM.IM SaaS Platform - Cargo Policies API Endpoint
import { processMarineCargoPolicy, CargoPolicyInput } from '@/lib/marine-insurance-engine';

export async function GET(request: Request) {
  const samplePolicies = [
    {
      policy_id: 'pol-101',
      policy_number: 'POL-EXIM-2026-9041',
      order_id: 'order-101',
      insurer_name: 'Lloyds of London Syndicate 1980',
      clause_type: 'CLAUSE_A',
      cif_order_value_usd: 49000.00,
      sum_insured_usd: 53900.00,
      premium_rate_pct: 0.30,
      premium_amount_usd: 161.70,
      status: 'ACTIVE',
      created_at: '2026-02-05T10:00:00Z'
    }
  ];

  return Response.json({ success: true, count: samplePolicies.length, data: samplePolicies });
}

export async function POST(request: Request) {
  try {
    const body: CargoPolicyInput = await request.json();
    const result = processMarineCargoPolicy(body);

    return Response.json({
      success: true,
      message: 'Marine Cargo Policy generated with 110% CIF sum insured valuation',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Marine Cargo Policy generation failed' }, { status: 500 });
  }
}
