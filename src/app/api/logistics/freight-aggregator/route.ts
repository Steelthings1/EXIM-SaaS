// EXIM.IM SaaS Platform - Freight Aggregator API Endpoint
import { calculateFreightQuote, FreightQuoteInput } from '@/lib/freight-quote-engine';

export async function GET(request: Request) {
  const sampleQuotes = [
    {
      carrier_name: 'MSC (Mediterranean Shipping Co)',
      transport_mode: 'OCEAN',
      pol_port_code: 'INNSA (Nhava Sheva)',
      pod_port_code: 'DEHAM (Hamburg)',
      container_type: '40HC',
      base_freight_usd: 1950.00,
      thc_origin_usd: 150.00,
      thc_destination_usd: 200.00,
      baf_surcharge_usd: 350.00,
      isps_surcharge_usd: 15.00,
      total_freight_usd: 2665.00,
      transit_days: 22,
      valid_until: '2026-02-20'
    },
    {
      carrier_name: 'CMA CGM',
      transport_mode: 'OCEAN',
      pol_port_code: 'INNSA (Nhava Sheva)',
      pod_port_code: 'DEHAM (Hamburg)',
      container_type: '40HC',
      base_freight_usd: 2050.00,
      thc_origin_usd: 140.00,
      thc_destination_usd: 190.00,
      baf_surcharge_usd: 320.00,
      isps_surcharge_usd: 15.00,
      total_freight_usd: 2715.00,
      transit_days: 20,
      valid_until: '2026-02-20'
    }
  ];

  return Response.json({ success: true, count: sampleQuotes.length, data: sampleQuotes });
}

export async function POST(request: Request) {
  try {
    const body: FreightQuoteInput = await request.json();
    const result = calculateFreightQuote(body);

    return Response.json({
      success: true,
      message: 'Freight rate quote aggregated and surcharges calculated',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Freight calculation failed' }, { status: 500 });
  }
}
