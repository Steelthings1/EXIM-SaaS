// EXIM.IM SaaS Platform - Module 9: Export Sales Quotation & Margin Engine

export type QuoteStatus = 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';

export interface QuotationInput {
  quoteNumber: string;
  buyerName: string;
  incoterm: string;
  currency: string;
  subtotalAmount: number;
  freightAmount?: number;
  insuranceAmount?: number;
  costAmount: number;
  validityDays?: number;
  status?: QuoteStatus;
}

export interface QuotationResult {
  quoteNumber: string;
  buyerName: string;
  incoterm: string;
  currency: string;
  subtotalAmount: number;
  freightAmount: number;
  insuranceAmount: number;
  totalOfferAmount: number;
  costAmount: number;
  grossProfitAmount: number;
  grossMarginPct: number;
  validityDays: number;
  validUntil: string;
  status: QuoteStatus;
}

/**
 * Calculates export quotation totals, freight/insurance additions, gross profit, and gross margin %.
 * Gross Margin = ((Sales - Cost) / Sales) * 100
 */
export function processExportQuotation(payload: QuotationInput): QuotationResult {
  const {
    quoteNumber,
    buyerName,
    incoterm = 'CIF',
    currency = 'USD',
    subtotalAmount,
    freightAmount = 0,
    insuranceAmount = 0,
    costAmount,
    validityDays = 30,
    status = 'DRAFT'
  } = payload;

  const totalOfferAmount = roundToTwo(subtotalAmount + freightAmount + insuranceAmount);
  const grossProfitAmount = roundToTwo(totalOfferAmount - costAmount);
  const grossMarginPct = totalOfferAmount > 0
    ? roundToTwo((grossProfitAmount / totalOfferAmount) * 100)
    : 0;

  const validUntilDate = new Date();
  validUntilDate.setDate(validUntilDate.getDate() + validityDays);

  return {
    quoteNumber,
    buyerName,
    incoterm,
    currency,
    subtotalAmount,
    freightAmount,
    insuranceAmount,
    totalOfferAmount,
    costAmount,
    grossProfitAmount,
    grossMarginPct,
    validityDays,
    validUntil: validUntilDate.toISOString().split('T')[0],
    status
  };
}

function roundToTwo(num: number): number {
  return Math.round(num * 100) / 100;
}
