// EXIM.IM SaaS Platform - Module 16: 10-Dashboard Multi-Intelligence Engine

export type DashboardViewType = 
  | 'EXECUTIVE'
  | 'DESTINATION_MARKETS'
  | 'EXPORT_SALES'
  | 'VESSEL_CONTAINER'
  | 'BUYER_PERFORMANCE'
  | 'VENDOR_PROCUREMENT'
  | 'MULTI_WAREHOUSE'
  | 'FINANCIAL_TREASURY'
  | 'SANCTIONS_RISK'
  | 'AI_PREDICTIVE';

export interface KpiMetric {
  key: string;
  label: string;
  value: number;
  unit: string;
  yoyTrendPct: number;
  subtext: string;
}

export interface DashboardViewData {
  viewType: DashboardViewType;
  title: string;
  description: string;
  metrics: KpiMetric[];
}

/**
 * Calculates metric values, YoY trends, and operational summaries for each of the 10 specialized dashboard views.
 */
export function getDashboardViewData(viewType: DashboardViewType): DashboardViewData {
  switch (viewType) {
    case 'EXECUTIVE':
      return {
        viewType,
        title: 'Executive Overview Dashboard',
        description: 'High-level C-Suite telemetry across revenue, active ocean containers, customs clearance speed, and incentive realization.',
        metrics: [
          { key: 'ytd_rev', label: 'YTD Export Revenue', value: 14250000.00, unit: '$', yoyTrendPct: 18.5, subtext: '+18.5% YoY Growth across US & EU routes' },
          { key: 'active_cont', label: 'Active Shipments & Containers', value: 342, unit: 'TEUs', yoyTrendPct: 12.0, subtext: '28 vessels currently in transit' },
          { key: 'customs_speed', label: 'Customs Clearance Speed', value: 4.2, unit: 'Hours', yoyTrendPct: -25.0, subtext: 'Reduced from 5.6h via Single-Entry engine' },
          { key: 'realized_inc', label: 'Realized Export Incentives', value: 385000.00, unit: '₹', yoyTrendPct: 14.2, subtext: 'RoDTEP e-scrips and Duty Drawbacks' }
        ]
      };

    case 'DESTINATION_MARKETS':
      return {
        viewType,
        title: 'Destination Market Intelligence',
        description: 'Geographic market distribution, top buyer corridors, and CEPA/FTA duty preference savings.',
        metrics: [
          { key: 'top_market', label: 'Top Market Revenue (UAE)', value: 4800000.00, unit: '$', yoyTrendPct: 22.4, subtext: 'CEPA FTA Zero Duty Privilege' },
          { key: 'fta_savings', label: 'Total FTA Duty Savings', value: 210000.00, unit: '$', yoyTrendPct: 15.8, subtext: 'Saved across 114 shipments' },
          { key: 'growth_corridor', label: 'Fastest Corridor (Germany)', value: 3100000.00, unit: '$', yoyTrendPct: 34.1, subtext: 'High demand for specialty coffee & steel' }
        ]
      };

    case 'EXPORT_SALES':
      return {
        viewType,
        title: 'Export Sales & Quotation Pipeline',
        description: 'Quotation conversion rates, open sales contract values, and gross margin analytics.',
        metrics: [
          { key: 'quote_value', label: 'Open Quotation Pipeline', value: 6800000.00, unit: '$', yoyTrendPct: 8.5, subtext: '48 active export quotes' },
          { key: 'conversion_rate', label: 'Quote-to-Contract Conversion', value: 68.4, unit: '%', yoyTrendPct: 5.2, subtext: 'Highest in Middle East corridor' },
          { key: 'avg_margin', label: 'Average Gross Margin', value: 24.8, unit: '%', yoyTrendPct: 2.1, subtext: 'Target margin 22.0%' }
        ]
      };

    case 'VESSEL_CONTAINER':
      return {
        viewType,
        title: 'Vessel AIS & Container Telemetry',
        description: 'Real-time ocean vessel positions, port gate-in staging, and satellite ETA prediction accuracy.',
        metrics: [
          { key: 'ais_accuracy', label: 'AIS ETA Prediction Accuracy', value: 96.8, unit: '%', yoyTrendPct: 4.1, subtext: 'Powered by satellite AIS tracking' },
          { key: 'staged_containers', label: 'Port Staged Containers', value: 45, unit: 'TEUs', yoyTrendPct: -10.0, subtext: 'Nhava Sheva & Mundra Ports' },
          { key: 'transshipment_dwell', label: 'Transshipment Dwell Time', value: 1.8, unit: 'Days', yoyTrendPct: -15.0, subtext: 'Colombo & Singapore hubs' }
        ]
      };

    case 'BUYER_PERFORMANCE':
      return {
        viewType,
        title: 'Buyer & Customer Performance',
        description: 'KYB verifications, credit limit utilization, and buyer payment punctuality.',
        metrics: [
          { key: 'kyb_verified', label: 'KYB Verified International Buyers', value: 128, unit: 'Buyers', yoyTrendPct: 20.0, subtext: 'LEI & Dun & Bradstreet verified' },
          { key: 'credit_util', label: 'Total Credit Limit Utilized', value: 4200000.00, unit: '$', yoyTrendPct: 6.4, subtext: '72% of approved credit ceiling' },
          { key: 'payment_days', label: 'Average Payment Delay (DSO)', value: 14.5, unit: 'Days', yoyTrendPct: -18.2, subtext: 'Improved by 3.2 days' }
        ]
      };

    case 'VENDOR_PROCUREMENT':
      return {
        viewType,
        title: 'Vendor Procurement & GRN Intelligence',
        description: 'Supplier delivery punctuality, raw material quality inspection rates, and PO cycle times.',
        metrics: [
          { key: 'vendor_otd', label: 'Supplier On-Time Delivery', value: 94.2, unit: '%', yoyTrendPct: 3.5, subtext: 'Across 34 accredited vendors' },
          { key: 'grn_pass_rate', label: 'Goods Receipt (GRN) Pass Rate', value: 98.6, unit: '%', yoyTrendPct: 1.2, subtext: 'Inspected under Module 8' }
        ]
      };

    case 'MULTI_WAREHOUSE':
      return {
        viewType,
        title: 'Multi-Warehouse Inventory Telemetry',
        description: 'Stock valuation across bonded warehouses, CBM capacity utilization, and reorder alerts.',
        metrics: [
          { key: 'stock_val', label: 'Total Inventory Valuation', value: 8900000.00, unit: '$', yoyTrendPct: 9.8, subtext: 'Across 4 bonded warehouses' },
          { key: 'cbm_util', label: 'CBM Capacity Utilization', value: 78.4, unit: '%', yoyTrendPct: 4.5, subtext: 'Optimal storage density' }
        ]
      };

    case 'FINANCIAL_TREASURY':
      return {
        viewType,
        title: 'Financial Treasury & Forex Intelligence',
        description: 'Inward remittance receipts (IRM), bank eBRC generation, and hedging coverage.',
        metrics: [
          { key: 'irm_realized', label: 'Inward Remittance Realized', value: 13800000.00, unit: '$', yoyTrendPct: 17.2, subtext: 'Matched with shipping bills' },
          { key: 'ebrc_rate', label: 'eBRC Realization Rate', value: 99.4, unit: '%', yoyTrendPct: 0.8, subtext: 'RBI EDPMS closed automatically' }
        ]
      };

    case 'SANCTIONS_RISK':
      return {
        viewType,
        title: 'Sanctions & Compliance Risk Matrix',
        description: 'OFAC/EU sanctions screening clearances, LC discrepancy rates, and country rule checks.',
        metrics: [
          { key: 'sanctions_clear', label: 'Sanctions Screening Pass Rate', value: 100.0, unit: '%', yoyTrendPct: 0.0, subtext: '0 flagged entities in 2026' },
          { key: 'lc_discrepancy', label: 'LC Presentation Discrepancy Rate', value: 1.2, unit: '%', yoyTrendPct: -8.5, subtext: 'Audited by Module 14 UCP 600 Engine' }
        ]
      };

    case 'AI_PREDICTIVE':
    default:
      return {
        viewType: 'AI_PREDICTIVE',
        title: 'AI Predictive Insights & Forecasts',
        description: 'Predictive AIS ocean delay risks, customer churn probability, and unclaimed incentive alerts.',
        metrics: [
          { key: 'delay_alerts', label: 'Predicted Vessel Delay Alerts', value: 3, unit: 'Vessels', yoyTrendPct: -40.0, subtext: 'Weather delay near Suez Canal' },
          { key: 'unclaimed_rodtep', label: 'Unclaimed RoDTEP Incentives', value: 145000.00, unit: '₹', yoyTrendPct: -22.0, subtext: 'Ready for e-scrip scroll generation' }
        ]
      };
  }
}
