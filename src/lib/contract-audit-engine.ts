// EXIM.IM SaaS Platform - Module 10: AI Contract Legal Risk Auditor Engine

export type ContractStatus = 'DRAFT' | 'PENDING_SIGNATURE' | 'EXECUTED' | 'TERMINATED';

export interface ContractInput {
  contractNumber: string;
  buyerEntity: string;
  sellerEntity: string;
  incoterm: string;
  governingLaw?: string;
  arbitrationVenue?: string;
  totalValueUsd: number;
  paymentTerms?: string;
  paymentCreditDays?: number;
  status?: ContractStatus;
}

export interface ContractAuditResult {
  contractNumber: string;
  buyerEntity: string;
  sellerEntity: string;
  incoterm: string;
  governingLaw: string;
  arbitrationVenue: string;
  totalValueUsd: number;
  paymentTerms: string;
  paymentCreditDays: number;
  aiRiskScore: number;
  aiRiskNotes: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: ContractStatus;
}

/**
 * Evaluates international sale of goods agreements against UN CISG 1980 rules,
 * Incoterms 2020 risk points, and open account credit terms.
 */
export function auditContractLegalRisk(payload: ContractInput): ContractAuditResult {
  const {
    contractNumber,
    buyerEntity,
    sellerEntity,
    incoterm = 'CIF',
    governingLaw = 'UN CISG 1980',
    arbitrationVenue = 'SIAC Singapore',
    totalValueUsd,
    paymentTerms = 'Irrevocable LC at Sight',
    paymentCreditDays = 0,
    status = 'DRAFT'
  } = payload;

  let riskScore = 0;
  const riskNotes: string[] = [];

  // Incoterm liability risk assessment
  if (incoterm === 'EXW') {
    riskScore += 15;
    riskNotes.push('EXW Incoterm: Buyer bears all risks from seller premises. No export clearance obligation on seller — verify buyer\'s export capability.');
  } else if (incoterm === 'DDP') {
    riskScore += 25;
    riskNotes.push('DDP Incoterm: Seller bears maximum liability including destination import duties, VAT, and customs clearance. High tax exposure risk.');
  } else if (incoterm === 'FCA') {
    riskScore += 10;
    riskNotes.push('FCA Incoterm: Risk transfers at named place of delivery. Verify carrier appointment and insurance coverage gaps.');
  } else if (incoterm === 'CIF' || incoterm === 'CFR') {
    riskScore += 5;
    riskNotes.push(`${incoterm} Incoterm: Risk transfers at port of shipment. Standard marine cargo insurance coverage recommended.`);
  }

  // Open account credit terms risk
  if (paymentCreditDays > 90) {
    riskScore += 20;
    riskNotes.push(`Extended credit terms: ${paymentCreditDays} days exceeds 90-day safe limit. Recommend credit insurance or bank guarantee.`);
  } else if (paymentCreditDays > 60) {
    riskScore += 10;
    riskNotes.push(`Credit terms: ${paymentCreditDays} days. Monitor buyer credit rating and consider partial advance payment.`);
  }

  // High-value open account exposure
  if (totalValueUsd > 50000 && paymentTerms.toLowerCase().includes('open account')) {
    riskScore += 15;
    riskNotes.push('Open account payment above $50,000 threshold. Recommend Letter of Credit or bank-backed payment instrument.');
  }

  // Governing law verification
  if (!governingLaw.includes('CISG')) {
    riskScore += 5;
    riskNotes.push('Contract does not reference UN CISG 1980. Consider adopting CISG for uniform international sales governance.');
  }

  // Determine risk level
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  if (riskScore >= 40) riskLevel = 'CRITICAL';
  else if (riskScore >= 25) riskLevel = 'HIGH';
  else if (riskScore >= 15) riskLevel = 'MEDIUM';
  else riskLevel = 'LOW';

  if (riskNotes.length === 0) {
    riskNotes.push('No significant legal risks identified. Contract terms are compliant with standard international trade practices.');
  }

  return {
    contractNumber,
    buyerEntity,
    sellerEntity,
    incoterm,
    governingLaw,
    arbitrationVenue,
    totalValueUsd,
    paymentTerms,
    paymentCreditDays,
    aiRiskScore: riskScore,
    aiRiskNotes: riskNotes,
    riskLevel,
    status
  };
}
