// EXIM.IM SaaS Platform - Service RFQs API Endpoint
import { createServiceRfq } from '@/lib/marketplace-rfq-engine';

export async function GET(request: Request) {
  const sampleRfqs = [
    {
      rfq_id: 'rfq-901',
      partner_id: 'part-101',
      order_number: 'ORD-2026-9041',
      service_type: 'Customs Clearance & Duty Assessment',
      port_code: 'INMAA1',
      quoted_value_inr: 18500.00,
      status: 'Quote Received',
      created_at: '2026-02-04T10:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleRfqs.length, data: sampleRfqs });
}

export async function POST(request: Request) {
  try {
    const { partnerId, orderNumber, serviceType, portCode } = await request.json();
    const result = createServiceRfq(partnerId, orderNumber, serviceType, portCode);

    return Response.json({
      success: true,
      message: 'Service RFQ dispatched to partner',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'RFQ creation failed' }, { status: 500 });
  }
}
