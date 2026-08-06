// EXIM.IM SaaS Platform - Module 2: Landed Cost & Duty Calculator

export interface DutyCalculationParams {
  cifValueUsd: number; // Cost, Insurance, Freight Value in USD
  hsCode: string;
  exporterCountry: string; // ISO-3
  importerCountry: string; // ISO-3
  stdBcdRatePct: number; // Basic Customs Duty Standard %
  vatIgstRatePct: number; // Local VAT / IGST %
  applyFtaPreference?: boolean;
}

export interface DutyCalculationResult {
  cifValueUsd: number;
  hsCode: string;
  exporterCountry: string;
  importerCountry: string;
  stdBcdPct: number;
  stdBcdAmountUsd: number;
  effectiveBcdPct: number;
  effectiveBcdAmountUsd: number;
  vatIgstPct: number;
  vatIgstAmountUsd: number;
  totalDutyTaxesUsd: number;
  totalLandedCostUsd: number;
  ftaApplied: boolean;
  ftaAgreementName?: string;
  ftaSavingsUsd: number;
  ruleOfOrigin?: string;
}

export const FTA_REGISTRY: Record<string, { agreementName: string; prefDutyPct: number; ruleOfOrigin: string }> = {
  'IND-ARE': {
    agreementName: 'Comprehensive Economic Partnership Agreement (India-UAE CEPA)',
    prefDutyPct: 0.0,
    ruleOfOrigin: 'Wholly Obtained or Change in Tariff Heading (CTH) with minimum 40% Value Addition'
  },
  'IND-AUS': {
    agreementName: 'Australia-India Economic Cooperation and Trade Agreement (AI-ECTA)',
    prefDutyPct: 0.0,
    ruleOfOrigin: 'Wholly Obtained in Party or Qualifies under CTSH + 35% QVC'
  },
  'IND-ASEAN': {
    agreementName: 'ASEAN-India Free Trade Area (AIFTA)',
    prefDutyPct: 5.0,
    ruleOfOrigin: 'Regional Value Content (RVC) not less than 35%'
  }
};

/**
 * Calculates landed cost, customs duties, destination VAT/IGST, and FTA savings.
 */
export function calculateLandedCost(params: DutyCalculationParams): DutyCalculationResult {
  const {
    cifValueUsd,
    hsCode,
    exporterCountry,
    importerCountry,
    stdBcdRatePct,
    vatIgstRatePct,
    applyFtaPreference = true
  } = params;

  const ftaKey = `${exporterCountry}-${importerCountry}`;
  const ftaMatch = FTA_REGISTRY[ftaKey];

  let effectiveBcdPct = stdBcdRatePct;
  let ftaApplied = false;
  let ftaAgreementName: string | undefined;
  let ruleOfOrigin: string | undefined;

  if (applyFtaPreference && ftaMatch) {
    effectiveBcdPct = ftaMatch.prefDutyPct;
    ftaApplied = true;
    ftaAgreementName = ftaMatch.agreementName;
    ruleOfOrigin = ftaMatch.ruleOfOrigin;
  }

  const stdBcdAmountUsd = (cifValueUsd * stdBcdRatePct) / 100.0;
  const effectiveBcdAmountUsd = (cifValueUsd * effectiveBcdPct) / 100.0;

  // Assessable Value for VAT/IGST = CIF + Effective BCD
  const assessableValueUsd = cifValueUsd + effectiveBcdAmountUsd;
  const vatIgstAmountUsd = (assessableValueUsd * vatIgstRatePct) / 100.0;

  const totalDutyTaxesUsd = effectiveBcdAmountUsd + vatIgstAmountUsd;
  const totalLandedCostUsd = cifValueUsd + totalDutyTaxesUsd;

  const stdTotalDutyUsd = stdBcdAmountUsd + ((cifValueUsd + stdBcdAmountUsd) * vatIgstRatePct) / 100.0;
  const ftaSavingsUsd = Math.max(0, stdTotalDutyUsd - totalDutyTaxesUsd);

  return {
    cifValueUsd,
    hsCode,
    exporterCountry,
    importerCountry,
    stdBcdPct: stdBcdRatePct,
    stdBcdAmountUsd,
    effectiveBcdPct,
    effectiveBcdAmountUsd,
    vatIgstPct: vatIgstRatePct,
    vatIgstAmountUsd,
    totalDutyTaxesUsd,
    totalLandedCostUsd,
    ftaApplied,
    ftaAgreementName,
    ftaSavingsUsd: Number(ftaSavingsUsd.toFixed(2)),
    ruleOfOrigin
  };
}
