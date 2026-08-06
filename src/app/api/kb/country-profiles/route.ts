// EXIM.IM SaaS Platform - Destination Country Knowledge Base API Endpoint
import { getCountryProfile, getAllCountryProfiles } from '@/lib/country-kb-engine';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const profile = getCountryProfile(code);
    return Response.json({ success: true, data: profile }, { status: 200 });
  }

  const profiles = getAllCountryProfiles();
  return Response.json({ success: true, count: profiles.length, data: profiles }, { status: 200 });
}
