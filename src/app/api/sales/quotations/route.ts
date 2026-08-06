// EXIM.IM SaaS Platform - Sales Quotations API Endpoint

export async function GET(request: Request) {
  const sampleQuotations = [
    {
      quotation_id: 'q-101',
      quotation_number: 'PROF-2026-8801',
      buyer_name: 'Gulf Trading Enterprise FZE',
      buyer_country: 'ARE',
      incoterms: 'CIF',
      validity_date: '2026-03-31',
      subtotal_usd: 48250.00,
      estimated_freight_usd: 1850.00,
      total_cif_usd: 50250.00,
      status: 'ISSUED'
    },
    {
      quotation_id: 'q-102',
      quotation_number: 'PROF-2026-8802',
      buyer_name: 'EuroAmericana Importers Inc',
      buyer_country: 'USA',
      incoterms: 'FOB',
      validity_date: '2026-04-15',
      subtotal_usd: 95000.00,
      estimated_freight_usd: 0.00,
      total_cif_usd: 95000.00,
      status: 'ACCEPTED'
    }
  ];

  return Response.json({ success: true, count: sampleQuotations.length, data: sampleQuotations });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { quotation_number, buyer_name, subtotal_usd, total_cif_usd } = body;

    if (!quotation_number || !buyer_name) {
      return Response.json({ success: false, error: 'Quotation number and buyer name are required' }, { status: 400 });
    }

    const newQuotation = {
      quotation_id: `q-${Date.now()}`,
      quotation_number,
      buyer_name,
      subtotal_usd: Number(subtotal_usd) || 10000.0,
      total_cif_usd: Number(total_cif_usd) || 11000.0,
      status: 'ISSUED',
      created_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      message: 'Export Proforma Quotation created successfully',
      data: newQuotation
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Invalid quotation payload' }, { status: 400 });
  }
}
