// EXIM.IM SaaS Platform - CRM Interaction Logs API Endpoint

export async function GET(request: Request) {
  const sampleLogs = [
    {
      interaction_id: 'int-101',
      contact_id: 'cust-101',
      contact_name: 'Gulf Trading Enterprise FZE',
      interaction_type: 'QUOTATION_INQUIRY',
      subject: 'Inquiry for 1 20ft FCL Organic Roasted Coffee Beans',
      notes: 'Customer requested CIF Jebel Ali pricing with 60 days LC payment terms.',
      logged_by: 'Export Sales Director',
      created_at: '2026-02-01T10:30:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleLogs.length, data: sampleLogs });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newLog = {
      interaction_id: `int-${Date.now()}`,
      contact_id: body.contactId || 'cust-101',
      interaction_type: body.interactionType || 'QUOTATION_INQUIRY',
      subject: body.subject || 'Trade Inquiry Logged',
      notes: body.notes || 'Inquiry details recorded.',
      logged_by: 'Sales Representative',
      created_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      message: 'CRM interaction log created successfully',
      data: newLog
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Failed to create interaction log' }, { status: 400 });
  }
}
