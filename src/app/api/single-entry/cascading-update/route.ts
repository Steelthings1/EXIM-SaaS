// EXIM.IM SaaS Platform - Cascading Update API Endpoint
import { processCascadingUpdate, MasterOrderInput } from '@/lib/cascading-update-engine';

export async function POST(request: Request) {
  try {
    const body: MasterOrderInput = await request.json();

    if (!body.orderId || !body.itemQuantity || !body.unitPriceUsd) {
      return Response.json({ success: false, error: 'orderId, itemQuantity, and unitPriceUsd are required' }, { status: 400 });
    }

    const result = processCascadingUpdate(body);

    return Response.json({
      success: true,
      message: 'Cascading field updates propagated across downstream trade documents',
      data: result
    });
  } catch (error) {
    return Response.json({ success: false, error: 'Cascading update failed' }, { status: 500 });
  }
}
