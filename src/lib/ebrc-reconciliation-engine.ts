// EXIM.IM SaaS Platform - Bundle E: eBRC Reconciliation & Export Incentive Engine

export interface EbrcReconciliationParams {
  shippingBillNumber: string;
  shippingBillDate: string;
  fobValueUsd: number;
  irmReference: string;
  realizedAmountFcUsd: number;
  realizedExchangeRateInr: number; // e.g. 83.50 INR per USD
  rodtepRatePct?: number; // Default 1.4%
  drawbackRatePct?: number; // Default 1.5%
}

export interface EbrcReconciliationResult {
  ebrcNumber: string;
  shippingBillNumber: string;
  irmReference: string;
  fobValueUsd: number;
  realizedAmountInr: number;
  edpmsStatus: 'CLOSED' | 'PARTIALLY_REALIZED' | 'PENDING';
  exportIncentives: {
    rodtepRatePct: number;
    rodtepAmountInr: number;
    drawbackRatePct: number;
    drawbackAmountInr: number;
    totalIncentiveInr: number;
  };
}

/**
 * Reconciles Inward Remittance (IRM) with Shipping Bill for RBI EDPMS closure and computes DGFT RoDTEP / Duty Drawback.
 */
export function reconcileEbrcAndIncentives(params: EbrcReconciliationParams): EbrcReconciliationResult {
  const ebrcNo = `EBRC-2026-SBI-${Date.now().toString().slice(-6)}`;
  const rateInr = params.realizedExchangeRateInr || 83.50;
  
  const realizedInr = Number((params.realizedAmountFcUsd * rateInr).toFixed(2));
  const fobInr = Number((params.fobValueUsd * rateInr).toFixed(2));

  const rodtepPct = params.rodtepRatePct ?? 1.40;
  const drawbackPct = params.drawbackRatePct ?? 1.50;

  const rodtepInr = Number(((fobInr * rodtepPct) / 100).toFixed(2));
  const drawbackInr = Number(((fobInr * drawbackPct) / 100).toFixed(2));

  const isFullRealization = params.realizedAmountFcUsd >= params.fobValueUsd;
  const edpmsStatus = isFullRealization ? 'CLOSED' : 'PARTIALLY_REALIZED';

  return {
    ebrcNumber: ebrcNo,
    shippingBillNumber: params.shippingBillNumber,
    irmReference: params.irmReference,
    fobValueUsd: params.fobValueUsd,
    realizedAmountInr: realizedInr,
    edpmsStatus,
    exportIncentives: {
      rodtepRatePct: rodtepPct,
      rodtepAmountInr: rodtepInr,
      drawbackRatePct: drawbackPct,
      drawbackAmountInr: drawbackInr,
      totalIncentiveInr: Number((rodtepInr + drawbackInr).toFixed(2))
    }
  };
}
