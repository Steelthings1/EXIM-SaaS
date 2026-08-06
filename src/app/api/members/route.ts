// EXIM.IM SaaS Platform - Organization Members & Invites API Endpoint

export async function GET(request: Request) {
  const sampleMembers = [
    {
      member_id: '99999999-8888-7777-6666-555555555551',
      org_id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      email: 'owner@apexexim.com',
      full_name: 'Vikramaditya Singhania',
      role: 'ORG_OWNER',
      status: 'ACTIVE',
      joined_at: '2025-01-15T08:30:00Z'
    },
    {
      member_id: '99999999-8888-7777-6666-555555555552',
      org_id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      email: 'export.mgr@apexexim.com',
      full_name: 'Priya Sharma',
      role: 'EXPORT_MANAGER',
      status: 'ACTIVE',
      joined_at: '2025-02-01T10:15:00Z'
    },
    {
      member_id: '99999999-8888-7777-6666-555555555553',
      org_id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      email: 'compliance@apexexim.com',
      full_name: 'Rajesh Verma',
      role: 'COMPLIANCE_OFFICER',
      status: 'ACTIVE',
      joined_at: '2025-02-10T11:00:00Z'
    },
    {
      member_id: '99999999-8888-7777-6666-555555555554',
      org_id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      email: 'cha.broker@customspartners.in',
      full_name: 'Anil Kumar (Customs Broker)',
      role: 'CUSTOMS_BROKER',
      status: 'ACTIVE',
      joined_at: '2025-03-01T14:20:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleMembers.length, data: sampleMembers });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, full_name, role } = body;

    if (!email || !role) {
      return Response.json({ success: false, error: 'Email and role are required fields' }, { status: 400 });
    }

    const newMember = {
      member_id: `mem-${Date.now()}`,
      org_id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      email,
      full_name: full_name || email.split('@')[0],
      role,
      status: 'INVITED',
      invited_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      message: `Invitation successfully sent to ${email} with role ${role}`,
      data: newMember
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
