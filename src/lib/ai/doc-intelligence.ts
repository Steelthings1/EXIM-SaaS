// EXIM.IM SaaS Platform - Bundle A: Document Intelligence AI Agent
import { SingleEntryOrderPayload } from '@/lib/single-entry-engine';

export interface ComplianceRiskFlag {
  field: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  message: string;
  recommendation: string;
}

export interface DocIntelligenceReport {
  isCompliant: boolean;
  completenessScorePct: number;
  totalFieldsChecked: number;
  missingFields: string[];
  riskFlags: ComplianceRiskFlag[];
  autoCompletedFields: Record<string, string>;
}

/**
 * Scans trade order payload for missing required fields and evaluates transaction integrity.
 */
export function analyzeTradeOrderIntegrity(payload: SingleEntryOrderPayload): DocIntelligenceReport {
  const missingFields: string[] = [];
  const riskFlags: ComplianceRiskFlag[] = [];
  const autoCompletedFields: Record<string, string> = {};

  let fieldsCheckedCount = 12;
  let validFieldsCount = 12;

  // 1. Check Buyer Tax ID / VAT
  if (!payload.buyerTaxId || payload.buyerTaxId.trim() === '') {
    missingFields.push('buyerTaxId');
    validFieldsCount--;
    riskFlags.push({
      field: 'buyerTaxId',
      severity: 'CRITICAL',
      message: 'Buyer Tax ID / EORI / VAT Registration number is missing.',
      recommendation: 'Mandatory for customs import clearance in destination country. Fetch from CRM contact profile.'
    });
  }

  // 2. Check Port of Loading & Port of Discharge
  if (!payload.portOfLoading || payload.portOfLoading.trim() === '') {
    missingFields.push('portOfLoading');
    validFieldsCount--;
    riskFlags.push({
      field: 'portOfLoading',
      severity: 'CRITICAL',
      message: 'Port of Loading UN/LOCODE is missing.',
      recommendation: 'Specify seaport (e.g. INNSA1 - Nhava Sheva) or airport code.'
    });
  }

  if (!payload.portOfDischarge || payload.portOfDischarge.trim() === '') {
    missingFields.push('portOfDischarge');
    validFieldsCount--;
    riskFlags.push({
      field: 'portOfDischarge',
      severity: 'CRITICAL',
      message: 'Port of Discharge UN/LOCODE is missing.',
      recommendation: 'Specify destination port (e.g. AEJEA - Jebel Ali).'
    });
  }

  // 3. Check Line Items Weight / CBM
  payload.items.forEach((item, index) => {
    fieldsCheckedCount += 4;
    validFieldsCount += 4;

    if (item.grossWeightKgPerUnit <= item.netWeightKgPerUnit) {
      riskFlags.push({
        field: `items[${index}].grossWeightKgPerUnit`,
        severity: 'WARNING',
        message: `Item ${item.sku}: Gross weight (${item.grossWeightKgPerUnit}kg) must be greater than Net weight (${item.netWeightKgPerUnit}kg).`,
        recommendation: 'Adjust gross weight to include tare packaging weight.'
      });
    }

    if (!item.hsCode || item.hsCode.trim() === '') {
      missingFields.push(`items[${index}].hsCode`);
      validFieldsCount--;
      riskFlags.push({
        field: `items[${index}].hsCode`,
        severity: 'CRITICAL',
        message: `Item ${item.sku}: HS Tariff code missing.`,
        recommendation: 'Use AI HS Classifier to assign valid 8-digit tariff code.'
      });
    }
  });

  // Auto-complete default fields if missing
  if (payload.incoterms === 'CIF' && payload.insuranceCostUsd === 0) {
    autoCompletedFields['insuranceCostUsd'] = '$50.00 (Estimated 0.1% CIF Policy)';
  }

  const completenessScorePct = Number(((validFieldsCount / fieldsCheckedCount) * 100).toFixed(0));

  return {
    isCompliant: riskFlags.filter(r => r.severity === 'CRITICAL').length === 0,
    completenessScorePct,
    totalFieldsChecked: fieldsCheckedCount,
    missingFields,
    riskFlags,
    autoCompletedFields
  };
}
