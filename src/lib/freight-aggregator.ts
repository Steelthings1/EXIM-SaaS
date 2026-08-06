// EXIM.IM SaaS Platform - Bundle D: Multi-Carrier Freight Rate Aggregator

export interface FreightSurcharges {
  terminalHandlingChargeUsd: number; // THC
  bunkerAdjustmentFactorUsd: number; // BAF
  ispsSecurityFeeUsd: number; // ISPS
  documentationFeeUsd: number;
}

export interface FreightQuote {
  quoteId: string;
  carrierName: string;
  carrierCode: string;
  mode: 'OCEAN_FCL' | 'OCEAN_LCL' | 'AIR_FREIGHT';
  originPort: string;
  destinationPort: string;
  transitDays: number;
  baseRateUsd: number;
  surcharges: FreightSurcharges;
  totalFreightCostUsd: number;
  validUntil: string;
}

export interface FreightSearchFilter {
  originPort: string;
  destinationPort: string;
  mode?: 'OCEAN_FCL' | 'OCEAN_LCL' | 'AIR_FREIGHT';
  sortBy?: 'CHEAPEST' | 'FASTEST';
}

/**
 * Compares multi-carrier spot ocean and air freight quotes with detailed surcharges.
 */
export function aggregateFreightQuotes(filter: FreightSearchFilter): FreightQuote[] {
  const quotes: FreightQuote[] = [
    {
      quoteId: 'fq-maersk-01',
      carrierName: 'Maersk Line',
      carrierCode: 'MAEU',
      mode: filter.mode || 'OCEAN_FCL',
      originPort: filter.originPort,
      destinationPort: filter.destinationPort,
      transitDays: 14,
      baseRateUsd: 1450.0,
      surcharges: {
        terminalHandlingChargeUsd: 220.0,
        bunkerAdjustmentFactorUsd: 110.0,
        ispsSecurityFeeUsd: 25.0,
        documentationFeeUsd: 45.0
      },
      totalFreightCostUsd: 1850.0,
      validUntil: '2026-03-31'
    },
    {
      quoteId: 'fq-msc-02',
      carrierName: 'Mediterranean Shipping Company (MSC)',
      carrierCode: 'MSCU',
      mode: filter.mode || 'OCEAN_FCL',
      originPort: filter.originPort,
      destinationPort: filter.destinationPort,
      transitDays: 16,
      baseRateUsd: 1320.0,
      surcharges: {
        terminalHandlingChargeUsd: 210.0,
        bunkerAdjustmentFactorUsd: 105.0,
        ispsSecurityFeeUsd: 25.0,
        documentationFeeUsd: 40.0
      },
      totalFreightCostUsd: 1700.0,
      validUntil: '2026-03-31'
    },
    {
      quoteId: 'fq-cmacgm-03',
      carrierName: 'CMA CGM Group',
      carrierCode: 'CMDU',
      mode: filter.mode || 'OCEAN_FCL',
      originPort: filter.originPort,
      destinationPort: filter.destinationPort,
      transitDays: 13,
      baseRateUsd: 1550.0,
      surcharges: {
        terminalHandlingChargeUsd: 230.0,
        bunkerAdjustmentFactorUsd: 115.0,
        ispsSecurityFeeUsd: 25.0,
        documentationFeeUsd: 50.0
      },
      totalFreightCostUsd: 1970.0,
      validUntil: '2026-03-31'
    }
  ];

  if (filter.sortBy === 'FASTEST') {
    return quotes.sort((a, b) => a.transitDays - b.transitDays);
  }

  // Default: CHEAPEST first
  return quotes.sort((a, b) => a.totalFreightCostUsd - b.totalFreightCostUsd);
}
