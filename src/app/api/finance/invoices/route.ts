// EXIM.IM SaaS Platform - Multi-Currency Invoices API Endpoint

export async function GET(request: Request) {
  const sampleInvoices = [
    {
      invoice_id: 'inv-101',
      invoice_number: 'INV-EXIM-2026-0091',
      buyer_name: 'Gulf Trading Enterprise FZE',
      currency: 'USD',
      invoice_amount_fc: 50250.00,
      booking_exchange_rate: 83.00,
      realized_exchange_rate: 83.50,
      forex_gain_loss_inr: 25125.00, // (83.50 - 83.00) * 50250
      status: 'PAID'
    }
  ];

  return Response.json({ success: true, count: sampleInvoices.length, data: sampleInvoices });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { invoice_number, buyer_name, invoice_amount_fc, booking_exchange_rate } = body;

    if (!invoice_number || !buyer_name) {
      return Response.json({ success: false, error: 'Invoice number and buyer name are required' }, { status: 400 });
    }

    const newInvoice = {
      invoice_id: `inv-${Date.now()}`,
      invoice_number,
      buyer_name,
      currency: 'USD',
      invoice_amount_fc: Number(invoice_amount_fc) || 10000.0,
      booking_exchange_rate: Number(booking_exchange_rate) || 83.00,
      status: 'ISSUED',
      created_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      message: 'Multi-currency commercial invoice issued',
      data: newInvoice
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Invalid invoice payload' }, { status: 400 });
  }
}
