// EXIM.IM SaaS Platform - Developer API Center & Webhook Engine
import crypto from 'crypto';

export interface DeveloperKeyCredentials {
  keyId: string;
  keyName: string;
  apiKey: string;
  keyPrefix: string;
  rateLimitPerMin: number;
}

export interface WebhookSubscription {
  subscriptionId: string;
  targetUrl: string;
  subscribedEvents: string[];
  secretHmacKey: string;
  isActive: boolean;
}

/**
 * Generates a new developer API key with live prefix exim_live_...
 */
export function generateDeveloperApiKey(keyName: string, rateLimitPerMin = 1000): DeveloperKeyCredentials {
  const randomBytes = crypto.randomBytes(16).toString('hex');
  const apiKey = `exim_live_${randomBytes}`;
  const keyPrefix = apiKey.substring(0, 14);

  return {
    keyId: `key-${Date.now()}`,
    keyName,
    apiKey,
    keyPrefix,
    rateLimitPerMin
  };
}

/**
 * Generates HMAC SHA-256 signature secret for webhook payload payload security.
 */
export function generateHmacSha256Signature(payload: string, secretKey: string): string {
  return crypto.createHmac('sha256', secretKey).update(payload).digest('hex');
}
