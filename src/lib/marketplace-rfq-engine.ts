// EXIM.IM SaaS Platform - Module 30: Marketplace RFQ Engine

export interface PartnerV3Record {
  partnerId: string;
  companyName: string;
  serviceCategory: 'Customs Broker (CHA)' | 'Freight Forwarder' | 'NABL Accredited Testing Lab' | 'Trade Consultant';
  operatingPortCodes: string[];
  accreditationDetails: string;
  ratingScore: number;
  avgSlaTurnaroundHours: number;
  verificationStatus: string;
  contactEmail: string;
}

export interface ServiceRfqRecord {
  rfqId: string;
  partnerId: string;
  orderNumber: string;
  serviceType: string;
  portCode: string;
  quotedValueInr: number;
  status: 'Submitted' | 'Quote Received' | 'Booked' | 'Fulfilled' | 'Cancelled';
  createdAt: string;
}

/**
 * Filters ecosystem partners by operating seaport/ICD code and service category.
 */
export function filterPartnersByPortAndCategory(
  partners: PartnerV3Record[],
  portCode?: string,
  serviceCategory?: string
): PartnerV3Record[] {
  return partners.filter((p) => {
    const matchesPort = !portCode || p.operatingPortCodes.includes(portCode);
    const matchesCategory = !serviceCategory || p.serviceCategory === serviceCategory;
    return matchesPort && matchesCategory;
  });
}

/**
 * Dispatches a new service Request for Quotation (RFQ).
 */
export function createServiceRfq(partnerId: string, orderNumber: string, serviceType: string, portCode: string): ServiceRfqRecord {
  return {
    rfqId: `RFQ-${Date.now()}`,
    partnerId,
    orderNumber,
    serviceType,
    portCode,
    quotedValueInr: 0.0,
    status: 'Submitted',
    createdAt: new Date().toISOString()
  };
}
