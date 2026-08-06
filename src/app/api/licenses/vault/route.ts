// EXIM.IM SaaS Platform - Statutory License Vault API Endpoint
import { validateStatutoryLicense, evaluateLicenseExpiry, StatutoryLicense } from '@/lib/statutory-license-engine';

export async function GET(request: Request) {
  const sampleLicenses: StatutoryLicense[] = [
    {
      licenseId: 'lic-101',
      licenseType: 'IEC',
      licenseNumber: '0321049281',
      issuingAuthority: 'DGFT Ministry of Commerce',
      issueDate: '2020-01-15',
      expiryDate: '2030-12-31',
      status: 'ACTIVE',
      daysRemaining: 1790
    },
    {
      licenseId: 'lic-102',
      licenseType: 'RCMC',
      licenseNumber: 'RCMC-FIEO-2024-9041',
      issuingAuthority: 'FIEO (Federation of Indian Export Organisations)',
      issueDate: '2024-03-01',
      expiryDate: '2026-03-31',
      status: 'ACTIVE',
      daysRemaining: 56
    },
    {
      licenseId: 'lic-103',
      licenseType: 'FSSAI',
      licenseNumber: '10021022000491',
      issuingAuthority: 'FSSAI Export Division',
      issueDate: '2025-02-15',
      expiryDate: '2026-02-28',
      status: 'EXPIRING_SOON',
      daysRemaining: 22
    }
  ];

  return Response.json({ success: true, count: sampleLicenses.length, data: sampleLicenses });
}

export async function POST(request: Request) {
  try {
    const body: StatutoryLicense = await request.json();
    const result = validateStatutoryLicense(body);

    return Response.json({
      success: true,
      message: 'Statutory license validated and stored in Vault',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Statutory license validation failed' }, { status: 500 });
  }
}
