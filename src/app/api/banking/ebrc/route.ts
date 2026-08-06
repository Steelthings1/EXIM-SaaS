// EXIM.IM SaaS Platform - eBRC Reconciliation API Endpoint
import { reconcileEbrcAndIncentives } from '@/lib/ebrc-reconciliation-engine';

export async function GET(request: Request) {
  const sampleEbrcs = [
    {
      ebrc_id: 'ebrc-101',
      ebrc_number: 'EBRC-2026-SBI-8812',
      shipping_bill_number: 'SB-ICEGATE-2026-904128',
      irm_reference: 'IRM-SBI-900412',
      fob_value_fc: 50250.00,
      realized_amount_fc: 50250.00,
      currency: 'USD',
      realized_amount_inr: 4195875.00,
      rbi_edpms_status: 'CLOSED'
    }
  ];

  return Response.json({ success: true, count: sampleEbrcs.length, data: sampleEbrcs });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { shippingBillNumber, shippingBillDate, fobValueUsd, irmReference, realizedAmountFcUsd, realizedExchangeRateInr } = body;

    if (!shippingBillNumber || !irmReference) {
      return Response.json({ success: false, error: 'shippingBillNumber and irmReference are required' }, { status: 400 });
    }

    const reconciliation = reconcileEbrcAndIncentives({
      shippingBillNumber,
      shippingBillDate: shippingBillDate || '2026-02-01',
      fobValueUsd: Number(fobValueUsd) || 50000.0,
      irmReference,
      realizedAmountFcUsd: Number(realizedAmountFcUsd) || 50000.0,
      realizedExchangeRateInr: Number(realizedExchangeRateInr) || 83.50
    });

    return Response.json({
      success: true,
      message: 'eBRC Generated and EDPMS entry closed',
      data: reconciliation
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'eBRC reconciliation failed' }, { status: 500 });
  }
}
