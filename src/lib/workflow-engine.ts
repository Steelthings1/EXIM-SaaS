// EXIM.IM SaaS Platform - Bundle B: 26-Step Trade Pipeline Workflow Engine

export interface PipelineStage {
  stepIndex: number;
  stageCode: string;
  stageName: string;
  category: 'PRE_CONTRACT' | 'COMMERCIAL' | 'PRODUCTION' | 'CUSTOMS_CLEARANCE' | 'LOGISTICS_TRANSIT' | 'FINANCE_REALIZATION';
  progressPct: number;
  description: string;
}

export const PIPELINE_STAGES_26: PipelineStage[] = [
  { stepIndex: 1, stageCode: 'INQUIRY_LEAD', stageName: '1. Buyer Inquiry & Lead Capture', category: 'PRE_CONTRACT', progressPct: 4, description: 'Initial buyer RFQ received and logged into CRM.' },
  { stepIndex: 2, stageCode: 'SANCTIONS_CLEARED', stageName: '2. Sanctions & KYB Cleared', category: 'PRE_CONTRACT', progressPct: 8, description: 'OFAC/UN denied party and KYB background verification completed.' },
  { stepIndex: 3, stageCode: 'PROFORMA_ISSUED', stageName: '3. Proforma Quotation Issued', category: 'COMMERCIAL', progressPct: 12, description: 'Commercial Proforma Invoice sent to buyer with Incoterms and price validity.' },
  { stepIndex: 4, stageCode: 'CONTRACT_EXECUTED', stageName: '4. CISG Sales Contract Executed', category: 'COMMERCIAL', progressPct: 16, description: 'International Sales Agreement signed with CISG 1980 governing law.' },
  { stepIndex: 5, stageCode: 'LC_VERIFIED', stageName: '5. Letter of Credit / Payment Verified', category: 'COMMERCIAL', progressPct: 20, description: 'Issuing bank LC UCP600 SWIFT MT700 verified by advising bank.' },
  { stepIndex: 6, stageCode: 'PO_VENDOR_ISSUED', stageName: '6. Vendor PO & Raw Material Procured', category: 'PRODUCTION', progressPct: 24, description: 'Vendor PO issued for raw materials and packaging supplies.' },
  { stepIndex: 7, stageCode: 'PRODUCTION_STARTED', stageName: '7. Factory Production Commenced', category: 'PRODUCTION', progressPct: 28, description: 'Goods manufacturing batch scheduled on factory floor.' },
  { stepIndex: 8, stageCode: 'QUALITY_INSPECTED', stageName: '8. Pre-Shipment Inspection (PSI) Passed', category: 'PRODUCTION', progressPct: 32, description: 'Quality inspection certificate issued by SGS / Intertek.' },
  { stepIndex: 9, stageCode: 'PACKAGING_LABELED', stageName: '9. Export Packaging & Dual Labeling', category: 'PRODUCTION', progressPct: 36, description: 'ISPM 15 heat-treated pallets & dual-language labels applied.' },
  { stepIndex: 10, stageCode: 'WAREHOUSE_STAGED', stageName: '10. Staged at Customs Warehouse', category: 'CUSTOMS_CLEARANCE', progressPct: 40, description: 'Cargo received at ICD / Bonded Customs Warehouse.' },
  { stepIndex: 11, stageCode: 'BOOKING_CONFIRMED', stageName: '11. Ocean / Air Freight Booking Confirmed', category: 'LOGISTICS_TRANSIT', progressPct: 44, description: 'Carrier shipping booking reference confirmed with container allocation.' },
  { stepIndex: 12, stageCode: 'SHIPPING_BILL_FILED', stageName: '12. Customs Shipping Bill (ICEGATE) Filed', category: 'CUSTOMS_CLEARANCE', progressPct: 48, description: 'Customs declaration and Shipping Bill filed via Customs Broker.' },
  { stepIndex: 13, stageCode: 'LET_EXPORT_ORDER', stageName: '13. Let Export Order (LEO) Granted', category: 'CUSTOMS_CLEARANCE', progressPct: 52, description: 'Customs Officer issues Let Export Order permit for loading.' },
  { stepIndex: 14, stageCode: 'CONTAINER_STUFFED', stageName: '14. Container Stuffed & Sealed', category: 'LOGISTICS_TRANSIT', progressPct: 56, description: 'Cargo stuffed into FCL container and high-security seal affixed.' },
  { stepIndex: 15, stageCode: 'GATED_IN_PORT', stageName: '15. Gated-in at Port Terminal', category: 'LOGISTICS_TRANSIT', progressPct: 60, description: 'Container gated in at Nhava Sheva / port terminal.' },
  { stepIndex: 16, stageCode: 'VESSEL_LOADED', stageName: '16. Loaded on Vessel / Flight Dispatched', category: 'LOGISTICS_TRANSIT', progressPct: 64, description: 'Container loaded onboard vessel; Mate Receipt issued.' },
  { stepIndex: 17, stageCode: 'BILL_OF_LADING_ISSUED', stageName: '17. Bill of Lading (B/L) Issued', category: 'LOGISTICS_TRANSIT', progressPct: 68, description: 'Carrier issues Original Shipped-on-Board Bill of Lading.' },
  { stepIndex: 18, stageCode: 'DOCS_DISPATCHED_BANK', stageName: '18. Export Docs Negotiated with Bank', category: 'FINANCE_REALIZATION', progressPct: 72, description: 'Commercial Invoice, B/L, COO sent to negotiating bank under LC.' },
  { stepIndex: 19, stageCode: 'CUSTOMS_CLEARANCE_DEST', stageName: '19. Destination Customs Cleared', category: 'CUSTOMS_CLEARANCE', progressPct: 76, description: 'Buyer completes import customs entry in destination port.' },
  { stepIndex: 20, stageCode: 'DELIVERED_CONSIGNEE', stageName: '20. Cargo Delivered to Consignee', category: 'LOGISTICS_TRANSIT', progressPct: 80, description: 'Proof of Delivery (POD) signed at buyer warehouse.' },
  { stepIndex: 21, stageCode: 'EXPORT_PROCEEDS_REALIZED', stageName: '21. Foreign Exchange Realized (eBRC)', category: 'FINANCE_REALIZATION', progressPct: 85, description: 'Bank issues electronic Bank Realization Certificate (eBRC).' },
  { stepIndex: 22, stageCode: 'GST_REFUND_CLAIMED', stageName: '22. GST Export Duty Drawback Claimed', category: 'FINANCE_REALIZATION', progressPct: 90, description: 'GST IGST refund / Drawback credited to exporter account.' },
  { stepIndex: 23, stageCode: 'RODTEP_CREDITED', stageName: '23. RoDTEP / RoSCTL Incentive Credited', category: 'FINANCE_REALIZATION', progressPct: 94, description: 'Export incentive e-scrip credited to DGFT ledger.' },
  { stepIndex: 24, stageCode: 'AUDIT_COMPLETED', stageName: '24. Post-Shipment Exim Audit Closed', category: 'FINANCE_REALIZATION', progressPct: 97, description: 'Compliance officer closes statutory audit file.' },
  { stepIndex: 25, stageCode: 'ORDER_ARCHIVED', stageName: '25. Trade Transaction Closed & Archived', category: 'FINANCE_REALIZATION', progressPct: 100, description: 'Order fully realized and archived in trade vault.' },
  { stepIndex: 26, stageCode: 'COMPLETE_SUCCESS', stageName: '26. Full Trade Lifecycle Completed', category: 'FINANCE_REALIZATION', progressPct: 100, description: 'All trade milestones completed.' }
];

export interface PipelineInstanceState {
  orderNumber: string;
  currentStepIndex: number;
  currentStage: PipelineStage;
  progressPct: number;
  history: Array<{
    stepIndex: number;
    stageCode: string;
    completedAt: string;
  }>;
}

/**
 * Advances trade order to the next milestone stage in 26-step pipeline.
 */
export function advancePipelineStage(currentState: PipelineInstanceState): PipelineInstanceState {
  const nextStepIndex = Math.min(currentState.currentStepIndex + 1, 26);
  const nextStage = PIPELINE_STAGES_26[nextStepIndex - 1];

  const updatedHistory = [
    ...currentState.history,
    {
      stepIndex: currentState.currentStepIndex,
      stageCode: currentState.currentStage.stageCode,
      completedAt: new Date().toISOString()
    }
  ];

  return {
    orderNumber: currentState.orderNumber,
    currentStepIndex: nextStepIndex,
    currentStage: nextStage,
    progressPct: nextStage.progressPct,
    history: updatedHistory
  };
}
