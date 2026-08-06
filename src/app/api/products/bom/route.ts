// EXIM.IM SaaS Platform - Bill of Materials (BOM) API Endpoint

export async function GET(request: Request) {
  const sampleBom = [
    {
      component_id: 'bom-101',
      product_id: 'prod-001',
      component_sku: 'RM-COFFEE-BEANS-01',
      component_name: 'Raw Organic Arabica Coffee Beans',
      quantity_required: 1.05,
      unit_of_measure: 'KG',
      unit_cost_inr: 450.00,
      country_of_origin: 'IND'
    },
    {
      component_id: 'bom-102',
      product_id: 'prod-001',
      component_sku: 'PKG-FOIL-BAG-250G',
      component_name: 'Multilayer Aluminum Foil Valve Pouch',
      quantity_required: 4.00,
      unit_of_measure: 'PCS',
      unit_cost_inr: 12.50,
      country_of_origin: 'IND'
    }
  ];

  const totalRawCostInr = sampleBom.reduce((sum, item) => sum + (item.quantity_required * item.unit_cost_inr), 0);

  return Response.json({
    success: true,
    count: sampleBom.length,
    total_raw_cost_inr: totalRawCostInr,
    data: sampleBom
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { componentSku, componentName, qty, unitCostInr } = body;

    const newComponent = {
      component_id: `bom-${Date.now()}`,
      product_id: body.productId || 'prod-001',
      component_sku: componentSku || 'RM-RAW-MAT-99',
      component_name: componentName || 'New Component',
      quantity_required: qty || 1.0,
      unit_of_measure: 'KG',
      unit_cost_inr: unitCostInr || 100.0,
      country_of_origin: 'IND'
    };

    return Response.json({
      success: true,
      message: 'BOM raw material component added successfully',
      data: newComponent
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'BOM component addition failed' }, { status: 400 });
  }
}
