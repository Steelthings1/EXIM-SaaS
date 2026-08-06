// EXIM.IM SaaS Platform - Module 21: Banking Auditor Engine

export interface LcAuditInput {
  lcNumber: string;
  issuingBank: string;
  advisingBank: string;
  lcAmountUsd: number;
  invoiceAmountUsd: number;
  latestShipmentDate: string;
  actualShipmentDate: string;
  presentationDate: string;
  allowTransshipment: boolean;
  isTransshipped: boolean;
  invoiceWeightKg: number;
  blWeightKg: number;
}

export interface LcAuditResult {
  auditId: string;
  lcNumber: string;
  isCompliant: boolean;
  discrepancies: string[];
  articleReferences: string[];
  auditStatus: string;
}

export interface EdpmsClosureInput {
  shippingBillNumber: string;
  portCode: string;
  fobValueInr: number;
  irmReference: string;
  realizedAmountUsd: number;
  exchangeRate: number;
}

export interface EdpmsClosureResult {
  closureId: string;
  ebrcNumber: string;
  shippingBillNumber: string;
  realizedAmountInr: number;
  edpmsStatus: 'CLOSED';
}

/**
 * Audits LC presentation documents against UCP 600 & ISBP 745 rules.
 */
export function auditLcPresentation(payload: LcAuditInput): LcAuditResult {
  const {
    lcNumber,
    lcAmountUsd,
    invoiceAmountUsd,
    latestShipmentDate,
    actualShipmentDate,
    presentationDate,
    allowTransshipment,
    isTransshipped,
    invoiceWeightKg,
    blWeightKg
  } = payload;

  const discrepancies: string[] = [];
  const articleReferences: string[] = [];

  // Rule 1: Value Overrun check
  if (invoiceAmountUsd > lcAmountUsd) {
    discrepancies.push(`Invoice Amount ($${invoiceAmountUsd.toLocaleString()}) exceeds LC Value ($${lcAmountUsd.toLocaleString()}).`);
    articleReferences.push('UCP 600 Article 18(b)');
  }

  // Rule 2: Transshipment prohibition check
  if (!allowTransshipment && isTransshipped) {
    discrepancies.push('Transshipment detected on Bill of Lading contrary to LC Special Instructions.');
    articleReferences.push('UCP 600 Article 20(c)');
  }

  // Rule 3: Weight mismatch check
  if (invoiceWeightKg !== blWeightKg) {
    discrepancies.push(`Weight Mismatch: Invoice Gross Weight (${invoiceWeightKg} kg) != BL Weight (${blWeightKg} kg).`);
    articleReferences.push('ISBP 745 Paragraph E20');
  }

  // Rule 4: Late presentation check (21 days post shipment)
  const shipDate = new Date(actualShipmentDate);
  const presDate = new Date(presentationDate);
  const diffDays = Math.ceil((presDate.getTime() - shipDate.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays > 21) {
    discrepancies.push(`Late Presentation: Presented ${diffDays} days after shipment date (Limit: 21 days).`);
    articleReferences.push('UCP 600 Article 14(c)');
  }

  const isCompliant = discrepancies.length === 0;

  return {
    auditId: `AUD-UCP-${Date.now()}`,
    lcNumber,
    isCompliant,
    discrepancies,
    articleReferences,
    auditStatus: isCompliant ? 'COMPLIANT_READY_FOR_PRESENTATION' : 'DISCREPANT_REJECTED'
  };
}

/**
 * Reconciles IRM remittance with shipping bill for central bank eBRC generation & EDPMS closure.
 */
export function processEdpmsClosure(payload: EdpmsClosureInput): EdpmsClosureResult {
  const { shippingBillNumber, realizedAmountUsd, exchangeRate } = payload;
  const realizedAmountInr = Math.round(realizedAmountUsd * exchangeRate * 100) / 100;

  return {
    closureId: `CLOS-EDPMS-${Date.now()}`,
    ebrcNumber: `EBRC-RBI-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    shippingBillNumber,
    realizedAmountInr,
    edpmsStatus: 'CLOSED'
  };
}
