// EXIM.IM SaaS Platform - Module 23: Workflow Automation Engine

export interface ApprovalCheckInput {
  orderReference: string;
  orderAmountUsd: number;
  requestedBy: string;
  approvalType: 'HIGH_VALUE_ORDER' | 'CREDIT_EXCEPTION' | 'LC_DISCREPANCY_WAIVER';
}

export interface ApprovalCheckResult {
  requestId: string;
  orderReference: string;
  requiresExecutiveApproval: boolean;
  requiredApproverRole: string;
  approvalStatus: 'PENDING' | 'APPROVED';
}

export interface ReminderRuleInput {
  triggerRule: 'EXPIRING_LC_7_DAYS' | 'UNREALIZED_EBRC_30_DAYS' | 'PORT_CUSTOMS_QUERY';
  entityReference: string;
  recipientRole: string;
  scheduledAt: string;
}

export interface ReminderRuleResult {
  reminderId: string;
  triggerRule: string;
  entityReference: string;
  recipientRole: string;
  scheduledAt: string;
  isDispatched: boolean;
}

const HIGH_VALUE_CEILING_USD = 50000;

/**
 * Evaluates whether export order requires executive sign-off.
 */
export function evaluateOrderApproval(payload: ApprovalCheckInput): ApprovalCheckResult {
  const { orderReference, orderAmountUsd, requestedBy, approvalType } = payload;
  const requiresExecutiveApproval = orderAmountUsd >= HIGH_VALUE_CEILING_USD || approvalType !== 'HIGH_VALUE_ORDER';

  return {
    requestId: `REQ-APP-${Date.now()}`,
    orderReference,
    requiresExecutiveApproval,
    requiredApproverRole: requiresExecutiveApproval ? 'CHIEF_TRADE_OFFICER' : 'TRADE_OPERATIONS_MANAGER',
    approvalStatus: requiresExecutiveApproval ? 'PENDING' : 'APPROVED'
  };
}

/**
 * Creates scheduled automated reminder alert rule.
 */
export function createAutomatedReminder(payload: ReminderRuleInput): ReminderRuleResult {
  const { triggerRule, entityReference, recipientRole, scheduledAt } = payload;

  return {
    reminderId: `REM-RUL-${Date.now()}`,
    triggerRule,
    entityReference,
    recipientRole,
    scheduledAt,
    isDispatched: false
  };
}
