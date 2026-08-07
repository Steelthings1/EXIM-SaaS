// EXIM.IM SaaS Platform - Scheduled Report Templates API Endpoint

export async function GET(request: Request) {
  const sampleTemplates = [
    {
      template_id: 'tmpl-101',
      template_name: 'Monthly Export FOB Realization Summary',
      category: 'Export Performance',
      schedule_frequency: 'Monthly',
      export_format: 'PDF',
      recipient_emails: ['cfo@exim.im', 'finance@exim.im'],
      is_active: true
    },
    {
      template_id: 'tmpl-102',
      template_name: 'Weekly RoDTEP & Duty Drawback Realization Audit',
      category: 'Incentive Realization',
      schedule_frequency: 'Weekly',
      export_format: 'EXCEL',
      recipient_emails: ['tax@exim.im'],
      is_active: true
    }
  ];

  return Response.json({ success: true, count: sampleTemplates.length, data: sampleTemplates });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return Response.json({
      success: true,
      message: 'Report template created successfully',
      data: { template_id: `tmpl-${Date.now()}`, ...body }
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Template creation failed' }, { status: 500 });
  }
}
