// EXIM.IM SaaS Platform - Workspace Settings & Branding V2 API Endpoint
import { formatLetterhead, WorkspaceConfigV2Input } from '@/lib/workspace-config-engine';

export async function GET(request: Request) {
  const sampleConfig: WorkspaceConfigV2Input = {
    defaultCurrency: 'INR',
    systemTimezone: 'Asia/Kolkata',
    regionalTaxSystem: 'INDIA_GST',
    customSubdomain: 'trade.steelthings.com',
    logoUrl: 'https://exim.im/assets/logo.png',
    letterheadHeaderText: 'STEELTHINGS EXIM PRIVATE LIMITED - ISO 9001:2015 CERTIFIED EXPORTER',
    letterheadFooterText: 'Registered Office: Chennai Port Trust Road, TN, India. AD Code: 0001892.'
  };

  const formatted = formatLetterhead(sampleConfig);
  return Response.json({ success: true, data: sampleConfig, letterhead: formatted });
}

export async function POST(request: Request) {
  try {
    const body: WorkspaceConfigV2Input = await request.json();
    const formatted = formatLetterhead(body);

    return Response.json({
      success: true,
      message: 'Workspace system configuration & branding updated',
      data: body,
      letterhead: formatted
    });
  } catch (error) {
    return Response.json({ success: false, error: 'Workspace configuration update failed' }, { status: 500 });
  }
}
