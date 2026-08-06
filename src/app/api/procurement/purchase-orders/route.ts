// EXIM.IM SaaS Platform - Purchase Orders API Endpoint
import { processPurchaseOrder, PurchaseOrderInput } from '@/lib/procurement-engine';

export async function GET(request: Request) {
  const samplePos = [
    {
      po_id: 'po-101',
      po_number: 'PO-2026-RAW-0091',
      supplier_name: 'Coorg Estate Plantations & Raw Spices Ltd',
      line_items: [
        { sku: 'RM-COFFEE-BEANS-01', qty: 10000, unit_price_inr: 450.00 }
      ],
      total_amount_inr: 4500000.00,
      status: 'CONFIRMED',
      expected_delivery_date: '2026-02-15',
      created_at: '2026-02-01T10:00:00Z'
    }
  ];

  return Response.json({ success: true, count: samplePos.length, data: samplePos });
}

export async function POST(request: Request) {
  try {
    const body: PurchaseOrderInput = await request.json();
    const result = processPurchaseOrder(body);

    return Response.json({
      success: true,
      message: 'Vendor Purchase Order issued successfully',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Purchase Order issuance failed' }, { status: 500 });
  }
}
