// EXIM.IM SaaS Platform - Module 18: Statutory License Engine

export type LicenseType = 'IEC' | 'RCMC' | 'AD_CODE' | 'APEDA' | 'FSSAI' | 'ICEGATE_PORT';

export interface StatutoryLicense {
  licenseId: string;
  licenseType: LicenseType;
  licenseNumber: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  status: 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED';
  daysRemaining: number;
}

export interface LicenseValidationResult {
  isValid: boolean;
  licenseNumber: string;
  licenseType: LicenseType;
  status: string;
  renewalAlertRequired: boolean;
  message: string;
}

/**
 * Calculates days remaining until license expiry and returns status.
 */
export function evaluateLicenseExpiry(expiryDateStr: string): { daysRemaining: number; status: 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' } {
  const expiry = new Date(expiryDateStr);
  const now = new Date();
  const diffMs = expiry.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  let status: 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' = 'ACTIVE';
  if (daysRemaining <= 0) {
    status = 'EXPIRED';
  } else if (daysRemaining <= 30) {
    status = 'EXPIRING_SOON';
  }

  return { daysRemaining, status };
}

/**
 * Validates a statutory license record.
 */
export function validateStatutoryLicense(license: StatutoryLicense): LicenseValidationResult {
  const { daysRemaining, status } = evaluateLicenseExpiry(license.expiryDate);
  const renewalAlertRequired = status === 'EXPIRING_SOON' || status === 'EXPIRED';

  let message = `License ${license.licenseNumber} is active with ${daysRemaining} days remaining.`;
  if (status === 'EXPIRED') {
    message = `CRITICAL: License ${license.licenseNumber} EXPIRED ${Math.abs(daysRemaining)} days ago! Exports blocked.`;
  } else if (status === 'EXPIRING_SOON') {
    message = `WARNING: License ${license.licenseNumber} expires in ${daysRemaining} days. Renewal required immediately.`;
  }

  return {
    isValid: status !== 'EXPIRED',
    licenseNumber: license.licenseNumber,
    licenseType: license.licenseType,
    status,
    renewalAlertRequired,
    message
  };
}
