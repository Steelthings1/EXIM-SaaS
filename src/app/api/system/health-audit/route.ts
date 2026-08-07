// EXIM.IM SaaS Platform - Master System Health Audit API Endpoint
import { getPlatformHealthAudit } from '@/lib/master-platform-engine';

export async function GET(request: Request) {
  const health = getPlatformHealthAudit();
  return Response.json({ success: true, data: health });
}
