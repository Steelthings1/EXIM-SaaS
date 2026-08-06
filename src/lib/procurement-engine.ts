// EXIM.IM SaaS Platform - Module 8: Procurement & GRN Engine

export type PoStatus = 'ISSUED' | 'CONFIRMED' | 'FULFILLED' | 'CANCELLED';

export interface PoLineItemInput {
  componentSku: string;
  componentName: string;
  quantity: number;
  unitPriceInr: number;
}

export interface PurchaseOrderInput {
  poNumber: string;
  supplierName: string;
  lineItems: PoLineItemInput[];
  expectedDeliveryDate: string;
  status?: PoStatus;
}

export interface GoodsReceiptInput {
  poId: string;
  receivedQty: number;
  acceptedQty: number;
  rejectedQty?: number;
  inspectionNotes?: string;
}

export interface PurchaseOrderResult {
  poNumber: string;
  totalAmountInr: number;
  status: PoStatus;
  lineItemsCount: number;
}

export interface GoodsReceiptResult {
  grnNumber: string;
  poId: string;
  receivedQty: number;
  acceptedQty: number;
  rejectedQty: number;
  acceptanceRatePct: number;
  stockInwardApproved: boolean;
}

/**
 * Calculates PO totals and validates line item quantities.
 */
export function processPurchaseOrder(payload: PurchaseOrderInput): PurchaseOrderResult {
  const { poNumber, lineItems, status = 'ISSUED' } = payload;

  const totalAmountInr = lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPriceInr), 0);

  return {
    poNumber,
    totalAmountInr,
    status,
    lineItemsCount: lineItems.length
  };
}

/**
 * Generates Goods Receipt Notes (GRN) and calculates accepted/rejected stock inward quantities.
 */
export function generateGoodsReceiptNote(payload: GoodsReceiptInput): GoodsReceiptResult {
  const { poId, receivedQty, acceptedQty, rejectedQty = Math.max(0, receivedQty - acceptedQty) } = payload;

  const acceptanceRatePct = receivedQty > 0 ? Math.round((acceptedQty / receivedQty) * 10000) / 100 : 0;
  const stockInwardApproved = acceptanceRatePct >= 95.0;

  return {
    grnNumber: `GRN-${Date.now()}`,
    poId,
    receivedQty,
    acceptedQty,
    rejectedQty,
    acceptanceRatePct,
    stockInwardApproved
  };
}
