// EXIM.IM SaaS Platform - Developer API Keys API Endpoint
import { generateDeveloperApiKey } from '@/lib/api-center-engine';

export async function GET(request: Request) {
  const sampleKeys = [
    {
      key_id: 'key-101',
      key_name: 'Production Logistics Integration',
      key_prefix: 'exim_live_9a41',
      rate_limit_per_min: 1000,
      created_at: '2026-01-10T10:00:00Z',
      last_used_at: '2026-02-06T18:30:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleKeys.length, data: sampleKeys });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const creds = generateDeveloperApiKey(body.keyName || 'Default Developer Key', body.rateLimit || 1000);

    return Response.json({
      success: true,
      message: 'Developer API Key generated successfully',
      data: creds
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'API key generation failed' }, { status: 500 });
  }
}
