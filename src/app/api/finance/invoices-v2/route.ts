// EXIM.IM SaaS Platform - Multi-Currency Commercial Invoices V2 API Endpoint
import { createCommercialInvoice, CommercialInvoicePayload } from '@/lib/forex-treasury-engine';

export async function GET(request: Request) {
  const sampleInvoices = [
    {
      invoice_id: 'inv-101',
      invoice_number: 'INV-2026-9041',
      buyer_name: 'Dubai Trade LLC',
      currency: 'USD',
      foreign_amount: 49000.00,
      invoice_exchange_rate: 83.50,
      base_amount_inr: 4091500.00,
      lut_reference: 'LUT-GST-2026-9041',
      is_lut_zero_rated: true,
      payment_status: 'REALIZED_PAID',
      created_at: '2026-01-20T10:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleInvoices.length, data: sampleInvoices });
}

export async function POST(request: Request) {
  try {
    const body: CommercialInvoicePayload = await request.json();
    const result = createCommercialInvoice(body);

    return Response.json({
      success: true,
      message: 'Multi-currency commercial invoice issued with zero-rated LUT tag',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Commercial invoice generation failed' }, { status: 500 });
  }
}
