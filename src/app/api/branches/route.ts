// EXIM.IM SaaS Platform - Branches & Warehouses Registry API Endpoint

export async function GET(request: Request) {
  const sampleBranches = [
    {
      branch_id: 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
      branch_code: 'HQ-MUM',
      branch_name: 'Mumbai Head Office & Port Hub',
      port_code: 'INNSA1',
      is_head_office: true,
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'IND',
      warehouses: [
        {
          warehouse_id: 'e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
          warehouse_name: 'Nhava Sheva Bonded Customs Warehouse #1',
          warehouse_type: 'BONDED_CUSTOMS',
          icd_code: 'INNSA1',
          is_bonded: true,
          capacity_sqft: 45000
        }
      ]
    },
    {
      branch_id: 'd4e5f6a7-b89c-0d1e-2f3a-4b5c6d7e8f9a',
      branch_code: 'BR-DEL',
      branch_name: 'Delhi Inland Container Depot Branch',
      port_code: 'INTKD6',
      is_head_office: false,
      city: 'New Delhi',
      state: 'Delhi',
      country: 'IND',
      warehouses: [
        {
          warehouse_id: 'f6a7b89c-0d1e-2f3a-4b5c-6d7e8f9a0b1c',
          warehouse_name: 'Tughlakabad ICD Freight Terminal Warehouse',
          warehouse_type: 'INLAND_CONTAINER_DEPOT',
          icd_code: 'INTKD6',
          is_bonded: true,
          capacity_sqft: 75000
        }
      ]
    }
  ];

  return Response.json({ success: true, count: sampleBranches.length, data: sampleBranches });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { branch_code, branch_name, port_code, city, state, country, postal_code } = body;

    if (!branch_code || !branch_name || !city) {
      return Response.json({ success: false, error: 'Branch code, name, and city are required' }, { status: 400 });
    }

    const newBranch = {
      branch_id: `br-${Date.now()}`,
      org_id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      branch_code,
      branch_name,
      port_code: port_code || null,
      is_head_office: false,
      city,
      state: state || '',
      country: country || 'IND',
      postal_code: postal_code || '',
      created_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      message: 'Operating branch successfully registered',
      data: newBranch
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
