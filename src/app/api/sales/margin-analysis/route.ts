// EXIM.IM SaaS Platform - Profit Margin Analysis API Endpoint

export async function GET(request: Request) {
  const sampleAnalysis = {
    total_quotations: 18,
    average_gross_margin_pct: 24.30,
    total_revenue_usd: 882000.00,
    total_cost_usd: 668000.00,
    total_gross_profit_usd: 214000.00,
    top_margins: [
      { quote: 'QTN-EXIM-2026-0041', buyer: 'Arabica Imports GmbH', margin_pct: 22.45 },
      { quote: 'QTN-EXIM-2026-0039', buyer: 'Specialty Roasters UK Ltd', margin_pct: 28.10 }
    ]
  };

  return Response.json({ success: true, data: sampleAnalysis });
}
