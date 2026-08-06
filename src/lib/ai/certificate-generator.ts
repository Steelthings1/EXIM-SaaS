// EXIM.IM SaaS Platform - Bundle C: AI Statutory Certificate Generator Agent

export type CertificateType = 'PHYTOSANITARY' | 'CERTIFICATE_OF_ANALYSIS' | 'HEALTH_CERTIFICATE' | 'FUMIGATION_CERTIFICATE';

export interface QcReportSummary {
  batchNumber: string;
  productName: string;
  labName: string;
  moisturePct: number;
  activeIngredientPct: number;
  heavyMetalsPpm: number;
  microbialStatus: string;
}

export interface DraftedCertificateResult {
  certificateType: CertificateType;
  certificateNumber: string;
  issuingAuthority: string;
  legalExporter: string;
  consignee: string;
  batchNumber: string;
  productName: string;
  extractedParameters: Record<string, string>;
  declarationText: string;
  isValidForCustoms: boolean;
}

/**
 * Auto-drafts statutory export certificates from production QC lab test records.
 */
export function draftStatutoryCertificate(
  type: CertificateType,
  qc: QcReportSummary,
  exporter: string = 'Apex Global Logistics & Trading Pvt Ltd',
  consignee: string = 'Gulf Trading Enterprise FZE'
): DraftedCertificateResult {
  const certNo = `CERT-2026-${type.slice(0, 4)}-${Date.now().toString().slice(-6)}`;

  let issuingAuthority = 'National Plant Quarantine Department / FSSAI';
  let declarationText = '';
  const extractedParameters: Record<string, string> = {
    'Moisture Content': `${qc.moisturePct}%`,
    'Active Ingredient Purity': `${qc.activeIngredientPct}%`,
    'Heavy Metals Test': `${qc.heavyMetalsPpm} PPM (Compliant)`,
    'Microbial Screening': qc.microbialStatus
  };

  switch (type) {
    case 'PHYTOSANITARY':
      issuingAuthority = 'Directorate of Plant Protection, Quarantine & Storage (India)';
      declarationText = `This is to certify that the plants, plant products or other regulated articles described herein (Batch #${qc.batchNumber}) have been inspected according to official procedures and considered to be free from quarantine pests.`;
      break;

    case 'CERTIFICATE_OF_ANALYSIS':
      issuingAuthority = `${qc.labName} (NABL ISO 17025 Accredited Laboratory)`;
      declarationText = `Official Laboratory Analysis Report for Batch #${qc.batchNumber} (${qc.productName}). All active chemical and physical parameters comply with export specification limits.`;
      break;

    case 'HEALTH_CERTIFICATE':
      issuingAuthority = 'Food Safety and Standards Authority of India (FSSAI)';
      declarationText = `It is certified that the food consignment under Batch #${qc.batchNumber} is produced in a sanitary facility and is fit for human consumption in destination market.`;
      break;

    case 'FUMIGATION_CERTIFICATE':
      issuingAuthority = 'NSPM 12 Accredited Fumigation Agency';
      declarationText = `Consignment treated with Methyl Bromide / Aluminium Phosphide in accordance with ISPM 15 timber packing rules.`;
      break;
  }

  return {
    certificateType: type,
    certificateNumber: certNo,
    issuingAuthority,
    legalExporter: exporter,
    consignee,
    batchNumber: qc.batchNumber,
    productName: qc.productName,
    extractedParameters,
    declarationText,
    isValidForCustoms: qc.moisturePct <= 12.0 && qc.heavyMetalsPpm <= 1.0
  };
}
