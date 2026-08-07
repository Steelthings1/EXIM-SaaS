// EXIM.IM SaaS Platform - Workflow Approvals API Endpoint
import { evaluateOrderApproval, ApprovalCheckInput } from '@/lib/workflow-automation-engine';

export async function GET(request: Request) {
  const sampleApprovals = [
    {
      request_id: 'req-101',
      approval_type: 'HIGH_VALUE_ORDER',
      reference_id: 'SO-2026-9041',
      order_amount_usd: 125000.00,
      requested_by: 'rahul.s@exim.im',
      required_approver_role: 'CHIEF_TRADE_OFFICER',
      approval_status: 'PENDING',
      created_at: '2026-02-04T09:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleApprovals.length, data: sampleApprovals });
}

export async function POST(request: Request) {
  try {
    const body: ApprovalCheckInput = await request.json();
    const result = evaluateOrderApproval(body);

    return Response.json({
      success: true,
      message: 'Workflow approval trigger evaluated',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Approval evaluation failed' }, { status: 500 });
  }
}
