// EXIM.IM SaaS Platform - eBRC & EDPMS Reconciliation API Endpoint
import { reconcileIrmRemittance, IrmReconciliationInput } from '@/lib/trade-finance-engine';

export async function GET(request: Request) {
  const sampleRecords = [
    {
      ebrc_id: 'ebrc-101',
      ebrc_number: 'EBRC-EXIM-2026-9041',
      shipping_bill_number: 'SB-INNSA-904128',
      irm_reference: 'IRM-SBI-904128',
      realized_amount_usd: 49000.00,
      realized_amount_inr: 4091500.00,
      edpms_closure_status: 'CLOSED',
      created_at: '2026-02-15T12:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleRecords.length, data: sampleRecords });
}

export async function POST(request: Request) {
  try {
    const body: IrmReconciliationInput = await request.json();
    const result = reconcileIrmRemittance(body);

    return Response.json({
      success: true,
      message: 'Inward remittance IRM reconciled with EDPMS and eBRC generated',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'eBRC reconciliation failed' }, { status: 500 });
  }
}
