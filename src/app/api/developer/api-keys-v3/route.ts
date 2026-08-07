// EXIM.IM SaaS Platform - Developer API Keys V3 API Endpoint
import { generateApiKeyV3 } from '@/lib/developer-api-engine';

export async function GET(request: Request) {
  const sampleKeys = [
    {
      key_id: 'key-101',
      key_name: 'Production ERP Integration Key',
      key_prefix: 'exim_live_9041...',
      rate_limit_per_min: 1000,
      created_at: '2026-01-15T09:00:00Z',
      last_used_at: '2026-02-04T12:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleKeys.length, data: sampleKeys });
}

export async function POST(request: Request) {
  try {
    const { keyName, rateLimitPerMin } = await request.json();
    const result = generateApiKeyV3(keyName || 'Default Live Key', rateLimitPerMin || 1000);

    return Response.json({
      success: true,
      message: 'Developer API key V3 generated successfully',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'API key generation failed' }, { status: 500 });
  }
}
