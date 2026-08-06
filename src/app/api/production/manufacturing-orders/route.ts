// EXIM.IM SaaS Platform - Manufacturing Production Orders API Endpoint
import { processProductionBatch, ProductionBatchInput } from '@/lib/production-batch-engine';

export async function GET(request: Request) {
  const sampleOrders = [
    {
      order_id: 'mfg-101',
      batch_number: 'BATCH-2026-COFFEE-09',
      production_line: 'Line A (Roasting & Packaging)',
      target_yield_qty: 10000.00,
      actual_yield_qty: 9850.00,
      yield_efficiency_pct: 98.50,
      status: 'COMPLETED',
      created_at: '2026-02-05T08:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleOrders.length, data: sampleOrders });
}

export async function POST(request: Request) {
  try {
    const body: ProductionBatchInput = await request.json();
    const result = processProductionBatch(body);

    return Response.json({
      success: true,
      message: 'Manufacturing production batch processed successfully',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Production batch processing failed' }, { status: 500 });
  }
}
