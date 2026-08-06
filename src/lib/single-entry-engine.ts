// EXIM.IM SaaS Platform - Bundle A: Single-Entry Trade Data Propagation Engine

export interface OrderItemInput {
  productId: string;
  sku: string;
  productName: string;
  hsCode: string;
  qty: number;
  unitPriceUsd: number;
  netWeightKgPerUnit: number;
  grossWeightKgPerUnit: number;
  cbmPerUnit: number;
  unitsPerCarton: number;
}

export interface SingleEntryOrderPayload {
  orderNumber: string;
  buyerName: string;
  buyerTaxId: string;
  buyerAddress: string;
  sellerName: string;
  sellerTaxId: string;
  sellerAddress: string;
  incoterms: 'FOB' | 'CIF' | 'CFR' | 'EXW' | 'DDP';
  currency: string;
  portOfLoading: string;
  portOfDischarge: string;
  vesselName?: string;
  freightCostUsd: number;
  insuranceCostUsd: number;
  items: OrderItemInput[];
}

export interface SingleEntryCalculationResult {
  orderNumber: string;
  subtotalUsd: number;
  freightCostUsd: number;
  insuranceCostUsd: number;
  totalCifUsd: number;
  totalNetWeightKg: number;
  totalGrossWeightKg: number;
  totalVolumeCbm: number;
  totalCartons: number;
  lineItemsCalculated: Array<OrderItemInput & {
    lineSubtotalUsd: number;
    lineNetWeightKg: number;
    lineGrossWeightKg: number;
    lineCbm: number;
    lineCartons: number;
  }>;
  generatedDocuments: {
    commercialInvoice: { invoiceNo: string; totalAmountUsd: number; paymentTerms: string };
    packingList: { packingListNo: string; totalPackages: number; totalGrossWeightKg: number; totalCbm: number };
    certificateOfOrigin: { cooNo: string; countryOfOrigin: string; portOfLoading: string };
    purchaseOrder: { poNo: string; vendorName: string; totalAmountUsd: number };
    shippingInstructions: { bookingRefNo: string; portOfDischarge: string; containerType: string };
  };
}

/**
 * Executes Single-Entry data propagation math across trade order line items.
 */
export function calculateSingleEntryOrder(payload: SingleEntryOrderPayload): SingleEntryCalculationResult {
  let subtotalUsd = 0;
  let totalNetWeightKg = 0;
  let totalGrossWeightKg = 0;
  let totalVolumeCbm = 0;
  let totalCartons = 0;

  const lineItemsCalculated = payload.items.map((item) => {
    const lineSubtotalUsd = Number((item.qty * item.unitPriceUsd).toFixed(2));
    const lineNetWeightKg = Number((item.qty * item.netWeightKgPerUnit).toFixed(3));
    const lineGrossWeightKg = Number((item.qty * item.grossWeightKgPerUnit).toFixed(3));
    const lineCbm = Number((item.qty * item.cbmPerUnit).toFixed(4));
    const lineCartons = Math.ceil(item.qty / (item.unitsPerCarton || 1));

    subtotalUsd += lineSubtotalUsd;
    totalNetWeightKg += lineNetWeightKg;
    totalGrossWeightKg += lineGrossWeightKg;
    totalVolumeCbm += lineCbm;
    totalCartons += lineCartons;

    return {
      ...item,
      lineSubtotalUsd,
      lineNetWeightKg,
      lineGrossWeightKg,
      lineCbm,
      lineCartons
    };
  });

  const totalCifUsd = Number((subtotalUsd + payload.freightCostUsd + payload.insuranceCostUsd).toFixed(2));
  totalNetWeightKg = Number(totalNetWeightKg.toFixed(3));
  totalGrossWeightKg = Number(totalGrossWeightKg.toFixed(3));
  totalVolumeCbm = Number(totalVolumeCbm.toFixed(4));

  // Determine container recommendation (20ft FCL is ~33 CBM, 40ft HC is ~76 CBM)
  const containerType = totalVolumeCbm <= 28 ? '1x 20ft FCL Container' : totalVolumeCbm <= 68 ? '1x 40ft HC FCL Container' : '2x 40ft HC FCL Containers';

  return {
    orderNumber: payload.orderNumber,
    subtotalUsd: Number(subtotalUsd.toFixed(2)),
    freightCostUsd: payload.freightCostUsd,
    insuranceCostUsd: payload.insuranceCostUsd,
    totalCifUsd,
    totalNetWeightKg,
    totalGrossWeightKg,
    totalVolumeCbm,
    totalCartons,
    lineItemsCalculated,
    generatedDocuments: {
      commercialInvoice: {
        invoiceNo: `INV-${payload.orderNumber}`,
        totalAmountUsd: totalCifUsd,
        paymentTerms: 'Letter of Credit (LC at Sight) / Wire Transfer'
      },
      packingList: {
        packingListNo: `PKL-${payload.orderNumber}`,
        totalPackages: totalCartons,
        totalGrossWeightKg,
        totalCbm: totalVolumeCbm
      },
      certificateOfOrigin: {
        cooNo: `COO-IND-2026-${payload.orderNumber}`,
        countryOfOrigin: 'India (IND)',
        portOfLoading: payload.portOfLoading
      },
      purchaseOrder: {
        poNo: `PO-${payload.orderNumber}`,
        vendorName: payload.sellerName,
        totalAmountUsd: subtotalUsd
      },
      shippingInstructions: {
        bookingRefNo: `SI-MSK-2026-${payload.orderNumber}`,
        portOfDischarge: payload.portOfDischarge,
        containerType
      }
    }
  };
}
