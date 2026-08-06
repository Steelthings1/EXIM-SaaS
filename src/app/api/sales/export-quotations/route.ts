// EXIM.IM SaaS Platform - Export Quotations API Endpoint
import { processExportQuotation, QuotationInput } from '@/lib/sales-quotation-engine';

export async function GET(request: Request) {
  const sampleQuotes = [
    {
      quote_id: 'q-101',
      quote_number: 'QTN-EXIM-2026-0041',
      buyer_name: 'Arabica Imports GmbH (Hamburg)',
      incoterm: 'CIF',
      currency: 'USD',
      subtotal_amount: 46250.00,
      freight_amount: 2500.00,
      insurance_amount: 250.00,
      total_offer_amount: 49000.00,
      cost_amount: 38000.00,
      gross_profit_amount: 11000.00,
      gross_margin_pct: 22.45,
      validity_days: 30,
      status: 'SENT',
      created_at: '2026-02-01T10:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleQuotes.length, data: sampleQuotes });
}

export async function POST(request: Request) {
  try {
    const body: QuotationInput = await request.json();
    const result = processExportQuotation(body);

    return Response.json({
      success: true,
      message: 'Export sales quotation calculated and issued',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Quotation processing failed' }, { status: 500 });
  }
}
