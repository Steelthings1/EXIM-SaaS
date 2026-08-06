// EXIM.IM SaaS Platform - Statutory Vault API Endpoint

export async function GET(request: Request) {
  const sampleLicenses = [
    {
      license_id: '11111111-2222-3333-4444-555555555555',
      license_type: 'GSTIN',
      license_number: '27AAACA1234A1Z5',
      issuing_authority: 'Goods and Services Tax Network (GSTN India)',
      issue_date: '2020-04-01',
      expiry_date: '2030-03-31',
      status: 'VERIFIED',
      document_url: 'https://vault.exim.im/docs/gstin_27AAACA1234A1Z5.pdf'
    },
    {
      license_id: '22222222-3333-4444-5555-666666666666',
      license_type: 'IEC',
      license_number: '0304005001',
      issuing_authority: 'Directorate General of Foreign Trade (DGFT)',
      issue_date: '2015-08-15',
      expiry_date: '2035-12-31',
      status: 'VERIFIED',
      document_url: 'https://vault.exim.im/docs/iec_0304005001.pdf'
    },
    {
      license_id: '33333333-4444-5555-6666-777777777777',
      license_type: 'EORI',
      license_number: 'GB123456789000',
      issuing_authority: 'HM Revenue & Customs (HMRC UK)',
      issue_date: '2021-01-01',
      expiry_date: '2028-12-31',
      status: 'VERIFIED',
      document_url: 'https://vault.exim.im/docs/eori_GB123456789000.pdf'
    },
    {
      license_id: '44444444-5555-6666-7777-888888888888',
      license_type: 'PAN',
      license_number: 'AAACA1234A',
      issuing_authority: 'Income Tax Department of India',
      issue_date: '2010-05-12',
      expiry_date: null,
      status: 'VERIFIED',
      document_url: 'https://vault.exim.im/docs/pan_AAACA1234A.pdf'
    }
  ];

  return Response.json({ success: true, count: sampleLicenses.length, data: sampleLicenses });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { license_type, license_number, issuing_authority, expiry_date, document_url } = body;

    if (!license_type || !license_number) {
      return Response.json({ success: false, error: 'License type and license number are required' }, { status: 400 });
    }

    const newLicense = {
      license_id: `lic-${Date.now()}`,
      org_id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      license_type,
      license_number,
      issuing_authority: issuing_authority || 'Regulatory Authority',
      status: 'PENDING_VERIFICATION',
      expiry_date: expiry_date || null,
      document_url: document_url || null,
      created_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      message: 'Statutory license successfully registered in Identity Vault',
      data: newLicense
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Invalid license payload' }, { status: 400 });
  }
}
