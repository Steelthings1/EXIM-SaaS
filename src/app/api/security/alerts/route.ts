// EXIM.IM SaaS Platform - Security Anomaly Alerts API Endpoint

export async function GET(request: Request) {
  const sampleAlerts = [
    {
      alert_id: 'alt-901',
      alert_type: 'UNRECOGNIZED_IP_LOGIN',
      severity: 'HIGH',
      user_email: 'finance@exim.im',
      ip_address: '198.51.100.44',
      description: 'Login attempt from unrecognized external IP block 198.51.100.44',
      is_resolved: false,
      created_at: '2026-02-04T12:15:00Z'
    },
    {
      alert_id: 'alt-902',
      alert_type: 'HIGH_VALUE_MODIFICATION',
      severity: 'MEDIUM',
      user_email: 'admin@exim.im',
      ip_address: '106.210.42.18',
      description: 'Export Order ORD-2026-9041 modified ($65,000 sign-off ceiling exceeded)',
      is_resolved: true,
      created_at: '2026-02-04T11:30:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleAlerts.length, data: sampleAlerts });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return Response.json({
      success: true,
      message: 'Security anomaly alert created',
      data: { alert_id: `alt-${Date.now()}`, ...body }
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Security alert creation failed' }, { status: 500 });
  }
}
