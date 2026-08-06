// EXIM.IM SaaS Platform - Module 1: Role-Based Access Control (RBAC) Engine

export type AppRole =
  | 'SUPER_ADMIN'
  | 'ORG_OWNER'
  | 'EXPORT_MANAGER'
  | 'IMPORT_MANAGER'
  | 'COMPLIANCE_OFFICER'
  | 'CUSTOMS_BROKER' // Customs House Agent (CHA)
  | 'FREIGHT_FORWARDER'
  | 'ACCOUNTS_MANAGER'
  | 'AUDITOR'
  | 'WAREHOUSE_MANAGER'
  | 'LOGISTICS_COORDINATOR'
  | 'DOCUMENTATION_SPECIALIST'
  | 'PROCUREMENT_OFFICER'
  | 'SALES_MANAGER'
  | 'LEGAL_COUNSEL'
  | 'QUALITY_INSPECTOR'
  | 'TRADE_CONSULTANT'
  | 'BANK_LC_SPECIALIST'
  | 'VIEWER';

export type Permission =
  | 'org:read'
  | 'org:write'
  | 'org:delete'
  | 'members:manage'
  | 'licenses:read'
  | 'licenses:manage'
  | 'branches:read'
  | 'branches:manage'
  | 'documents:create'
  | 'documents:approve'
  | 'documents:delete'
  | 'customs:file'
  | 'customs:read'
  | 'finance:lc_manage'
  | 'finance:read'
  | 'audit:read';

export interface RoleDefinition {
  code: AppRole;
  title: string;
  category: 'ADMIN' | 'OPERATIONS' | 'EXTERNAL_PARTNER' | 'FINANCE_LEGAL' | 'READ_ONLY';
  description: string;
  permissions: Permission[];
}

export const ROLE_DEFINITIONS: Record<AppRole, RoleDefinition> = {
  SUPER_ADMIN: {
    code: 'SUPER_ADMIN',
    title: 'Super Administrator',
    category: 'ADMIN',
    description: 'Full system-wide administrative control across platform tenant instances.',
    permissions: [
      'org:read', 'org:write', 'org:delete', 'members:manage',
      'licenses:read', 'licenses:manage', 'branches:read', 'branches:manage',
      'documents:create', 'documents:approve', 'documents:delete',
      'customs:file', 'customs:read', 'finance:lc_manage', 'finance:read', 'audit:read'
    ]
  },
  ORG_OWNER: {
    code: 'ORG_OWNER',
    title: 'Organization Owner',
    category: 'ADMIN',
    description: 'Primary organization administrator with full tenant settings management.',
    permissions: [
      'org:read', 'org:write', 'members:manage',
      'licenses:read', 'licenses:manage', 'branches:read', 'branches:manage',
      'documents:create', 'documents:approve', 'documents:delete',
      'customs:file', 'customs:read', 'finance:lc_manage', 'finance:read', 'audit:read'
    ]
  },
  EXPORT_MANAGER: {
    code: 'EXPORT_MANAGER',
    title: 'Export Operations Manager',
    category: 'OPERATIONS',
    description: 'Leads outbound trade workflows, shipping instructions, and export licenses.',
    permissions: [
      'org:read', 'licenses:read', 'branches:read',
      'documents:create', 'documents:approve', 'customs:read', 'finance:read'
    ]
  },
  IMPORT_MANAGER: {
    code: 'IMPORT_MANAGER',
    title: 'Import Operations Manager',
    category: 'OPERATIONS',
    description: 'Oversees inbound customs clearance, ICD warehousing, and duty payments.',
    permissions: [
      'org:read', 'licenses:read', 'branches:read', 'warehouses:manage' as any,
      'documents:create', 'documents:approve', 'customs:read', 'finance:read'
    ]
  },
  COMPLIANCE_OFFICER: {
    code: 'COMPLIANCE_OFFICER',
    title: 'Trade Compliance Officer',
    category: 'ADMIN',
    description: 'Manages statutory identity vault, IEC/EORI validity, and sanctions screening.',
    permissions: [
      'org:read', 'licenses:read', 'licenses:manage', 'branches:read',
      'documents:approve', 'customs:read', 'audit:read'
    ]
  },
  CUSTOMS_BROKER: {
    code: 'CUSTOMS_BROKER',
    title: 'Customs House Agent (CHA)',
    category: 'EXTERNAL_PARTNER',
    description: 'External broker responsible for ICEGATE / CBP customs declaration filings.',
    permissions: [
      'licenses:read', 'branches:read', 'documents:create', 'customs:file', 'customs:read'
    ]
  },
  FREIGHT_FORWARDER: {
    code: 'FREIGHT_FORWARDER',
    title: 'Freight Forwarder / Logistics Partner',
    category: 'EXTERNAL_PARTNER',
    description: 'Manages shipment booking, bill of lading issuance, and container tracking.',
    permissions: [
      'branches:read', 'documents:create', 'customs:read'
    ]
  },
  ACCOUNTS_MANAGER: {
    code: 'ACCOUNTS_MANAGER',
    title: 'Trade Finance & Accounts Manager',
    category: 'FINANCE_LEGAL',
    description: 'Handles commercial invoicing, Letter of Credit (LC) checks, and GST refunds.',
    permissions: [
      'org:read', 'licenses:read', 'finance:lc_manage', 'finance:read', 'documents:create'
    ]
  },
  AUDITOR: {
    code: 'AUDITOR',
    title: 'Statutory Trade Auditor',
    category: 'FINANCE_LEGAL',
    description: 'Read-only compliance verification access to audit logs and tax vaults.',
    permissions: [
      'org:read', 'licenses:read', 'branches:read', 'customs:read', 'finance:read', 'audit:read'
    ]
  },
  WAREHOUSE_MANAGER: {
    code: 'WAREHOUSE_MANAGER',
    title: 'Bonded Warehouse Manager',
    category: 'OPERATIONS',
    description: 'Controls ICD container storage, bonded inventory, and cargo release.',
    permissions: [
      'branches:read', 'documents:create'
    ]
  },
  LOGISTICS_COORDINATOR: {
    code: 'LOGISTICS_COORDINATOR',
    title: 'Logistics Coordinator',
    category: 'OPERATIONS',
    description: 'Coordinates dispatch, vessel bookings, and port container drayage.',
    permissions: [
      'branches:read', 'documents:create'
    ]
  },
  DOCUMENTATION_SPECIALIST: {
    code: 'DOCUMENTATION_SPECIALIST',
    title: 'Trade Documentation Specialist',
    category: 'OPERATIONS',
    description: 'Generates Commercial Invoices, Packing Lists, and Certificate of Origin forms.',
    permissions: [
      'licenses:read', 'documents:create'
    ]
  },
  PROCUREMENT_OFFICER: {
    code: 'PROCUREMENT_OFFICER',
    title: 'Global Procurement Officer',
    category: 'OPERATIONS',
    description: 'Manages overseas vendor purchase orders and raw material imports.',
    permissions: [
      'org:read', 'documents:create', 'finance:read'
    ]
  },
  SALES_MANAGER: {
    code: 'SALES_MANAGER',
    title: 'International Sales Manager',
    category: 'OPERATIONS',
    description: 'Handles buyer proforma invoices, Incoterms quotes, and export orders.',
    permissions: [
      'org:read', 'documents:create'
    ]
  },
  LEGAL_COUNSEL: {
    code: 'LEGAL_COUNSEL',
    title: 'Trade Legal Counsel',
    category: 'FINANCE_LEGAL',
    description: 'Reviews international sales contracts, trade dispute filings, and sanctions.',
    permissions: [
      'org:read', 'licenses:read', 'documents:approve', 'audit:read'
    ]
  },
  QUALITY_INSPECTOR: {
    code: 'QUALITY_INSPECTOR',
    title: 'Pre-Shipment Quality Inspector',
    category: 'OPERATIONS',
    description: 'Verifies container seals, phytosanitary checks, and quality certs.',
    permissions: [
      'documents:create', 'customs:read'
    ]
  },
  TRADE_CONSULTANT: {
    code: 'TRADE_CONSULTANT',
    title: 'Exim Trade Consultant',
    category: 'EXTERNAL_PARTNER',
    description: 'Provides advisory on duty drawbacks, FTA benefits, and policy compliance.',
    permissions: [
      'licenses:read', 'customs:read', 'finance:read'
    ]
  },
  BANK_LC_SPECIALIST: {
    code: 'BANK_LC_SPECIALIST',
    title: 'Banking & Letter of Credit Specialist',
    category: 'FINANCE_LEGAL',
    description: 'Validates UCP600 LC terms, swift messages, and bank export collection.',
    permissions: [
      'finance:lc_manage', 'finance:read', 'documents:approve'
    ]
  },
  VIEWER: {
    code: 'VIEWER',
    title: 'Read-Only Guest Viewer',
    category: 'READ_ONLY',
    description: 'Restricted view access to general company profile and branch directory.',
    permissions: [
      'org:read', 'branches:read'
    ]
  }
};

/**
 * Checks if a specific role has a given permission.
 */
export function hasPermission(role: AppRole, permission: Permission): boolean {
  const def = ROLE_DEFINITIONS[role];
  if (!def) return false;
  return def.permissions.includes(permission);
}

/**
 * Validates if user role can manage statutory license identity vault.
 */
export function canManageLicenses(role: AppRole): boolean {
  return hasPermission(role, 'licenses:manage');
}

/**
 * Validates if user role can modify branch and warehouse configurations.
 */
export function canManageBranches(role: AppRole): boolean {
  return hasPermission(role, 'branches:manage');
}
