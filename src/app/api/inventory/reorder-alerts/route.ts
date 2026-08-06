// EXIM.IM SaaS Platform - Reorder Level & Expiry Warnings API Endpoint

export async function GET(request: Request) {
  const sampleAlerts = [
    {
      alert_id: 'alt-101',
      product_name: 'Raw Organic Arabica Coffee Beans',
      sku: 'RM-COFFEE-BEANS-01',
      warehouse_name: 'Tughlakabad ICD Bonded Warehouse (INTKD)',
      current_stock: 350.00,
      min_reorder_level: 500.00,
      alert_type: 'LOW_STOCK_REORDER_TRIGGER',
      severity: 'HIGH_PRIORITY'
    }
  ];

  return Response.json({ success: true, count: sampleAlerts.length, data: sampleAlerts });
}
