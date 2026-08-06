// EXIM.IM SaaS Platform - International Sales Contracts API Endpoint
import { auditContractLegalRisk, ContractInput } from '@/lib/contract-audit-engine';

export async function GET(request: Request) {
  const sampleContracts = [
    {
      contract_id: 'ct-101',
      contract_number: 'CISG-EXIM-2026-0021',
      buyer_entity: 'Arabica Imports GmbH (Hamburg, Germany)',
      seller_entity: 'Ahamla Organics Pvt Ltd (Bengaluru, India)',
      incoterm: 'CIF',
      governing_law: 'UN CISG 1980',
      arbitration_venue: 'SIAC Singapore',
      total_value_usd: 49000.00,
      payment_terms: 'Irrevocable LC at Sight',
      status: 'EXECUTED',
      created_at: '2026-02-01T10:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleContracts.length, data: sampleContracts });
}

export async function POST(request: Request) {
  try {
    const body: ContractInput = await request.json();
    const result = auditContractLegalRisk(body);

    return Response.json({
      success: true,
      message: 'International sales contract created and AI legal risk audit completed',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Contract processing failed' }, { status: 500 });
  }
}
