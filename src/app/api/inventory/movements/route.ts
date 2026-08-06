// EXIM.IM SaaS Platform - Stock Movements API Endpoint
import { executeStockMovement, StockMovementRequest } from '@/lib/stock-movement-engine';

export async function GET(request: Request) {
  const sampleMovements = [
    {
      movement_id: 'mov-101',
      batch_id: 'batch-001',
      batch_number: 'BATCH-2026-COFFEE-09',
      warehouse_name: 'Nhava Sheva Bonded Warehouse (INNSA)',
      movement_type: 'OUTWARD_DISPATCH',
      quantity: 5000.00,
      reference_doc_number: 'SB-ICEGATE-2026-904128',
      performed_by: 'Warehouse Logistics Manager',
      created_at: '2026-02-05T14:20:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleMovements.length, data: sampleMovements });
}

export async function POST(request: Request) {
  try {
    const body: StockMovementRequest = await request.json();
    const result = executeStockMovement(body);

    if (!result.success) {
      return Response.json({ success: false, error: result.errorMessage }, { status: 400 });
    }

    return Response.json({
      success: true,
      message: 'Stock movement executed successfully',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Stock movement execution failed' }, { status: 500 });
  }
}
