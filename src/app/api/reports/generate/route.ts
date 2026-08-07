// EXIM.IM SaaS Platform - Report Generation API Endpoint
import { generateManagementReport, ReportTemplate } from '@/lib/report-generation-engine';

export async function POST(request: Request) {
  try {
    const template: ReportTemplate = await request.json();
    const result = generateManagementReport(template);

    return Response.json({
      success: true,
      message: 'Management report generated cleanly with SHA-256 checksum',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Report generation failed' }, { status: 500 });
  }
}
