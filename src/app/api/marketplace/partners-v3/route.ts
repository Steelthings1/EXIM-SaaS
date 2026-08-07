// EXIM.IM SaaS Platform - Ecosystem Partners V3 API Endpoint
import { filterPartnersByPortAndCategory, PartnerV3Record } from '@/lib/marketplace-rfq-engine';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const portCode = searchParams.get('port') || undefined;
  const category = searchParams.get('category') || undefined;

  const samplePartners: PartnerV3Record[] = [
    {
      partnerId: 'part-101',
      companyName: 'Chennai Maritime Customs Brokers (CHA License 9041)',
      serviceCategory: 'Customs Broker (CHA)',
      operatingPortCodes: ['INMAA1', 'INPAV1', 'INCOK1'],
      accreditationDetails: 'AEO-LO Certified customs broker with 24h bill clearance guarantee',
      ratingScore: 4.95,
      avgSlaTurnaroundHours: 12,
      verificationStatus: 'VERIFIED_PARTNER',
      contactEmail: 'cha@chennaimaritime.com'
    },
    {
      partnerId: 'part-102',
      companyName: 'Global Seaways Logistics & Forwarding',
      serviceCategory: 'Freight Forwarder',
      operatingPortCodes: ['INMAA1', 'AEDXB', 'INBOM1'],
      accreditationDetails: 'IATA & FMC Licensed Multimodal Transport Operator (MTO)',
      ratingScore: 4.90,
      avgSlaTurnaroundHours: 24,
      verificationStatus: 'VERIFIED_PARTNER',
      contactEmail: 'quotes@globalseaways.com'
    },
    {
      partnerId: 'part-103',
      companyName: 'Apex NABL Accredited Chemical & Steel Testing Lab',
      serviceCategory: 'NABL Accredited Testing Lab',
      operatingPortCodes: ['INMAA1', 'INPAV1'],
      accreditationDetails: 'ISO/IEC 17025 Accredited laboratory for metal composition analysis',
      ratingScore: 4.98,
      avgSlaTurnaroundHours: 18,
      verificationStatus: 'VERIFIED_PARTNER',
      contactEmail: 'lab@apex testing.com'
    }
  ];

  const filtered = filterPartnersByPortAndCategory(samplePartners, portCode, category);
  return Response.json({ success: true, count: filtered.length, data: filtered });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return Response.json({
      success: true,
      message: 'Partner registered in ecosystem directory V3',
      data: { partner_id: `part-${Date.now()}`, ...body }
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Partner registration failed' }, { status: 500 });
  }
}
