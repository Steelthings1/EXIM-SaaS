// EXIM.IM SaaS Platform - Ecosystem Marketplace Partners API Endpoint

export async function GET(request: Request) {
  const samplePartners = [
    {
      partner_id: 'part-101',
      partner_name: 'Deccan Customs House Agents (CHA) Pvt Ltd',
      partner_type: 'CHA_CUSTOMS_BROKER',
      rating: 4.95,
      service_locations: ['INNSA (Nhava Sheva)', 'INTKD (Tughlakabad ICD)'],
      contact_email: 'customs@deccancha.com',
      is_verified: true
    },
    {
      partner_id: 'part-102',
      partner_name: 'Apex Global Logistics & Freight Forwarders',
      partner_type: 'FREIGHT_FORWARDER',
      rating: 4.90,
      service_locations: ['Global Ocean FCL/LCL'],
      contact_email: 'bookings@apexlogistics.com',
      is_verified: true
    },
    {
      partner_id: 'part-103',
      partner_name: 'SGS India NABL Accredited Testing Laboratory',
      partner_type: 'NABL_TESTING_LAB',
      rating: 4.98,
      service_locations: ['ISO 17025 Food & Chemical Testing'],
      contact_email: 'lab.india@sgs.com',
      is_verified: true
    }
  ];

  return Response.json({ success: true, count: samplePartners.length, data: samplePartners });
}
