// EXIM.IM SaaS Platform - CRM Contacts API Endpoint

export async function GET(request: Request) {
  const sampleContacts = [
    {
      contact_id: 'c-101',
      contact_type: 'BUYER_CUSTOMER',
      legal_name: 'Gulf Trading Enterprise FZE',
      trade_name: 'Gulf Exim Dubai',
      tax_id_vat: 'TRN-100456789000003',
      country: 'ARE',
      email: 'procurement@gulftrading.ae',
      kyb_status: 'VERIFIED_KYB',
      credit_limit_usd: 250000.00,
      payment_terms: 'LC_AT_SIGHT'
    },
    {
      contact_id: 'c-102',
      contact_type: 'BUYER_CUSTOMER',
      legal_name: 'EuroAmericana Importers Inc',
      trade_name: 'EuroAmericana NY',
      tax_id_vat: 'EIN-98-7654321',
      country: 'USA',
      email: 'orders@euroamericana.com',
      kyb_status: 'VERIFIED_KYB',
      credit_limit_usd: 500000.00,
      payment_terms: 'NET_30'
    },
    {
      contact_id: 'c-103',
      contact_type: 'SUPPLIER_VENDOR',
      legal_name: 'Deccan Spice & Commodities Plantations Pvt Ltd',
      trade_name: 'Deccan Spice India',
      tax_id_vat: 'GSTIN: 33ABCDE1234F1Z9',
      country: 'IND',
      email: 'supplies@deccanspice.in',
      kyb_status: 'VERIFIED_KYB',
      credit_limit_usd: 150000.00,
      payment_terms: 'ADVANCE_30_70'
    }
  ];

  return Response.json({ success: true, count: sampleContacts.length, data: sampleContacts });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contact_type, legal_name, email, country } = body;

    if (!legal_name || !email) {
      return Response.json({ success: false, error: 'Legal name and email are required' }, { status: 400 });
    }

    const newContact = {
      contact_id: `c-${Date.now()}`,
      contact_type: contact_type || 'BUYER_CUSTOMER',
      legal_name,
      email,
      country: country || 'USA',
      kyb_status: 'VERIFIED_KYB',
      credit_limit_usd: 100000.00,
      created_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      message: 'Contact created successfully in CRM registry',
      data: newContact
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
