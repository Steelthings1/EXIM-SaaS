// EXIM.IM SaaS Platform - Country Knowledge Base API Endpoint

export async function GET(request: Request) {
  const sampleCountries = [
    {
      country_code: 'ARE',
      country_name: 'United Arab Emirates (UAE)',
      customs_authority: 'Federal Customs Authority / Dubai Customs',
      mandatory_certs: ['PHYTOSANITARY', 'CERTIFICATE_OF_ANALYSIS', 'HALAL'],
      food_labeling_rules: 'Dual-language English/Arabic packaging labels required with production/expiry dates.',
      fta_agreements: ['India-UAE CEPA (Comprehensive Economic Partnership Agreement)']
    },
    {
      country_code: 'USA',
      country_name: 'United States of America',
      customs_authority: 'U.S. Customs and Border Protection (CBP) & US FDA',
      mandatory_certs: ['FDA_PRIOR_NOTICE', 'CERTIFICATE_OF_ANALYSIS'],
      food_labeling_rules: 'US FDA Nutrition Facts panel with net weight in oz/g and allergen statements.',
      fta_agreements: ['GSP (Generalized System of Preferences)']
    }
  ];

  return Response.json({ success: true, count: sampleCountries.length, data: sampleCountries });
}
