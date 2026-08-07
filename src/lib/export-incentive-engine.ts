// EXIM.IM SaaS Platform - Module 22: Export Incentive Engine

export interface IncentiveClaimInput {
  shippingBillNumber: string;
  schemeType: 'RODTEP' | 'ROSCTL' | 'DUTY_DRAWBACK' | 'ADVANCE_AUTHORIZATION';
  fobValueInr: number;
  customsHsCode: string;
}

export interface IncentiveClaimResult {
  claimId: string;
  claimNumber: string;
  shippingBillNumber: string;
  schemeType: string;
  fobValueInr: number;
  incentiveRatePct: number;
  claimAmountInr: number;
  scrollNumber: string;
  claimStatus: 'SCROLL_ISSUED';
}

export interface EscripUtilizeInput {
  scrollNumber: string;
  dutyOffsetAmountInr: number;
  importBillOfEntry: string;
}

export interface EscripUtilizeResult {
  scrollNumber: string;
  previousBalanceInr: number;
  utilizedInr: number;
  remainingBalanceInr: number;
  importBillOfEntry: string;
}

/**
 * Returns scheme percentage rate based on scheme type.
 */
function getSchemeRatePct(schemeType: string): number {
  switch (schemeType) {
    case 'RODTEP':
      return 1.40; // 1.4%
    case 'ROSCTL':
      return 3.15; // 3.15%
    case 'DUTY_DRAWBACK':
      return 1.50; // 1.5%
    case 'ADVANCE_AUTHORIZATION':
      return 0.00; // Duty-free import inputs
    default:
      return 1.00;
  }
}

/**
 * Calculates export incentive claim & generates DGFT e-scrip scroll.
 */
export function calculateIncentiveClaim(payload: IncentiveClaimInput): IncentiveClaimResult {
  const { shippingBillNumber, schemeType, fobValueInr } = payload;
  const incentiveRatePct = getSchemeRatePct(schemeType);
  const claimAmountInr = Math.round((fobValueInr * (incentiveRatePct / 100)) * 100) / 100;

  return {
    claimId: `INC-CLM-${Date.now()}`,
    claimNumber: `CLM-DGFT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    shippingBillNumber,
    schemeType,
    fobValueInr,
    incentiveRatePct,
    claimAmountInr,
    scrollNumber: `SCRL-ICEGATE-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    claimStatus: 'SCROLL_ISSUED'
  };
}

/**
 * Utilizes available e-scrip credit balance against import customs duty.
 */
export function utilizeEscripCredit(currentBalanceInr: number, payload: EscripUtilizeInput): EscripUtilizeResult {
  const { scrollNumber, dutyOffsetAmountInr, importBillOfEntry } = payload;
  const remainingBalanceInr = Math.max(0, currentBalanceInr - dutyOffsetAmountInr);

  return {
    scrollNumber,
    previousBalanceInr: currentBalanceInr,
    utilizedInr: dutyOffsetAmountInr,
    remainingBalanceInr,
    importBillOfEntry
  };
}
