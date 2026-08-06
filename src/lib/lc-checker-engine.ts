// EXIM.IM SaaS Platform - Bundle E: Letter of Credit (LC) UCP 600 Discrepancy Auditor Engine

export interface LcTermsPayload {
  lcNumber: string;
  expiryDate: string;
  latestShipmentDate: string;
  partialShipmentAllowed: boolean;
  transshipmentAllowed: boolean;
  maxPresentationDays: number;
  lcAmountUsd: number;
}

export interface ShippingDocumentsPayload {
  invoiceNumber: string;
  invoiceDate: string;
  invoiceAmountUsd: number;
  blNumber: string;
  blShapedDate: string;
  blTransshipmentOccurred: boolean;
  grossWeightKgInvoice: number;
  grossWeightKgBl: number;
}

export interface LcDiscrepancyFinding {
  ruleCode: string;
  ucp600Article: string;
  severity: 'CRITICAL_REFUSAL' | 'MAJOR_DISCREPANCY' | 'MINOR_TECHNICAL';
  title: string;
  finding: string;
  remedyAction: string;
}

export interface LcAuditResult {
  lcNumber: string;
  discrepanciesFoundCount: number;
  status: 'CLEAN_PRESENTATION_APPROVED' | 'DISCREPANT_BANK_REJECTION_RISK';
  discrepancies: LcDiscrepancyFinding[];
  isCompliantUcp600: boolean;
}

/**
 * Audits shipping document dataset against Letter of Credit terms under ICC UCP 600 and ISBP 745 rules.
 */
export function auditLetterOfCredit(
  lc: LcTermsPayload,
  docs: ShippingDocumentsPayload
): LcAuditResult {
  const discrepancies: LcDiscrepancyFinding[] = [];

  // 1. Check Late Shipment (Article 29 UCP 600)
  const blDate = new Date(docs.blShapedDate);
  const maxShipDate = new Date(lc.latestShipmentDate);
  if (blDate > maxShipDate) {
    discrepancies.push({
      ruleCode: 'LATE_SHIPMENT',
      ucp600Article: 'Article 29',
      severity: 'CRITICAL_REFUSAL',
      title: 'Late Shipment Beyond LC Latest Date',
      finding: `Bill of Lading date (${docs.blShapedDate}) is after LC latest shipment date (${lc.latestShipmentDate}).`,
      remedyAction: 'Request LC amendment from issuing bank extending latest shipment date.'
    });
  }

  // 2. Check Late Presentation (Article 14c UCP 600)
  const today = new Date();
  const daysDiff = Math.floor((today.getTime() - blDate.getTime()) / (1000 * 3600 * 24));
  if (daysDiff > lc.maxPresentationDays) {
    discrepancies.push({
      ruleCode: 'LATE_PRESENTATION',
      ucp600Article: 'Article 14(c)',
      severity: 'CRITICAL_REFUSAL',
      title: 'Documents Presented Beyond 21 Days Limit',
      finding: `Document presentation is ${daysDiff} days after B/L date, exceeding ${lc.maxPresentationDays} days limit.`,
      remedyAction: 'Present documents under reserve or seek buyer waiver of discrepancy.'
    });
  }

  // 3. Check Transshipment Prohibition (Article 20c UCP 600)
  if (!lc.transshipmentAllowed && docs.blTransshipmentOccurred) {
    discrepancies.push({
      ruleCode: 'TRANSSHIPMENT_VIOLATION',
      ucp600Article: 'Article 20(c)',
      severity: 'MAJOR_DISCREPANCY',
      title: 'Prohibited Transshipment Occurred',
      finding: 'B/L shows transshipment port loading even though LC prohibits transshipment.',
      remedyAction: 'Provide carrier statement that container was loaded in a single direct vessel voyage.'
    });
  }

  // 4. Check Weight Mismatch Across Documents (ISBP 745 Section A)
  if (Math.abs(docs.grossWeightKgInvoice - docs.grossWeightKgBl) > 0.01) {
    discrepancies.push({
      ruleCode: 'WEIGHT_MISMATCH',
      ucp600Article: 'ISBP 745 Section A',
      severity: 'MAJOR_DISCREPANCY',
      title: 'Gross Weight Mismatch Between Invoice & B/L',
      finding: `Invoice gross weight (${docs.grossWeightKgInvoice} kg) differs from Bill of Lading weight (${docs.grossWeightKgBl} kg).`,
      remedyAction: 'Align gross weight figures across Commercial Invoice, Packing List, and Bill of Lading.'
    });
  }

  // 5. Check Over-Invoicing (Article 18b UCP 600)
  if (docs.invoiceAmountUsd > lc.lcAmountUsd) {
    discrepancies.push({
      ruleCode: 'OVER_INVOICING',
      ucp600Article: 'Article 18(b)',
      severity: 'CRITICAL_REFUSAL',
      title: 'Invoice Exceeds Credit Value',
      finding: `Commercial Invoice amount ($${docs.invoiceAmountUsd}) exceeds available LC credit ($${lc.lcAmountUsd}).`,
      remedyAction: 'Reduce invoice amount to LC credit limit or obtain LC value increase amendment.'
    });
  }

  const isCompliant = discrepancies.length === 0;

  return {
    lcNumber: lc.lcNumber,
    discrepanciesFoundCount: discrepancies.length,
    status: isCompliant ? 'CLEAN_PRESENTATION_APPROVED' : 'DISCREPANT_BANK_REJECTION_RISK',
    discrepancies,
    isCompliantUcp600: isCompliant
  };
}
