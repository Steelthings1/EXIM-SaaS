// EXIM.IM SaaS Platform - KYB Verification API Endpoint
import { verifyKybStatutoryIdentity, KybVerificationRequest } from '@/lib/kyb-verification-engine';

export async function POST(request: Request) {
  try {
    const body: KybVerificationRequest = await request.json();

    if (!body.taxIdType || !body.taxIdNumber) {
      return Response.json({ success: false, error: 'taxIdType and taxIdNumber are required' }, { status: 400 });
    }

    const result = verifyKybStatutoryIdentity(body);

    return Response.json({
      success: true,
      message: 'KYB verification completed',
      data: result
    });
  } catch (error) {
    return Response.json({ success: false, error: 'KYB verification failed' }, { status: 500 });
  }
}
