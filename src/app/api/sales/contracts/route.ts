// EXIM.IM SaaS Platform - Sales Contracts & AI Review API Endpoint
import { auditInternationalContract, ContractAuditParams } from '@/lib/ai/contract-review';

export async function GET(request: Request) {
  const sampleContracts = [
    {
      contract_id: 'ctr-101',
      contract_number: 'EXIM-CONTRACT-2026-004',
      buyer_name: 'Gulf Trading Enterprise FZE',
      governing_law: 'UN_CISG_1980',
      arbitration_forum: 'SIAC_SINGAPORE',
      incoterms: 'CIF',
      payment_terms: 'LC_AT_SIGHT',
      risk_score: 10,
      risk_rating: 'LOW_RISK',
      status: 'EXECUTED'
    },
    {
      contract_id: 'ctr-102',
      contract_number: 'EXIM-CONTRACT-2026-005',
      buyer_name: 'EuroAmericana Importers Inc',
      governing_law: 'English Law',
      arbitration_forum: 'LCIA_LONDON',
      incoterms: 'EXW',
      payment_terms: 'NET_90_OPEN_ACCOUNT',
      risk_score: 65,
      risk_rating: 'HIGH_RISK',
      status: 'UNDER_AI_REVIEW'
    }
  ];

  return Response.json({ success: true, count: sampleContracts.length, data: sampleContracts });
}

export async function POST(request: Request) {
  try {
    const body: ContractAuditParams = await request.json();

    if (!body.contractNumber) {
      return Response.json({ success: false, error: 'contractNumber is required' }, { status: 400 });
    }

    const auditResult = auditInternationalContract({
      contractNumber: body.contractNumber,
      governingLaw: body.governingLaw || 'UN_CISG_1980',
      arbitrationForum: body.arbitrationForum || 'SIAC_SINGAPORE',
      incoterms: body.incoterms || 'CIF',
      paymentTerms: body.paymentTerms || 'LC_AT_SIGHT',
      contractValueUsd: body.contractValueUsd || 50000.0
    });

    return Response.json({
      success: true,
      message: 'AI Contract Audit completed successfully',
      data: auditResult
    });
  } catch (error) {
    return Response.json({ success: false, error: 'Contract audit failed' }, { status: 500 });
  }
}
