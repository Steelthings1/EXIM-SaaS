// EXIM.IM SaaS Platform - Developer API Keys & Webhooks API Endpoint
import crypto from 'crypto';

export async function GET(request: Request) {
  const sampleKeys = [
    {
      key_id: 'key-101',
      api_key_name: 'Production ERP Webhook Integration',
      api_key_prefix: 'exim_live_9041...',
      rate_limit_per_min: 120,
      status: 'ACTIVE',
      created_at: '2026-01-15T00:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleKeys.length, data: sampleKeys });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { keyName, webhookTargetUrl } = body;

    const rawSecret = `exim_secret_${crypto.randomBytes(16).toString('hex')}`;
    const hmacSignature = crypto.createHmac('sha256', rawSecret).update(JSON.stringify({ event: 'order.created' })).digest('hex');

    const newKey = {
      key_id: `key-${Date.now()}`,
      api_key_name: keyName || 'Developer Production Key',
      api_key: `exim_live_${crypto.randomBytes(12).toString('hex')}`,
      webhook_target_url: webhookTargetUrl || 'https://api.merchant.com/exim-webhooks',
      hmac_sha256_sample_signature: hmacSignature,
      rate_limit_per_min: 120,
      status: 'ACTIVE',
      created_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      message: 'Developer API Key generated with HMAC SHA-256 webhook secret',
      data: newKey
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'API key generation failed' }, { status: 400 });
  }
}
