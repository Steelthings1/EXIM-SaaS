// EXIM.IM SaaS Platform - Shipping Instructions API Endpoint
import { generateShippingInstruction, ShippingInstructionInput } from '@/lib/freight-quote-engine';

export async function GET(request: Request) {
  const sampleSis = [
    {
      si_id: 'si-101',
      si_number: 'SI-EXIM-2026-9041',
      booking_reference: 'BKG-MSC-904128',
      shipper_name: 'Ahamla Organics Pvt Ltd',
      consignee_name: 'Arabica Imports GmbH',
      vessel_name: 'MSC Oscar',
      voyage_number: '2604W',
      container_number: 'MSCU-9041285',
      seal_number: 'SEAL-MSC-9041',
      bl_type: 'ORIGINAL_BL',
      status: 'SUBMITTED',
      created_at: '2026-02-05T12:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleSis.length, data: sampleSis });
}

export async function POST(request: Request) {
  try {
    const body: ShippingInstructionInput = await request.json();
    const result = generateShippingInstruction(body);

    return Response.json({
      success: true,
      message: 'Shipping Instructions (SI) submitted successfully for BL draft generation',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Shipping Instructions submission failed' }, { status: 500 });
  }
}
