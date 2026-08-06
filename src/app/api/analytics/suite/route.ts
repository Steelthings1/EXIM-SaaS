// EXIM.IM SaaS Platform - 10-Dashboard Intelligence Suite API Endpoint
import { getDashboardViewData, DashboardViewType } from '@/lib/multi-dashboard-engine';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const viewType = (searchParams.get('view') || 'EXECUTIVE') as DashboardViewType;

  const data = getDashboardViewData(viewType);

  return Response.json({
    success: true,
    message: `10-Dashboard telemetry retrieved for view ${viewType}`,
    data
  }, { status: 200 });
}
