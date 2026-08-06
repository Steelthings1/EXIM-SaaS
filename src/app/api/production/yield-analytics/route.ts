// EXIM.IM SaaS Platform - Production Yield Analytics API Endpoint

export async function GET(request: Request) {
  const sampleAnalytics = {
    total_batches_processed: 24,
    average_yield_efficiency_pct: 97.80,
    batches_completed: 23,
    batches_rejected: 1,
    line_performances: [
      { line: 'Line A (Roasting & Packaging)', avg_yield_pct: 98.50, batch_count: 14 },
      { line: 'Line B (Grinding & Valve Sealing)', avg_yield_pct: 96.80, batch_count: 10 }
    ]
  };

  return Response.json({ success: true, data: sampleAnalytics });
}
