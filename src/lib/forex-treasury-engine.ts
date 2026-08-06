// EXIM.IM SaaS Platform - Module 20: Forex Treasury & Invoicing Engine

export interface CommercialInvoicePayload {
  invoiceNumber: string;
  buyerName: string;
  currency: string;
  foreignAmount: number;
  invoiceExchangeRate: number; // e.g., 83.50 INR per USD
  lutReference?: string;
}

export interface CommercialInvoiceResult {
  invoiceId: string;
  invoiceNumber: string;
  buyerName: string;
  currency: string;
  foreignAmount: number;
  invoiceExchangeRate: number;
  baseAmountInr: number;
  lutReference: string;
  isLutZeroRated: boolean;
}

export interface ForexRealizationInput {
  invoiceNumber: string;
  foreignAmountReceived: number;
  invoiceExchangeRate: number; // Booking rate at invoice date
  bankRealizedExchangeRate: number; // Bank conversion rate at remittance date
  irmReference: string;
}

export interface ForexRealizationResult {
  realizationId: string;
  invoiceNumber: string;
  foreignAmountReceived: number;
  invoiceExchangeRate: number;
  bankRealizedExchangeRate: number;
  bookedBaseAmountInr: number;
  realizedAmountInr: number;
  fxGainLossInr: number;
  isGain: boolean;
  irmReference: string;
}

/**
 * Creates multi-currency invoice record and calculates base INR amount.
 */
export function createCommercialInvoice(payload: CommercialInvoicePayload): CommercialInvoiceResult {
  const {
    invoiceNumber,
    buyerName,
    currency = 'USD',
    foreignAmount,
    invoiceExchangeRate,
    lutReference = 'LUT-GST-2026-9041'
  } = payload;

  const baseAmountInr = round2(foreignAmount * invoiceExchangeRate);

  return {
    invoiceId: `INV-EXIM-${Date.now()}`,
    invoiceNumber,
    buyerName,
    currency,
    foreignAmount,
    invoiceExchangeRate,
    baseAmountInr,
    lutReference,
    isLutZeroRated: true
  };
}

/**
 * Evaluates spot vs bank remittance exchange rate realization and computes FX gain or loss in INR.
 */
export function calculateForexRealization(payload: ForexRealizationInput): ForexRealizationResult {
  const {
    invoiceNumber,
    foreignAmountReceived,
    invoiceExchangeRate,
    bankRealizedExchangeRate,
    irmReference
  } = payload;

  const bookedBaseAmountInr = round2(foreignAmountReceived * invoiceExchangeRate);
  const realizedAmountInr = round2(foreignAmountReceived * bankRealizedExchangeRate);
  const fxGainLossInr = round2(realizedAmountInr - bookedBaseAmountInr);

  return {
    realizationId: `FX-REAL-${Date.now()}`,
    invoiceNumber,
    foreignAmountReceived,
    invoiceExchangeRate,
    bankRealizedExchangeRate,
    bookedBaseAmountInr,
    realizedAmountInr,
    fxGainLossInr,
    isGain: fxGainLossInr >= 0,
    irmReference
  };
}

function round2(val: number): number {
  return Math.round(val * 100) / 100;
}
