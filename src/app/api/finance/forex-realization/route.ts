// EXIM.IM SaaS Platform - Forex Realization API Endpoint
import { calculateForexRealization, ForexRealizationInput } from '@/lib/forex-treasury-engine';

export async function GET(request: Request) {
  const sampleRealizations = [
    {
      realization_id: 'fx-101',
      invoice_number: 'INV-2026-9041',
      foreign_amount_received: 49000.00,
      invoice_exchange_rate: 83.50,
      bank_realized_exchange_rate: 84.10,
      booked_base_amount_inr: 4091500.00,
      realized_amount_inr: 4120900.00,
      fx_gain_loss_inr: 29400.00,
      is_gain: true,
      irm_reference: 'IRM-SBI-904128',
      created_at: '2026-02-01T15:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleRealizations.length, data: sampleRealizations });
}

export async function POST(request: Request) {
  try {
    const body: ForexRealizationInput = await request.json();
    const result = calculateForexRealization(body);

    return Response.json({
      success: true,
      message: 'Forex remittance realization calculated',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Forex realization calculation failed' }, { status: 500 });
  }
}
