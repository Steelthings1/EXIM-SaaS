// EXIM.IM SaaS Platform - Module 29: Developer API Engine V3
import crypto from 'crypto';

export interface DeveloperApiKeyRecord {
  keyId: string;
  keyName: string;
  rawKey: string;
  keyPrefix: string;
  keyHash: string;
  rateLimitPerMin: number;
  createdAt: string;
}

export interface WebhookSubscriptionRecord {
  subscriptionId: string;
  targetUrl: string;
  events: string[];
  hmacSecret: string;
  isActive: boolean;
  createdAt: string;
}

/**
 * Generates a live developer API key with `exim_live_...` prefix.
 */
export function generateApiKeyV3(keyName: string, rateLimitPerMin = 1000): DeveloperApiKeyRecord {
  const keyId = `KEY-${Date.now()}`;
  const randomBytes = crypto.randomBytes(16).toString('hex');
  const rawKey = `exim_live_${randomBytes}`;
  const keyPrefix = rawKey.substring(0, 14);
  const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');

  return {
    keyId,
    keyName,
    rawKey,
    keyPrefix: `${keyPrefix}...`,
    keyHash,
    rateLimitPerMin,
    createdAt: new Date().toISOString()
  };
}

/**
 * Computes an HMAC SHA-256 signature for webhook dispatches.
 */
export function computeWebhookHmacSignature(payload: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}
