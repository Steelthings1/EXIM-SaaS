// EXIM.IM SaaS Platform - Module 7: Manufacturing & Production Batch Engine

export type ProductionStatus = 'SCHEDULED' | 'IN_PRODUCTION' | 'QC_PENDING' | 'COMPLETED' | 'REJECTED';

export interface ProductionBatchInput {
  batchNumber: string;
  productionLine: string;
  targetYieldQty: number;
  actualYieldQty?: number;
  status?: ProductionStatus;
}

export interface ProductionBatchResult {
  batchNumber: string;
  targetYieldQty: number;
  actualYieldQty: number;
  yieldEfficiencyPct: number;
  status: ProductionStatus;
  isCompliantYield: boolean;
  notes: string;
}

/**
 * Calculates batch yield efficiency, enforces a minimum 90.0% threshold, and updates production status transitions.
 */
export function processProductionBatch(payload: ProductionBatchInput): ProductionBatchResult {
  const { batchNumber, targetYieldQty, actualYieldQty = 0, status = 'QC_PENDING' } = payload;

  const yieldEfficiencyPct = targetYieldQty > 0 ? roundToTwo((actualYieldQty / targetYieldQty) * 100) : 0;
  const isCompliantYield = yieldEfficiencyPct >= 90.0;

  let finalStatus: ProductionStatus = status;
  let notes = `Batch yield efficiency calculated as ${yieldEfficiencyPct}%.`;

  if (actualYieldQty > 0) {
    if (!isCompliantYield) {
      finalStatus = 'REJECTED';
      notes = `Batch rejected! Yield efficiency ${yieldEfficiencyPct}% is below the mandatory 90.0% minimum threshold.`;
    } else if (status === 'QC_PENDING' || status === 'IN_PRODUCTION') {
      finalStatus = 'COMPLETED';
      notes = `Batch completed successfully with ${yieldEfficiencyPct}% yield efficiency. Ready for QC inspection.`;
    }
  }

  return {
    batchNumber,
    targetYieldQty,
    actualYieldQty,
    yieldEfficiencyPct,
    status: finalStatus,
    isCompliantYield,
    notes
  };
}

function roundToTwo(num: number): number {
  return Math.round(num * 100) / 100;
}
