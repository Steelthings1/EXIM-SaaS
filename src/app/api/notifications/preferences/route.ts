// EXIM.IM SaaS Platform - Notification Preferences API Endpoint

export async function GET(request: Request) {
  const preferences = {
    userId: 'usr-9041',
    enableInApp: true,
    enableEmail: true,
    enableSms: false
  };

  return Response.json({ success: true, data: preferences });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return Response.json({
      success: true,
      message: 'Notification delivery channel preferences updated',
      data: body
    });
  } catch (error) {
    return Response.json({ success: false, error: 'Preference update failed' }, { status: 500 });
  }
}
