// EXIM.IM SaaS Platform - Module 11: Freight Quote & Shipping Instructions Engine

export interface FreightQuoteInput {
  carrierName: string;
  transportMode?: 'OCEAN' | 'AIR' | 'RAIL' | 'ROAD';
  polPortCode: string;
  podPortCode: string;
  containerType?: string;
  baseFreightUsd: number;
  thcOriginUsd?: number;
  thcDestinationUsd?: number;
  bafSurchargeUsd?: number;
  ispsSurchargeUsd?: number;
  transitDays: number;
  validityDays?: number;
}

export interface FreightQuoteResult {
  carrierName: string;
  transportMode: string;
  polPortCode: string;
  podPortCode: string;
  containerType: string;
  baseFreightUsd: number;
  surchargesBreakdown: {
    thcOrigin: number;
    thcDestination: number;
    bafSurcharge: number;
    ispsSurcharge: number;
    totalSurcharges: number;
  };
  totalFreightUsd: number;
  transitDays: number;
  validUntil: string;
}

export interface ShippingInstructionInput {
  bookingReference: string;
  shipperName: string;
  consigneeName: string;
  vesselName: string;
  voyageNumber: string;
  containerNumber: string;
  sealNumber: string;
  blType?: 'ORIGINAL_BL' | 'SEAWAY_BILL' | 'TELEX_RELEASE';
}

export interface ShippingInstructionResult {
  siNumber: string;
  bookingReference: string;
  shipperName: string;
  consigneeName: string;
  vesselName: string;
  voyageNumber: string;
  containerNumber: string;
  sealNumber: string;
  blType: string;
  status: string;
}

/**
 * Calculates freight quote total including Terminal Handling Charges (THC),
 * Bunker Adjustment Factor (BAF), and ISPS security surcharges.
 */
export function calculateFreightQuote(payload: FreightQuoteInput): FreightQuoteResult {
  const {
    carrierName,
    transportMode = 'OCEAN',
    polPortCode,
    podPortCode,
    containerType = '40HC',
    baseFreightUsd,
    thcOriginUsd = 150,
    thcDestinationUsd = 200,
    bafSurchargeUsd = 350,
    ispsSurchargeUsd = 15,
    transitDays,
    validityDays = 14
  } = payload;

  const totalSurcharges = thcOriginUsd + thcDestinationUsd + bafSurchargeUsd + ispsSurchargeUsd;
  const totalFreightUsd = Math.round((baseFreightUsd + totalSurcharges) * 100) / 100;

  const validUntilDate = new Date();
  validUntilDate.setDate(validUntilDate.getDate() + validityDays);

  return {
    carrierName,
    transportMode,
    polPortCode,
    podPortCode,
    containerType,
    baseFreightUsd,
    surchargesBreakdown: {
      thcOrigin: thcOriginUsd,
      thcDestination: thcDestinationUsd,
      bafSurcharge: bafSurchargeUsd,
      ispsSurcharge: ispsSurchargeUsd,
      totalSurcharges
    },
    totalFreightUsd,
    transitDays,
    validUntil: validUntilDate.toISOString().split('T')[0]
  };
}

/**
 * Generates Shipping Instructions (SI) dispatch payload for Bill of Lading creation.
 */
export function generateShippingInstruction(payload: ShippingInstructionInput): ShippingInstructionResult {
  const {
    bookingReference,
    shipperName,
    consigneeName,
    vesselName,
    voyageNumber,
    containerNumber,
    sealNumber,
    blType = 'ORIGINAL_BL'
  } = payload;

  return {
    siNumber: `SI-EXIM-${Date.now()}`,
    bookingReference,
    shipperName,
    consigneeName,
    vesselName,
    voyageNumber,
    containerNumber,
    sealNumber,
    blType,
    status: 'SUBMITTED'
  };
}
