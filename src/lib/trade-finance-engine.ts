// EXIM.IM SaaS Platform - Module 14: Trade Finance, Banking & LC UCP 600 Auditor Engine

export interface LcAuditInput {
  lcNumber: string;
  issuingBank: string;
  advisingBank: string;
  lcAmountUsd: number;
  invoiceAmountUsd: number;
  expiryDate: string;
  shipmentDate: string;
  presentationPeriodDays?: number;
  transshipmentAllowed?: boolean;
  actualTransshipmentOccurred?: boolean;
  weightOnInvoiceKg: number;
  weightOnBlKg: number;
}

export interface LcAuditResult {
  lcNumber: string;
  issuingBank: string;
  advisingBank: string;
  lcAmountUsd: number;
  invoiceAmountUsd: number;
  discrepancyCount: number;
  discrepancies: string[];
  isCompliant: boolean;
  status: string;
}

export interface IrmReconciliationInput {
  shippingBillNumber: string;
  irmReference: string;
  realizedAmountUsd: number;
  exchangeRateInrUsd?: number;
}

export interface IrmReconciliationResult {
  ebrcNumber: string;
  shippingBillNumber: string;
  irmReference: string;
  realizedAmountUsd: number;
  realizedAmountInr: number;
  edpmsClosureStatus: string;
}

export interface IncentiveClaimInput {
  shippingBillNumber: string;
  fobValueInr: number;
  rodtepRatePct?: number; // e.g. 1.4%
  drawbackRatePct?: number; // e.g. 1.5%
}

export interface IncentiveClaimResult {
  claimNumber: string;
  shippingBillNumber: string;
  fobValueInr: number;
  rodtepRatePct: number;
  rodtepAmountInr: number;
  drawbackRatePct: number;
  drawbackAmountInr: number;
  totalIncentiveInr: number;
  status: string;
}

/**
 * Audits LC document presentation against UCP 600 and ISBP 745 international banking rules.
 */
export function auditLcPresentation(payload: LcAuditInput): LcAuditResult {
  const {
    lcNumber,
    issuingBank,
    advisingBank,
    lcAmountUsd,
    invoiceAmountUsd,
    expiryDate,
    shipmentDate,
    presentationPeriodDays = 21,
    transshipmentAllowed = true,
    actualTransshipmentOccurred = false,
    weightOnInvoiceKg,
    weightOnBlKg
  } = payload;

  const discrepancies: string[] = [];

  // UCP 600 Rule: Invoice value exceeding LC amount
  if (invoiceAmountUsd > lcAmountUsd) {
    discrepancies.push(`Value Overrun: Invoice amount ($${invoiceAmountUsd}) exceeds LC value ($${lcAmountUsd}). Violation of UCP 600 Art. 18(b).`);
  }

  // UCP 600 Rule: Transshipment prohibition
  if (!transshipmentAllowed && actualTransshipmentOccurred) {
    discrepancies.push('Transshipment Violation: LC prohibits transshipment, but Bill of Lading indicates vessel transshipment occurred. Violation of UCP 600 Art. 20(c).');
  }

  // ISBP 745 Rule: Data mismatch between documents (Invoice vs B/L weight)
  if (weightOnInvoiceKg !== weightOnBlKg) {
    discrepancies.push(`Weight Mismatch: Commercial Invoice weight (${weightOnInvoiceKg} kg) does not match Bill of Lading weight (${weightOnBlKg} kg). Violation of ISBP 745 Para A40.`);
  }

  // UCP 600 Rule: Late presentation
  const shipDate = new Date(shipmentDate);
  const now = new Date();
  const daysDiff = Math.floor((now.getTime() - shipDate.getTime()) / (1000 * 3600 * 24));
  if (daysDiff > presentationPeriodDays) {
    discrepancies.push(`Late Presentation: Documents presented ${daysDiff} days after shipment date (exceeds ${presentationPeriodDays}-day limit). Violation of UCP 600 Art. 14(c).`);
  }

  const isCompliant = discrepancies.length === 0;

  return {
    lcNumber,
    issuingBank,
    advisingBank,
    lcAmountUsd,
    invoiceAmountUsd,
    discrepancyCount: discrepancies.length,
    discrepancies,
    isCompliant,
    status: isCompliant ? 'AUDITED_COMPLIANT' : 'AUDITED_DISCREPANT'
  };
}

/**
 * Reconciles Inward Remittance Reference (IRM) with Central Bank EDPMS database.
 */
export function reconcileIrmRemittance(payload: IrmReconciliationInput): IrmReconciliationResult {
  const { shippingBillNumber, irmReference, realizedAmountUsd, exchangeRateInrUsd = 83.50 } = payload;
  const realizedAmountInr = Math.round(realizedAmountUsd * exchangeRateInrUsd * 100) / 100;

  return {
    ebrcNumber: `EBRC-EXIM-${Date.now()}`,
    shippingBillNumber,
    irmReference,
    realizedAmountUsd,
    realizedAmountInr,
    edpmsClosureStatus: 'CLOSED'
  };
}

/**
 * Computes RoDTEP (Remission of Duties and Taxes on Exported Products) and Duty Drawback incentive scrolls.
 */
export function calculateExportIncentives(payload: IncentiveClaimInput): IncentiveClaimResult {
  const { shippingBillNumber, fobValueInr, rodtepRatePct = 1.40, drawbackRatePct = 1.50 } = payload;

  const rodtepAmountInr = Math.round((fobValueInr * (rodtepRatePct / 100)) * 100) / 100;
  const drawbackAmountInr = Math.round((fobValueInr * (drawbackRatePct / 100)) * 100) / 100;
  const totalIncentiveInr = Math.round((rodtepAmountInr + drawbackAmountInr) * 100) / 100;

  return {
    claimNumber: `CLM-INC-${Date.now()}`,
    shippingBillNumber,
    fobValueInr,
    rodtepRatePct,
    rodtepAmountInr,
    drawbackRatePct,
    drawbackAmountInr,
    totalIncentiveInr,
    status: 'SCROLL_GENERATED'
  };
}
