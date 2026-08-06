// EXIM.IM SaaS Platform - Multi-Warehouse Stock Inventory API Endpoint

export async function GET(request: Request) {
  const sampleBatches = [
    {
      batch_id: 'b-101',
      warehouse_name: 'Nhava Sheva Bonded Customs Warehouse #1',
      warehouse_code: 'INNSA1-BOND',
      product_sku: 'COF-ARAB-001',
      product_name: 'Premium Roasted Arabica Coffee Beans',
      batch_number: 'BATCH-2026-COF-091',
      qty_available: 5000,
      qty_allocated: 1200,
      manufacturing_date: '2026-01-10',
      expiry_date: '2027-01-09'
    },
    {
      batch_id: 'b-102',
      warehouse_name: 'Tughlakabad ICD Freight Terminal Warehouse',
      warehouse_code: 'INTKD6-ICD',
      product_sku: 'RIC-BASM-002',
      product_name: 'Traditional Organic Indian Basmati Rice',
      batch_number: 'LOT-2026-RIC-441',
      qty_available: 12000,
      qty_allocated: 3500,
      manufacturing_date: '2025-11-20',
      expiry_date: '2027-11-19'
    }
  ];

  return Response.json({ success: true, count: sampleBatches.length, data: sampleBatches });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { warehouse_id, product_id, batch_number, qty_available } = body;

    if (!batch_number || !qty_available) {
      return Response.json({ success: false, error: 'Batch number and quantity are required' }, { status: 400 });
    }

    const newBatch = {
      batch_id: `b-${Date.now()}`,
      warehouse_id: warehouse_id || 'w-1',
      product_id: product_id || 'p-101',
      batch_number,
      qty_available: Number(qty_available),
      created_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      message: 'Stock batch registered in warehouse inventory',
      data: newBatch
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Invalid stock batch payload' }, { status: 400 });
  }
}
