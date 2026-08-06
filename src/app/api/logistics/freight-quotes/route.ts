// EXIM.IM SaaS Platform - Freight Rates Aggregator API Endpoint
import { aggregateFreightQuotes } from '@/lib/freight-aggregator';

export async function GET(request: Request) {
  const quotes = aggregateFreightQuotes({
    originPort: 'INNSA',
    destinationPort: 'AEDXB',
    mode: 'OCEAN_FCL',
    sortBy: 'CHEAPEST'
  });

  return Response.json({ success: true, count: quotes.length, data: quotes });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { originPort, destinationPort, mode, sortBy } = body;

    const quotes = aggregateFreightQuotes({
      originPort: originPort || 'INNSA',
      destinationPort: destinationPort || 'AEDXB',
      mode: mode || 'OCEAN_FCL',
      sortBy: sortBy || 'CHEAPEST'
    });

    return Response.json({
      success: true,
      message: 'Multi-carrier freight quotes fetched',
      data: quotes
    });
  } catch (error) {
    return Response.json({ success: false, error: 'Failed to fetch freight quotes' }, { status: 500 });
  }
}
