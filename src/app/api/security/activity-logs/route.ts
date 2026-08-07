// EXIM.IM SaaS Platform - Security Activity Logs V2 API Endpoint
import { recordActivityLogV2, ActivityLogInput } from '@/lib/security-audit-engine';

export async function GET(request: Request) {
  const sampleLogs = [
    {
      log_id: 'log-v2-101',
      user_id: 'usr-9041',
      user_email: 'admin@exim.im',
      action: 'MODIFY_EXPORT_ORDER_REALIZATION',
      entity_type: 'EXPORT_ORDER',
      entity_id: 'ORD-2026-9041',
      payload_diff: { fob_value_usd: { old: 45000, new: 65000 } },
      ip_address: '106.210.42.18',
      risk_rating: 'LOW',
      created_at: '2026-02-04T11:30:00Z'
    },
    {
      log_id: 'log-v2-102',
      user_id: 'usr-8812',
      user_email: 'finance@exim.im',
      action: 'UNRECOGNIZED_IP_LOGIN_ATTEMPT',
      entity_type: 'USER_SESSION',
      entity_id: 'sess-8812',
      payload_diff: {},
      ip_address: '198.51.100.44',
      risk_rating: 'HIGH',
      created_at: '2026-02-04T12:15:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleLogs.length, data: sampleLogs });
}

export async function POST(request: Request) {
  try {
    const body: ActivityLogInput = await request.json();
    const result = recordActivityLogV2(body);

    return Response.json({
      success: true,
      message: 'Immutable activity log V2 recorded',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Activity log recording failed' }, { status: 500 });
  }
}
