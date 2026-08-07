// EXIM.IM SaaS Platform - Module 25: Audit Trail Engine

export interface AuditLogInput {
  userId: string;
  userEmail: string;
  userAction: string;
  entityType: string;
  entityId: string;
  modifiedFields?: Record<string, any>;
  ipAddress: string;
  userAgent?: string;
}

export interface AuditLogRecord {
  logId: string;
  userId: string;
  userEmail: string;
  userAction: string;
  entityType: string;
  entityId: string;
  modifiedFields: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

export interface WorkspaceConfigInput {
  defaultCurrency: string;
  systemTimezone: string;
  defaultLanguage: string;
  customDomain: string;
  documentHeaderText: string;
  documentFooterText: string;
}

/**
 * Constructs an immutable security audit log record.
 */
export function recordAuditLog(payload: AuditLogInput): AuditLogRecord {
  const {
    userId,
    userEmail,
    userAction,
    entityType,
    entityId,
    modifiedFields = {},
    ipAddress,
    userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  } = payload;

  return {
    logId: `AUD-LOG-${Date.now()}`,
    userId,
    userEmail,
    userAction,
    entityType,
    entityId,
    modifiedFields,
    ipAddress,
    userAgent,
    createdAt: new Date().toISOString()
  };
}
