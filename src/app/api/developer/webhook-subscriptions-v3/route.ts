// EXIM.IM SaaS Platform - Webhook Subscriptions V3 API Endpoint
import crypto from 'crypto';

export async function GET(request: Request) {
  const sampleSubscribers = [
    {
      subscription_id: 'sub-301',
      target_url: 'https://erp.steelthings.com/api/exim-webhooks',
      events: ['shipment.updated', 'customs.cleared', 'ebrc.issued'],
      hmac_secret: 'whsec_9041a8b7c6d5e4f3a2b1c0d9e8f7a6b5',
      is_active: true,
      created_at: '2026-01-20T10:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleSubscribers.length, data: sampleSubscribers });
}

export async function POST(request: Request) {
  try {
    const { targetUrl, events } = await request.json();
    const hmacSecret = `whsec_${crypto.randomBytes(16).toString('hex')}`;

    return Response.json({
      success: true,
      message: 'Webhook event subscription V3 created with HMAC SHA-256 secret',
      data: {
        subscription_id: `sub-${Date.now()}`,
        target_url: targetUrl,
        events: events || ['shipment.updated', 'customs.cleared', 'ebrc.issued'],
        hmac_secret: hmacSecret,
        is_active: true,
        created_at: new Date().toISOString()
      }
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Webhook subscription failed' }, { status: 500 });
  }
}
