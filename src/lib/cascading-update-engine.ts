// EXIM.IM SaaS Platform - Module 6: Cascading Field Dependency & Version Engine
import crypto from 'crypto';

export interface MasterOrderInput {
  orderId: string;
  itemQuantity: number;
  unitPriceUsd: number;
  freightCostUsd?: number;
  insuranceCostUsd?: number;
  weightPerUnitKg?: number;
  cbmPerUnit?: number;
}

export interface DownstreamDocumentImpact {
  documentType: string;
  updatedFields: Record<string, string | number>;
}

export interface CascadingUpdateResult {
  orderId: string;
  subtotalUsd: number;
  cifTotalUsd: number;
  totalGrossWeightKg: number;
  totalCbmVolume: number;
  impactedDocuments: DownstreamDocumentImpact[];
  sha256Checksum: string;
  versionNumber: number;
}

/**
 * Propagates master order field edits across all downstream trade documents (Invoices, Packing Lists, Shipping Bills, CoOs).
 */
export function processCascadingUpdate(payload: MasterOrderInput, currentVersion: number = 1): CascadingUpdateResult {
  const {
    orderId,
    itemQuantity,
    unitPriceUsd,
    freightCostUsd = 2500,
    insuranceCostUsd = 250,
    weightPerUnitKg = 0.25,
    cbmPerUnit = 0.0012
  } = payload;

  const subtotalUsd = itemQuantity * unitPriceUsd;
  const cifTotalUsd = subtotalUsd + freightCostUsd + insuranceCostUsd;
  const totalGrossWeightKg = itemQuantity * weightPerUnitKg;
  const totalCbmVolume = itemQuantity * cbmPerUnit;

  const impactedDocuments: DownstreamDocumentImpact[] = [
    {
      documentType: 'COMMERCIAL_INVOICE',
      updatedFields: {
        total_subtotal_usd: subtotalUsd,
        freight_charges_usd: freightCostUsd,
        insurance_charges_usd: insuranceCostUsd,
        grand_total_cif_usd: cifTotalUsd
      }
    },
    {
      documentType: 'PACKING_LIST',
      updatedFields: {
        total_item_quantity: itemQuantity,
        total_gross_weight_kg: totalGrossWeightKg,
        total_cbm_volume: totalCbmVolume
      }
    },
    {
      documentType: 'SHIPPING_BILL',
      updatedFields: {
        fob_value_inr: subtotalUsd * 83.50,
        cif_value_inr: cifTotalUsd * 83.50
      }
    },
    {
      documentType: 'CERTIFICATE_OF_ORIGIN',
      updatedFields: {
        conignment_gross_weight_kg: totalGrossWeightKg
      }
    }
  ];

  const payloadString = JSON.stringify({ orderId, cifTotalUsd, totalGrossWeightKg, currentVersion: currentVersion + 1 });
  const sha256Checksum = crypto.createHash('sha256').update(payloadString).digest('hex');

  return {
    orderId,
    subtotalUsd,
    cifTotalUsd,
    totalGrossWeightKg,
    totalCbmVolume,
    impactedDocuments,
    sha256Checksum,
    versionNumber: currentVersion + 1
  };
}
