// EXIM.IM SaaS Platform - Goods Receipt Notes (GRN) API Endpoint
import { generateGoodsReceiptNote, GoodsReceiptInput } from '@/lib/procurement-engine';

export async function GET(request: Request) {
  const sampleGrns = [
    {
      grn_id: 'grn-101',
      grn_number: 'GRN-2026-900412',
      po_number: 'PO-2026-RAW-0091',
      received_qty: 10000.00,
      accepted_qty: 9950.00,
      rejected_qty: 50.00,
      acceptance_rate_pct: 99.50,
      inspection_notes: 'Moisture content verified at 11.2%. 50 kg damaged bags rejected.',
      created_at: '2026-02-14T14:30:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleGrns.length, data: sampleGrns });
}

export async function POST(request: Request) {
  try {
    const body: GoodsReceiptInput = await request.json();
    const result = generateGoodsReceiptNote(body);

    return Response.json({
      success: true,
      message: 'Goods Receipt Note (GRN) generated and quality inspection recorded',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'GRN generation failed' }, { status: 500 });
  }
}
