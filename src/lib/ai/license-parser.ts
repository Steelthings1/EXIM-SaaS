// EXIM.IM SaaS Platform - Module 1: AI Statutory License Vision Parser & Validation

export interface LicenseParseResult {
  success: boolean;
  licenseType: 'GSTIN' | 'IEC' | 'EORI' | 'PAN' | 'UNKNOWN';
  licenseNumber: string;
  issuingAuthority: string;
  legalEntityName?: string;
  issueDate?: string;
  expiryDate?: string;
  isValidFormat: boolean;
  confidenceScore: number;
  extractedFields: Record<string, string>;
  validationErrors: string[];
}

// Statutory Document Regex Patterns
export const REGEX_PATTERNS = {
  GSTIN: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  IEC: /^[A-Z0-9]{10}$/,
  EORI: /^[A-Z]{2}[A-Z0-9]{1,15}$/,
  PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
};

/**
 * Validates statutory document format using regulatory regex standards.
 */
export function validateStatutoryFormat(licenseType: string, licenseNumber: string): { isValid: boolean; error?: string } {
  const cleanNumber = licenseNumber.trim().toUpperCase();

  switch (licenseType.toUpperCase()) {
    case 'GSTIN':
      if (!REGEX_PATTERNS.GSTIN.test(cleanNumber)) {
        return { isValid: false, error: 'Invalid GSTIN format. Must be 15 alphanumeric characters matching standard GSTIN schema (e.g., 27AAACA1234A1Z5).' };
      }
      break;
    case 'IEC':
      if (!REGEX_PATTERNS.IEC.test(cleanNumber)) {
        return { isValid: false, error: 'Invalid IEC format. Must be 10 alphanumeric characters issued by DGFT (e.g., 0304005001).' };
      }
      break;
    case 'EORI':
      if (!REGEX_PATTERNS.EORI.test(cleanNumber)) {
        return { isValid: false, error: 'Invalid EORI format. Must start with ISO 2-letter country code followed by up to 15 alphanumeric characters (e.g., GB123456789000).' };
      }
      break;
    case 'PAN':
      if (!REGEX_PATTERNS.PAN.test(cleanNumber)) {
        return { isValid: false, error: 'Invalid PAN format. Must be 10 characters: 5 letters, 4 digits, 1 letter (e.g., AAACA1234A).' };
      }
      break;
    default:
      return { isValid: true };
  }

  return { isValid: true };
}

/**
 * Simulates AI OCR Vision Parsing for Statutory Certificates (GST, IEC, EORI, PAN).
 */
export async function parseLicenseDocument(fileBuffer: Buffer | string, filename: string): Promise<LicenseParseResult> {
  const lowerName = filename.toLowerCase();
  
  let licenseType: 'GSTIN' | 'IEC' | 'EORI' | 'PAN' | 'UNKNOWN' = 'UNKNOWN';
  let licenseNumber = '';
  let issuingAuthority = 'Government Authority';
  let legalEntityName = 'Apex Global Logistics & Trading Pvt Ltd';

  if (lowerName.includes('gst') || lowerName.includes('gstin')) {
    licenseType = 'GSTIN';
    licenseNumber = '27AAACA1234A1Z5';
    issuingAuthority = 'Goods and Services Tax Network (GSTN India)';
  } else if (lowerName.includes('iec') || lowerName.includes('dgft')) {
    licenseType = 'IEC';
    licenseNumber = '0304005001';
    issuingAuthority = 'Directorate General of Foreign Trade (DGFT)';
  } else if (lowerName.includes('eori') || lowerName.includes('customs')) {
    licenseType = 'EORI';
    licenseNumber = 'GB123456789000';
    issuingAuthority = 'HM Revenue & Customs (HMRC UK)';
  } else if (lowerName.includes('pan')) {
    licenseType = 'PAN';
    licenseNumber = 'AAACA1234A';
    issuingAuthority = 'Income Tax Department of India';
  } else {
    // Default fallback mock parse
    licenseType = 'GSTIN';
    licenseNumber = '27AAACA1234A1Z5';
    issuingAuthority = 'GSTN Central Board of Indirect Taxes & Customs';
  }

  const formatCheck = validateStatutoryFormat(licenseType, licenseNumber);

  return {
    success: formatCheck.isValid,
    licenseType,
    licenseNumber,
    issuingAuthority,
    legalEntityName,
    issueDate: '2021-04-01',
    expiryDate: licenseType === 'PAN' ? undefined : '2031-03-31',
    isValidFormat: formatCheck.isValid,
    confidenceScore: 0.98,
    extractedFields: {
      'Legal Name': legalEntityName,
      'License Number': licenseNumber,
      'Issuing Body': issuingAuthority,
      'Jurisdiction': 'State of Maharashtra / DGFT India'
    },
    validationErrors: formatCheck.isValid ? [] : [formatCheck.error || 'Validation failed']
  };
}
