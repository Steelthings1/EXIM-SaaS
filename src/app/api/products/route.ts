// EXIM.IM SaaS Platform - Products Master Catalog API Endpoint

export async function GET(request: Request) {
  const sampleProducts = [
    {
      product_id: 'p-101',
      sku: 'COF-ARAB-001',
      product_name: 'Premium Roasted Arabica Coffee Beans (1kg Vacuum Sealed)',
      hs_code: '0901.21.90',
      uom: 'KGS',
      unit_price_usd: 14.50,
      net_weight_kg: 1.00,
      gross_weight_kg: 1.05,
      cbm_per_unit: 0.0025,
      units_per_carton: 10
    },
    {
      product_id: 'p-102',
      sku: 'RIC-BASM-002',
      product_name: 'Traditional Organic Indian Basmati Rice (5kg Bag)',
      hs_code: '1006.30.20',
      uom: 'BAGS',
      unit_price_usd: 12.00,
      net_weight_kg: 5.00,
      gross_weight_kg: 5.10,
      cbm_per_unit: 0.0080,
      units_per_carton: 4
    },
    {
      product_id: 'p-103',
      sku: 'SHI-TEXT-003',
      product_name: 'Woven Mens Organic Cotton Shirts (Pack of 5)',
      hs_code: '6205.20.00',
      uom: 'PCS',
      unit_price_usd: 45.00,
      net_weight_kg: 1.20,
      gross_weight_kg: 1.35,
      cbm_per_unit: 0.0065,
      units_per_carton: 8
    }
  ];

  return Response.json({ success: true, count: sampleProducts.length, data: sampleProducts });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sku, product_name, hs_code, unit_price_usd, net_weight_kg, gross_weight_kg, cbm_per_unit } = body;

    if (!sku || !product_name || !hs_code) {
      return Response.json({ success: false, error: 'SKU, Product name, and HS code are required' }, { status: 400 });
    }

    const newProduct = {
      product_id: `p-${Date.now()}`,
      sku,
      product_name,
      hs_code,
      unit_price_usd: Number(unit_price_usd) || 10.0,
      net_weight_kg: Number(net_weight_kg) || 1.0,
      gross_weight_kg: Number(gross_weight_kg) || 1.1,
      cbm_per_unit: Number(cbm_per_unit) || 0.003,
      created_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      message: 'Product SKU registered in Master Catalog',
      data: newProduct
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Invalid product payload' }, { status: 400 });
  }
}
