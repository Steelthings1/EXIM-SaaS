// EXIM.IM SaaS Platform - Contract Audit API Endpoint
import { auditContractLegalRisk, ContractInput } from '@/lib/contract-audit-engine';

export async function POST(request: Request) {
  try {
    const body: ContractInput = await request.json();
    const result = auditContractLegalRisk(body);

    return Response.json({
      success: true,
      message: 'AI Contract Legal Risk Audit completed',
      data: result
    });
  } catch (error) {
    return Response.json({ success: false, error: 'Contract audit failed' }, { status: 500 });
  }
}
