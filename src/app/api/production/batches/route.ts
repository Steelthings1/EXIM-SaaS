// EXIM.IM SaaS Platform - Manufacturing Production Batches API Endpoint

export async function GET(request: Request) {
  const sampleBatches = [
    {
      batch_id: 'b-101',
      batch_number: 'BATCH-2026-COF-091',
      product_name: 'Premium Roasted Arabica Coffee Beans',
      planned_qty: 5000,
      produced_qty: 4950,
      yield_efficiency_pct: 99.0,
      mfg_date: '2026-01-10',
      expiry_date: '2027-01-09',
      status: 'RELEASED'
    },
    {
      batch_id: 'b-102',
      batch_number: 'LOT-2026-RIC-441',
      product_name: 'Traditional Organic Indian Basmati Rice',
      planned_qty: 12000,
      produced_qty: 11800,
      yield_efficiency_pct: 98.3,
      mfg_date: '2025-11-20',
      expiry_date: '2027-11-19',
      status: 'IN_PRODUCTION'
    }
  ];

  return Response.json({ success: true, count: sampleBatches.length, data: sampleBatches });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { batch_number, product_name, planned_qty, mfg_date } = body;

    if (!batch_number || !product_name) {
      return Response.json({ success: false, error: 'Batch number and product name are required' }, { status: 400 });
    }

    const newBatch = {
      batch_id: `b-${Date.now()}`,
      batch_number,
      product_name,
      planned_qty: Number(planned_qty) || 1000,
      produced_qty: 0,
      yield_efficiency_pct: 100.0,
      mfg_date: mfg_date || new Date().toISOString().split('T')[0],
      status: 'SCHEDULED',
      created_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      message: 'Production batch scheduled',
      data: newBatch
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Invalid batch payload' }, { status: 400 });
  }
}
