// EXIM.IM SaaS Platform - Module 17: Country Knowledge Base Engine

export interface CountryProfile {
  countryCode: string;
  countryName: string;
  customsAuthority: string;
  avgImportDutyPct: number;
  standardVatPct: number;
  dualLanguageMandate: string;
  ispm15PalletRequired: boolean;
  ftaAgreements: string[];
  restrictedItems: string[];
}

const COUNTRY_DATABASE: Record<string, CountryProfile> = {
  AE: {
    countryCode: 'AE',
    countryName: 'United Arab Emirates (UAE)',
    customsAuthority: 'Dubai Customs & Federal Customs Authority (FCA)',
    avgImportDutyPct: 0.00, // CEPA FTA Zero Duty
    standardVatPct: 5.00,
    dualLanguageMandate: 'ARABIC_AND_ENGLISH',
    ispm15PalletRequired: true,
    ftaAgreements: ['India-UAE CEPA FTA (Comprehensive Economic Partnership)'],
    restrictedItems: ['Narcotics', 'Unprocessed Foodstuff', 'Non-Halal Meat without Certificate']
  },
  US: {
    countryCode: 'US',
    countryName: 'United States of America',
    customsAuthority: 'U.S. Customs and Border Protection (CBP) & FDA',
    avgImportDutyPct: 3.50,
    standardVatPct: 0.00, // State Sales Tax Applies
    dualLanguageMandate: 'ENGLISH_ONLY',
    ispm15PalletRequired: true,
    ftaAgreements: ['US-India Trade Policy Forum (TPF)'],
    restrictedItems: ['Unapproved Pharmaceuticals', 'Non-FDA Compliant Agro Products']
  },
  GB: {
    countryCode: 'GB',
    countryName: 'United Kingdom (UK)',
    customsAuthority: 'HM Revenue & Customs (HMRC)',
    avgImportDutyPct: 2.80,
    standardVatPct: 20.00,
    dualLanguageMandate: 'ENGLISH_ONLY',
    ispm15PalletRequired: true,
    ftaAgreements: ['UK-India Free Trade Agreement (Proposed)'],
    restrictedItems: ['Endangered Species (CITES)', 'Hazardous Chemicals']
  },
  EU: {
    countryCode: 'EU',
    countryName: 'European Union (EU - Germany/Netherlands/France)',
    customsAuthority: 'European Union Customs Union (EUCU) & EFSA',
    avgImportDutyPct: 4.10,
    standardVatPct: 19.00,
    dualLanguageMandate: 'DESTINATION_MEMBER_STATE_LANGUAGE',
    ispm15PalletRequired: true,
    ftaAgreements: ['EU-India Broad-based Trade and Investment Agreement (BTIA)'],
    restrictedItems: ['Non-CE Marked Machinery', 'Restricted Pesticides']
  },
  SG: {
    countryCode: 'SG',
    countryName: 'Singapore',
    customsAuthority: 'Singapore Customs & SFA',
    avgImportDutyPct: 0.00, // Free Port Status
    standardVatPct: 9.00, // GST
    dualLanguageMandate: 'ENGLISH_ONLY',
    ispm15PalletRequired: true,
    ftaAgreements: ['India-Singapore CECA (Comprehensive Economic Cooperation)'],
    restrictedItems: ['Chewing Gum', 'Controlled Liquors']
  },
  AU: {
    countryCode: 'AU',
    countryName: 'Australia',
    customsAuthority: 'Australian Border Force (ABF) & DAFF',
    avgImportDutyPct: 0.00, // ECTA FTA Zero Duty
    standardVatPct: 10.00, // GST
    dualLanguageMandate: 'ENGLISH_ONLY',
    ispm15PalletRequired: true,
    ftaAgreements: ['India-Australia ECTA (Economic Cooperation and Trade Agreement)'],
    restrictedItems: ['Unprocessed Soil', 'Biosecurity Risk Materials']
  }
};

/**
 * Returns trade specifications, customs rules, and labeling mandates for target export markets.
 */
export function getCountryProfile(countryCode: string): CountryProfile {
  const code = countryCode.toUpperCase();
  return COUNTRY_DATABASE[code] || COUNTRY_DATABASE['AE'];
}

export function getAllCountryProfiles(): CountryProfile[] {
  return Object.values(COUNTRY_DATABASE);
}
