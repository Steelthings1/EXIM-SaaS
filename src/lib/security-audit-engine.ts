// EXIM.IM SaaS Platform - Module 28: Security Audit Engine

export interface ActivityLogInput {
  userId: string;
  userEmail: string;
  action: string;
  entityType: string;
  entityId: string;
  payloadDiff?: Record<string, any>;
  ipAddress: string;
  userAgent?: string;
}

export interface ActivityLogRecord {
  logId: string;
  userId: string;
  userEmail: string;
  action: string;
  entityType: string;
  entityId: string;
  payloadDiff: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  riskRating: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  createdAt: string;
}

export interface SecurityAlertRecord {
  alertId: string;
  alertType: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  userEmail: string;
  ipAddress: string;
  description: string;
  isResolved: boolean;
  createdAt: string;
}

const RECOGNIZED_SUBNETS = ['106.210.', '182.73.', '49.37.'];

/**
 * Evaluates IP address anomaly risks.
 */
export function evaluateIpAnomalyRisk(ipAddress: string): { isAnomaly: boolean; riskRating: 'LOW' | 'HIGH' } {
  const isRecognized = RECOGNIZED_SUBNETS.some((subnet) => ipAddress.startsWith(subnet));
  if (!isRecognized) {
    return { isAnomaly: true, riskRating: 'HIGH' };
  }
  return { isAnomaly: false, riskRating: 'LOW' };
}

/**
 * Constructs an immutable activity log record V2 with IP risk assessment.
 */
export function recordActivityLogV2(payload: ActivityLogInput): ActivityLogRecord {
  const { isAnomaly, riskRating } = evaluateIpAnomalyRisk(payload.ipAddress);

  return {
    logId: `LOG-V2-${Date.now()}`,
    userId: payload.userId,
    userEmail: payload.userEmail,
    action: payload.action,
    entityType: payload.entityType,
    entityId: payload.entityId,
    payloadDiff: payload.payloadDiff || {},
    ipAddress: payload.ipAddress,
    userAgent: payload.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    riskRating: isAnomaly ? 'HIGH' : 'LOW',
    createdAt: new Date().toISOString()
  };
}
