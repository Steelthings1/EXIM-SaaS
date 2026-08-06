// EXIM.IM SaaS Platform - Bundle B: AI International Sales Contract Auditor (UN CISG 1980)

export interface ContractAuditParams {
  contractNumber: string;
  governingLaw: string; // e.g. 'UN_CISG_1980', 'English Law', 'New York Law'
  arbitrationForum: string; // e.g. 'SIAC_SINGAPORE', 'LCIA_LONDON', 'MCIA_MUMBAI', 'ICC_PARIS'
  incoterms: string; // e.g. 'FOB', 'CIF', 'EXW', 'DDP'
  paymentTerms: string; // e.g. 'LC_AT_SIGHT', 'NET_90_OPEN_ACCOUNT'
  contractValueUsd: number;
}

export interface ContractAuditRiskFlag {
  category: 'GOVERNING_LAW' | 'INCOTERMS_SHIFT' | 'PAYMENT_CREDIT_RISK' | 'DISPUTE_FORUM';
  severity: 'HIGH_RISK' | 'MODERATE_RISK' | 'LOW_RISK';
  title: string;
  finding: string;
  recommendation: string;
}

export interface ContractAuditResult {
  contractNumber: string;
  overallRiskScore: number; // 0 (Lowest Risk) to 100 (Extreme Risk)
  riskRating: 'LOW_RISK' | 'MODERATE_RISK' | 'HIGH_RISK';
  cisgCompliant: boolean;
  findingsCount: number;
  riskFlags: ContractAuditRiskFlag[];
  clauseRecommendations: Record<string, string>;
}

/**
 * Audits international sales contract clauses against UN CISG 1980 rules and trade risk parameters.
 */
export function auditInternationalContract(params: ContractAuditParams): ContractAuditResult {
  const riskFlags: ContractAuditRiskFlag[] = [];
  let riskScore = 10; // Base score

  // 1. Audit Governing Law & CISG
  const isCisg = params.governingLaw.toUpperCase().includes('CISG') || params.governingLaw.toUpperCase().includes('UNITED NATIONS');
  if (!isCisg) {
    riskScore += 25;
    riskFlags.push({
      category: 'GOVERNING_LAW',
      severity: 'MODERATE_RISK',
      title: 'Non-CISG Governing Law Chosen',
      finding: `Governing law is set to ${params.governingLaw} instead of UN CISG 1980.`,
      recommendation: 'Specify UN Convention on Contracts for the International Sale of Goods (CISG 1980) to ensure neutral international sales rules.'
    });
  }

  // 2. Audit Incoterms 2020 Risk Shifts
  if (params.incoterms.toUpperCase() === 'EXW') {
    riskScore += 25;
    riskFlags.push({
      category: 'INCOTERMS_SHIFT',
      severity: 'HIGH_RISK',
      title: 'EXW (Ex Works) Customs Clearance Risk',
      finding: 'Under EXW, the seller has no obligation to file export customs declarations or obtain export licenses.',
      recommendation: 'Upgrade to FCA (Free Carrier) so exporter retains control over export customs clearance and Shipping Bill filings.'
    });
  } else if (params.incoterms.toUpperCase() === 'DDP') {
    riskScore += 20;
    riskFlags.push({
      category: 'INCOTERMS_SHIFT',
      severity: 'MODERATE_RISK',
      title: 'DDP Destination Tax Exposure',
      finding: 'Under DDP, seller is liable for destination country import duties, local VAT, and customs clearance delays.',
      recommendation: 'Ensure destination customs broker is pre-cleared or switch to DAP (Delivered at Place).'
    });
  }

  // 3. Audit Payment Terms & Credit Exposure
  if (params.paymentTerms.toUpperCase().includes('OPEN_ACCOUNT') || params.paymentTerms.toUpperCase().includes('NET_90')) {
    riskScore += 30;
    riskFlags.push({
      category: 'PAYMENT_CREDIT_RISK',
      severity: 'HIGH_RISK',
      title: 'Unsecured Open Account Payment Credit Risk',
      finding: 'Long credit terms (Net 90 Open Account) expose seller to buyer default risk without bank guarantee.',
      recommendation: 'Require Irrevocable Confirmed Letter of Credit (LC at Sight) UCP600 or ECGC Export Credit Insurance policy.'
    });
  }

  // 4. Audit Arbitration Forum
  const validForums = ['SIAC', 'LCIA', 'MCIA', 'ICC', 'HKIAC'];
  const hasValidForum = validForums.some(f => params.arbitrationForum.toUpperCase().includes(f));
  if (!hasValidForum) {
    riskScore += 15;
    riskFlags.push({
      category: 'DISPUTE_FORUM',
      severity: 'LOW_RISK',
      title: 'Non-Standard Arbitration Forum',
      finding: `Dispute forum ${params.arbitrationForum} may lack New York Convention 1958 international enforcement.`,
      recommendation: 'Select SIAC (Singapore International Arbitration Centre) or LCIA (London Court of International Arbitration).'
    });
  }

  const finalRiskScore = Math.min(100, riskScore);
  const riskRating = finalRiskScore >= 50 ? 'HIGH_RISK' : finalRiskScore >= 25 ? 'MODERATE_RISK' : 'LOW_RISK';

  return {
    contractNumber: params.contractNumber,
    overallRiskScore: finalRiskScore,
    riskRating,
    cisgCompliant: isCisg,
    findingsCount: riskFlags.length,
    riskFlags,
    clauseRecommendations: {
      'Article 35 CISG (Goods Conformity)': 'Seller guarantees goods match sample specs and fit for purpose.',
      'Article 79 CISG (Force Majeure)': 'Standard UN CISG 1980 Force Majeure relief for unexpected trade embargoes or blockades.',
      'Incoterms 2020': `Risk transfers from seller to buyer under ${params.incoterms} at designated loading/discharge point.`
    }
  };
}
