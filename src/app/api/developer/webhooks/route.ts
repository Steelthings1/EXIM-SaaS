// EXIM.IM SaaS Platform - Webhook Subscriptions API Endpoint
import { generateHmacSha256Signature } from '@/lib/api-center-engine';

export async function GET(request: Request) {
  const sampleWebhooks = [
    {
      subscription_id: 'sub-101',
      target_url: 'https://api.partnerlogistics.com/exim-webhooks',
      subscribed_events: ['shipment.updated', 'customs.cleared', 'ebrc.issued'],
      secret_hmac_key: 'whsec_904128abcdef1234567890',
      is_active: true,
      created_at: '2026-01-15T12:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleWebhooks.length, data: sampleWebhooks });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const hmacSecret = `whsec_${Date.now()}_secret`;

    return Response.json({
      success: true,
      message: 'Webhook subscription created successfully',
      data: {
        subscriptionId: `sub-${Date.now()}`,
        targetUrl: body.targetUrl,
        subscribedEvents: body.subscribedEvents || ['shipment.updated', 'customs.cleared'],
        secretHmacKey: hmacSecret,
        isActive: true
      }
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Webhook subscription failed' }, { status: 500 });
  }
}
