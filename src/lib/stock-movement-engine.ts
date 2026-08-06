// EXIM.IM SaaS Platform - Module 5: Stock Movement & Reorder Engine

export type MovementType = 'INWARD_RECEIPT' | 'OUTWARD_DISPATCH' | 'INTER_WAREHOUSE_TRANSFER' | 'BIN_ADJUSTMENT';

export interface StockMovementRequest {
  batchId: string;
  warehouseId: string;
  movementType: MovementType;
  quantity: number;
  currentStock: number;
  minReorderLevel?: number;
  referenceDocNumber?: string;
}

export interface StockMovementResult {
  success: boolean;
  previousStock: number;
  newStock: number;
  reorderAlertTriggered: boolean;
  errorMessage?: string;
  referenceDocNumber: string;
}

/**
 * Calculates updated stock balances, enforces insufficient stock guards, and evaluates reorder thresholds.
 */
export function executeStockMovement(payload: StockMovementRequest): StockMovementResult {
  const { batchId, warehouseId, movementType, quantity, currentStock, minReorderLevel = 500, referenceDocNumber } = payload;
  const docNum = referenceDocNumber || `MOV-${Date.now()}`;

  if (quantity <= 0) {
    return {
      success: false,
      previousStock: currentStock,
      newStock: currentStock,
      reorderAlertTriggered: currentStock < minReorderLevel,
      errorMessage: 'Quantity must be greater than zero.',
      referenceDocNumber: docNum
    };
  }

  let newStock = currentStock;

  if (movementType === 'INWARD_RECEIPT' || movementType === 'BIN_ADJUSTMENT') {
    newStock = currentStock + quantity;
  } else if (movementType === 'OUTWARD_DISPATCH' || movementType === 'INTER_WAREHOUSE_TRANSFER') {
    if (currentStock < quantity) {
      return {
        success: false,
        previousStock: currentStock,
        newStock: currentStock,
        reorderAlertTriggered: currentStock < minReorderLevel,
        errorMessage: `Insufficient stock balance! Available: ${currentStock}, Requested dispatch: ${quantity}.`,
        referenceDocNumber: docNum
      };
    }
    newStock = currentStock - quantity;
  }

  const reorderAlertTriggered = newStock < minReorderLevel;

  return {
    success: true,
    previousStock: currentStock,
    newStock,
    reorderAlertTriggered,
    referenceDocNumber: docNum
  };
}
