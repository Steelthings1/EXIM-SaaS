// EXIM.IM SaaS Platform - Module 27: Workspace Config Engine V2

export interface WorkspaceConfigV2Input {
  defaultCurrency: string;
  systemTimezone: string;
  regionalTaxSystem: 'INDIA_GST' | 'UAE_VAT' | 'US_SALES_TAX' | 'UK_EU_VAT';
  customSubdomain: string;
  logoUrl?: string;
  letterheadHeaderText: string;
  letterheadFooterText: string;
}

export interface FormattedLetterhead {
  headerBanner: string;
  footerBanner: string;
  taxLabel: string;
  formattedAt: string;
}

/**
 * Formats official export document letterhead header and footer banners with regional tax labels.
 */
export function formatLetterhead(input: WorkspaceConfigV2Input): FormattedLetterhead {
  let taxLabel = 'GSTIN: 33AAAAA0000A1Z5';
  if (input.regionalTaxSystem === 'UAE_VAT') {
    taxLabel = 'TRN: 100029384700003';
  } else if (input.regionalTaxSystem === 'US_SALES_TAX') {
    taxLabel = 'EIN: 98-7654321';
  } else if (input.regionalTaxSystem === 'UK_EU_VAT') {
    taxLabel = 'VAT Reg: GB123456789';
  }

  const headerBanner = `[OFFICIAL EXPORT DOCUMENT] ${input.letterheadHeaderText.toUpperCase()} | ${taxLabel}`;
  const footerBanner = `${input.letterheadFooterText} | Powered by EXIM.IM SaaS Platform (${input.systemTimezone})`;

  return {
    headerBanner,
    footerBanner,
    taxLabel,
    formattedAt: new Date().toISOString()
  };
}
