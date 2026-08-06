// EXIM.IM SaaS Platform - 10-Dashboard Analytics API Endpoint
import { getDashboardViewData, DashboardViewType } from '@/lib/analytics-engine';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const view = (searchParams.get('view') as DashboardViewType) || 'EXECUTIVE';

  const data = getDashboardViewData(view);

  return Response.json({
    success: true,
    data
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const viewType = (body.viewType as DashboardViewType) || 'EXECUTIVE';

    const data = getDashboardViewData(viewType);

    return Response.json({
      success: true,
      message: `Analytics view fetched for ${viewType}`,
      data
    });
  } catch (error) {
    return Response.json({ success: false, error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
