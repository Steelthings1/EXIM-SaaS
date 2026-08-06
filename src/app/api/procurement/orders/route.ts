// EXIM.IM SaaS Platform - Vendor Procurement & POs API Endpoint

export async function GET(request: Request) {
  const samplePOs = [
    {
      po_id: 'po-101',
      po_number: 'PO-VENDOR-2026-104',
      supplier_name: 'Deccan Spice & Commodities Plantations Pvt Ltd',
      total_amount_usd: 36250.00,
      delivery_date: '2026-03-01',
      status: 'ACKNOWLEDGED'
    },
    {
      po_id: 'po-102',
      po_number: 'PO-PACKAGING-2026-99',
      supplier_name: 'Apex Polyfilm & Containers Pvt Ltd',
      total_amount_usd: 4800.00,
      delivery_date: '2026-02-25',
      status: 'FULFILLED'
    }
  ];

  return Response.json({ success: true, count: samplePOs.length, data: samplePOs });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { po_number, supplier_name, total_amount_usd } = body;

    if (!po_number || !supplier_name) {
      return Response.json({ success: false, error: 'PO number and supplier name are required' }, { status: 400 });
    }

    const newPO = {
      po_id: `po-${Date.now()}`,
      po_number,
      supplier_name,
      total_amount_usd: Number(total_amount_usd) || 5000.0,
      status: 'ISSUED',
      created_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      message: 'Vendor Purchase Order issued',
      data: newPO
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Invalid PO payload' }, { status: 400 });
  }
}
