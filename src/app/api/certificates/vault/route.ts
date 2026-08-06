// EXIM.IM SaaS Platform - Statutory Certificates Vault API Endpoint
import { draftStatutoryCertificate, CertificateType } from '@/lib/ai/certificate-generator';

export async function GET(request: Request) {
  const sampleCerts = [
    {
      certificate_id: 'cert-101',
      certificate_type: 'PHYTOSANITARY',
      certificate_number: 'PHYTO-INDIA-2026-9901',
      issuing_body: 'Directorate of Plant Protection & Quarantine',
      batch_number: 'LOT-2026-RIC-441',
      issue_date: '2026-02-01',
      is_active: true
    },
    {
      certificate_id: 'cert-102',
      certificate_type: 'CERTIFICATE_OF_ANALYSIS',
      certificate_number: 'COA-SGS-2026-4412',
      issuing_body: 'SGS India NABL ISO 17025 Testing Lab',
      batch_number: 'BATCH-2026-COF-091',
      issue_date: '2026-01-20',
      is_active: true
    }
  ];

  return Response.json({ success: true, count: sampleCerts.length, data: sampleCerts });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { certificateType, batchNumber, productName, labName } = body;

    if (!certificateType || !batchNumber) {
      return Response.json({ success: false, error: 'certificateType and batchNumber are required' }, { status: 400 });
    }

    const draftedCert = draftStatutoryCertificate(
      (certificateType as CertificateType) || 'CERTIFICATE_OF_ANALYSIS',
      {
        batchNumber,
        productName: productName || 'Export Commodity Batch',
        labName: labName || 'NABL Testing Laboratory',
        moisturePct: 5.2,
        activeIngredientPct: 99.0,
        heavyMetalsPpm: 0.1,
        microbialStatus: 'PASS_CLEAR'
      }
    );

    return Response.json({
      success: true,
      message: 'Statutory certificate drafted with AI Agent',
      data: draftedCert
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Certificate generation failed' }, { status: 500 });
  }
}
