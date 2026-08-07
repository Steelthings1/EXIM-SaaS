// EXIM.IM SaaS Platform - Security Audit Logs API Endpoint
import { recordAuditLog, AuditLogInput } from '@/lib/audit-trail-engine';

export async function GET(request: Request) {
  const sampleLogs = [
    {
      log_id: 'aud-101',
      user_id: 'usr-9041',
      user_email: 'admin@exim.im',
      user_action: 'UPDATE_WORKSPACE_SETTINGS',
      entity_type: 'WORKSPACE',
      entity_id: 'org-main',
      modified_fields: { customDomain: 'trade.steelthings.com' },
      ip_address: '106.210.42.18',
      created_at: '2026-02-04T11:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleLogs.length, data: sampleLogs });
}

export async function POST(request: Request) {
  try {
    const body: AuditLogInput = await request.json();
    const result = recordAuditLog(body);

    return Response.json({
      success: true,
      message: 'Immutable security audit log recorded',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Audit log recording failed' }, { status: 500 });
  }
}
