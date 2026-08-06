// EXIM.IM SaaS Platform - Cargo Claims API Endpoint
import { logCargoClaim, CargoClaimInput } from '@/lib/marine-insurance-engine';

export async function GET(request: Request) {
  const sampleClaims = [
    {
      claim_id: 'clm-101',
      claim_number: 'CLM-EXIM-2026-9041',
      policy_id: 'pol-101',
      surveyor_loss_description: 'Water ingress damage observed in container rear door area. 20 cartons affected.',
      claimed_amount_usd: 1250.00,
      settled_amount_usd: 0.00,
      status: 'UNDER_SURVEY',
      created_at: '2026-02-15T11:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleClaims.length, data: sampleClaims });
}

export async function POST(request: Request) {
  try {
    const body: CargoClaimInput = await request.json();
    const result = logCargoClaim(body);

    return Response.json({
      success: true,
      message: 'Transit cargo damage claim lodged and assigned to insurance surveyor',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Cargo claim lodging failed' }, { status: 500 });
  }
}
