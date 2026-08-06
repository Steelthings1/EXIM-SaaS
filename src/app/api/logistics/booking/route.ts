// EXIM.IM SaaS Platform - Carrier Bookings API Endpoint

export async function GET(request: Request) {
  const sampleBookings = [
    {
      booking_id: 'bkg-101',
      booking_reference: 'BKG-MAERSK-2026-9041',
      carrier_name: 'Maersk Line',
      vessel_name: 'MAERSK MC-KINNEY MOLLER',
      voyage_number: 'VOY-2604W',
      container_number: 'MSKU-904182-4',
      seal_number: 'SEAL-IN-9004128',
      port_loading: 'INNSA',
      port_discharge: 'AEDXB',
      etd_date: '2026-02-03',
      eta_date: '2026-02-17',
      freight_cost_usd: 1850.00,
      status: 'IN_TRANSIT'
    }
  ];

  return Response.json({ success: true, count: sampleBookings.length, data: sampleBookings });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { carrier_name, vessel_name, port_loading, port_discharge, freight_cost_usd } = body;

    if (!carrier_name || !vessel_name) {
      return Response.json({ success: false, error: 'Carrier name and vessel name are required' }, { status: 400 });
    }

    const bkgRef = `BKG-${carrier_name.toUpperCase().slice(0, 4)}-${Date.now().toString().slice(-6)}`;
    const newBooking = {
      booking_id: `bkg-${Date.now()}`,
      booking_reference: bkgRef,
      carrier_name,
      vessel_name,
      voyage_number: 'VOY-2026-X',
      port_loading: port_loading || 'INNSA',
      port_discharge: port_discharge || 'AEDXB',
      etd_date: '2026-02-20',
      eta_date: '2026-03-05',
      freight_cost_usd: Number(freight_cost_usd) || 1800.0,
      status: 'CONFIRMED',
      created_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      message: 'Carrier booking confirmed',
      data: newBooking
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Invalid booking payload' }, { status: 400 });
  }
}
