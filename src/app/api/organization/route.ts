// EXIM.IM SaaS Platform - Organization API Endpoint

export async function GET(request: Request) {
  const sampleOrg = {
    org_id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    legal_name: 'Apex Global Logistics & Trading Pvt Ltd',
    trade_name: 'Apex Exim Global',
    entity_type: 'PRIVATE_LIMITED',
    tax_id_gstin: '27AAACA1234A1Z5',
    iec_code: '0304005001',
    eori_number: 'GB123456789000',
    pan_number: 'AAACA1234A',
    default_currency: 'USD',
    subscription_tier: 'ENTERPRISE_TIER_1',
    is_active: true,
    created_at: '2025-01-15T08:00:00Z'
  };

  return Response.json({ success: true, data: sampleOrg });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    return Response.json({
      success: true,
      message: 'Organization profile updated successfully',
      data: { ...body, updated_at: new Date().toISOString() }
    });
  } catch (error) {
    return Response.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
