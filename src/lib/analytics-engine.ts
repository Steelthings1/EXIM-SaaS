// EXIM.IM SaaS Platform - Bundle F: 10-Dashboard Analytics Suite Engine

export type DashboardViewType = 
  | 'EXECUTIVE'
  | 'COUNTRY'
  | 'SALES'
  | 'SHIPMENT'
  | 'CUSTOMER'
  | 'SUPPLIER'
  | 'INVENTORY'
  | 'FINANCIAL'
  | 'RISK'
  | 'AI_INSIGHTS';

export interface DashboardKpiCard {
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
}

export interface DashboardViewData {
  viewType: DashboardViewType;
  title: string;
  kpiCards: DashboardKpiCard[];
  summaryMessage: string;
}

/**
 * Returns KPI metrics and insights across all 10 specialized dashboard views.
 */
export function getDashboardViewData(viewType: DashboardViewType): DashboardViewData {
  switch (viewType) {
    case 'EXECUTIVE':
      return {
        viewType: 'EXECUTIVE',
        title: 'Executive C-Suite Control Tower',
        kpiCards: [
          { label: 'Total Export Revenue (YTD)', value: '$1,480,250', trend: '+18.4%', isPositive: true },
          { label: 'Active Trade Pipelines', value: '42 Orders', trend: '+6 Orders', isPositive: true },
          { label: 'Realized eBRC Foreign Exchange', value: '$1,290,000', trend: '+14.2%', isPositive: true },
          { label: 'Overall Compliance Rating', value: '99.4%', trend: '+0.5%', isPositive: true }
        ],
        summaryMessage: 'Platform operations executing smoothly with $1.48M export turnover and 99.4% compliance rating.'
      };

    case 'COUNTRY':
      return {
        viewType: 'COUNTRY',
        title: 'Destination Country Intelligence Dashboard',
        kpiCards: [
          { label: 'Top Destination Market', value: 'UAE (AEDXB)', trend: '38% Volume', isPositive: true },
          { label: 'CEPA FTA Duty Savings', value: '$42,500', trend: '+22.0%', isPositive: true },
          { label: 'Active Destination Rules', value: '18 Countries', trend: 'Live', isPositive: true }
        ],
        summaryMessage: 'UAE and USA represent 65% of international consignment destinations.'
      };

    case 'SALES':
      return {
        viewType: 'SALES',
        title: 'Sales & Proforma Quotations Dashboard',
        kpiCards: [
          { label: 'Proforma Quotations Issued', value: '$850,000', trend: '+12.0%', isPositive: true },
          { label: 'Contract Conversion Rate', value: '78.5%', trend: '+4.2%', isPositive: true }
        ],
        summaryMessage: 'Sales pipeline conversion rate up 4.2% following AI contract risk audits.'
      };

    case 'SHIPMENT':
      return {
        viewType: 'SHIPMENT',
        title: 'Shipment & Satellite AIS Telemetry Dashboard',
        kpiCards: [
          { label: 'Containers In-Transit', value: '14 FCLs', trend: 'On Schedule', isPositive: true },
          { label: 'On-Time Arrival Rate', value: '96.2%', trend: '+1.8%', isPositive: true }
        ],
        summaryMessage: '14 containers tracked via live Satellite AIS with zero transshipment delays.'
      };

    case 'CUSTOMER':
      return {
        viewType: 'CUSTOMER',
        title: 'Customer CRM & KYB Verification Dashboard',
        kpiCards: [
          { label: 'Active International Buyers', value: '28 Accounts', trend: '+3 New', isPositive: true },
          { label: 'KYB Verification Rate', value: '100%', trend: 'Verified', isPositive: true }
        ],
        summaryMessage: 'All international buyers verified through automated KYB registry.'
      };

    case 'SUPPLIER':
      return {
        viewType: 'SUPPLIER',
        title: 'Supplier & Raw Material Procurement Dashboard',
        kpiCards: [
          { label: 'Vendor PO Value', value: '$420,000', trend: 'Allocated', isPositive: true },
          { label: 'Supplier Quality Score', value: '98.1%', trend: '+0.8%', isPositive: true }
        ],
        summaryMessage: 'Raw material procurement allocations fulfilled on schedule.'
      };

    case 'INVENTORY':
      return {
        viewType: 'INVENTORY',
        title: 'Multi-Warehouse Stock & Batch Dashboard',
        kpiCards: [
          { label: 'Bonded Warehouse Stock', value: '24,500 Units', trend: 'Optimal', isPositive: true },
          { label: 'CBM Volume Utilization', value: '88.4%', trend: '+3.1%', isPositive: true }
        ],
        summaryMessage: 'ICD bonded warehouse inventory allocated across active export batches.'
      };

    case 'FINANCIAL':
      return {
        viewType: 'FINANCIAL',
        title: 'Financial, eBRC & Incentive Ledger Dashboard',
        kpiCards: [
          { label: 'RoDTEP e-Scrip Balance', value: '₹5,84,200', trend: '+₹58.7K', isPositive: true },
          { label: 'Duty Drawback Realized', value: '₹6,29,380', trend: '+₹62.9K', isPositive: true }
        ],
        summaryMessage: 'DGFT export incentive claims fully credited with eBRC bank closures.'
      };

    case 'RISK':
      return {
        viewType: 'RISK',
        title: 'Sanctions, Legal & Compliance Risk Dashboard',
        kpiCards: [
          { label: 'Sanctions Clearance Status', value: '0 Violations', trend: '100% Clean', isPositive: true },
          { label: 'UCP 600 LC Discrepancy Risk', value: '0 Discrepancies', trend: 'Low Risk', isPositive: true }
        ],
        summaryMessage: 'Zero sanctions flags or UCP 600 bank presentation discrepancy risks.'
      };

    case 'AI_INSIGHTS':
    default:
      return {
        viewType: 'AI_INSIGHTS',
        title: 'AI Predictive Insights & Trade Recommendations',
        kpiCards: [
          { label: 'AI Optimization Recommendations', value: '8 Active', trend: 'High Priority', isPositive: true },
          { label: 'Predicted Freight Cost Savings', value: '$12,400', trend: 'Available', isPositive: true }
        ],
        summaryMessage: 'AI Copilot suggests consolidating 2 20ft shipments into 1 40ft HC to save $1,450 in freight.'
      };
  }
}
