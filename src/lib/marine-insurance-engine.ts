// EXIM.IM SaaS Platform - Module 13: Marine Cargo Insurance Engine

export type CargoClauseType = 'CLAUSE_A' | 'CLAUSE_B' | 'CLAUSE_C';

export interface CargoPolicyInput {
  orderId: string;
  insurerName: string;
  clauseType?: CargoClauseType;
  cifOrderValueUsd: number;
}

export interface CargoPolicyResult {
  policyNumber: string;
  orderId: string;
  insurerName: string;
  clauseType: CargoClauseType;
  cifOrderValueUsd: number;
  sumInsuredUsd: number; // 110% of CIF
  premiumRatePct: number;
  premiumAmountUsd: number;
  status: string;
}

export interface CargoClaimInput {
  policyId: string;
  surveyorLossDescription: string;
  claimedAmountUsd: number;
}

export interface CargoClaimResult {
  claimNumber: string;
  policyId: string;
  surveyorLossDescription: string;
  claimedAmountUsd: number;
  status: string;
}

/**
 * Calculates 110% CIF sum insured valuation (CIF * 1.10) and computes premium rate based on Institute Cargo Clauses.
 * Clause A (All-Risks) = 0.30%
 * Clause B = 0.20%
 * Clause C = 0.12%
 */
export function processMarineCargoPolicy(payload: CargoPolicyInput): CargoPolicyResult {
  const { orderId, insurerName, clauseType = 'CLAUSE_A', cifOrderValueUsd } = payload;

  const sumInsuredUsd = Math.round(cifOrderValueUsd * 1.10 * 100) / 100;

  const rateMap: Record<CargoClauseType, number> = {
    'CLAUSE_A': 0.0030, // 0.30%
    'CLAUSE_B': 0.0020, // 0.20%
    'CLAUSE_C': 0.0012  // 0.12%
  };

  const premiumRatePct = (rateMap[clauseType] || 0.0030) * 100;
  const premiumAmountUsd = Math.round(sumInsuredUsd * (rateMap[clauseType] || 0.0030) * 100) / 100;

  return {
    policyNumber: `POL-EXIM-${Date.now()}`,
    orderId,
    insurerName,
    clauseType,
    cifOrderValueUsd,
    sumInsuredUsd,
    premiumRatePct,
    premiumAmountUsd,
    status: 'ACTIVE'
  };
}

/**
 * Logs transit damage claim against an active marine policy.
 */
export function logCargoClaim(payload: CargoClaimInput): CargoClaimResult {
  const { policyId, surveyorLossDescription, claimedAmountUsd } = payload;

  return {
    claimNumber: `CLM-EXIM-${Date.now()}`,
    policyId,
    surveyorLossDescription,
    claimedAmountUsd,
    status: 'UNDER_SURVEY'
  };
}
