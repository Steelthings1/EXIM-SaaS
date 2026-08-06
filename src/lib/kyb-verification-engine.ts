// EXIM.IM SaaS Platform - Module 4: KYB Statutory Verification Engine

export type TaxIdType = 'GSTIN' | 'UAE_TRN' | 'UK_VAT' | 'US_EIN';
export type CreditRiskRating = 'LOW_RISK' | 'MEDIUM_RISK' | 'HIGH_RISK';

export interface KybVerificationRequest {
  taxIdType: TaxIdType;
  taxIdNumber: string;
  annualTurnoverUsd?: number;
  creditLimitRequestedUsd?: number;
}

export interface KybVerificationResult {
  isValidFormat: boolean;
  verificationStatus: 'VERIFIED' | 'INVALID_FORMAT';
  creditRiskRating: CreditRiskRating;
  recommendedCreditLimitUsd: number;
  auditNotes: string;
}

/**
 * Validates statutory tax IDs and calculates corporate credit risk scores.
 */
export function verifyKybStatutoryIdentity(payload: KybVerificationRequest): KybVerificationResult {
  const { taxIdType, taxIdNumber, annualTurnoverUsd = 1000000, creditLimitRequestedUsd = 50000 } = payload;
  const cleanId = taxIdNumber.trim().toUpperCase();

  let isValidFormat = false;

  switch (taxIdType) {
    case 'GSTIN':
      // Indian GSTIN: 15 alphanumeric characters (e.g., 27AAACG1234F1ZN)
      isValidFormat = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(cleanId) || cleanId.length === 15;
      break;

    case 'UAE_TRN':
      // UAE TRN: 15 numeric digits (e.g., 100412890412803)
      isValidFormat = /^[0-9]{15}$/.test(cleanId);
      break;

    case 'UK_VAT':
      // UK VAT: GB followed by 9 digits or 9 digits (e.g., GB123456789)
      isValidFormat = /^GB[0-9]{9}$/.test(cleanId) || /^[0-9]{9}$/.test(cleanId);
      break;

    case 'US_EIN':
    default:
      isValidFormat = cleanId.length >= 9;
      break;
  }

  if (!isValidFormat) {
    return {
      isValidFormat: false,
      verificationStatus: 'INVALID_FORMAT',
      creditRiskRating: 'HIGH_RISK',
      recommendedCreditLimitUsd: 0,
      auditNotes: `Statutory format validation failed for ${taxIdType} number "${taxIdNumber}".`
    };
  }

  // Credit risk rating logic
  const creditRatio = creditLimitRequestedUsd / annualTurnoverUsd;
  let creditRiskRating: CreditRiskRating = 'LOW_RISK';
  if (creditRatio > 0.20) {
    creditRiskRating = 'HIGH_RISK';
  } else if (creditRatio > 0.08) {
    creditRiskRating = 'MEDIUM_RISK';
  }

  const recommendedCreditLimitUsd = Math.min(creditLimitRequestedUsd, annualTurnoverUsd * 0.10);

  return {
    isValidFormat: true,
    verificationStatus: 'VERIFIED',
    creditRiskRating,
    recommendedCreditLimitUsd,
    auditNotes: `Statutory ${taxIdType} format verified successfully. Corporate credit risk assessed as ${creditRiskRating}.`
  };
}
