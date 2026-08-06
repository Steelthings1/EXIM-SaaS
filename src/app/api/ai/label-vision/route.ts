// EXIM.IM SaaS Platform - Label Vision API Endpoint
import { auditPackagingLabelVision, LabelVisionInput } from '@/lib/multimodal-copilot-engine';

export async function GET(request: Request) {
  const sampleAudits = [
    {
      audit_id: 'vis-101',
      image_url: 'https://exim.im/samples/coffee_label_gcc.jpg',
      target_market: 'GCC_GSO',
      detected_languages: ['English', 'Arabic'],
      has_net_weight: true,
      has_country_of_origin: true,
      has_allergen_warning: true,
      is_compliant: true,
      compliance_score: 100,
      created_at: '2026-02-05T14:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleAudits.length, data: sampleAudits });
}

export async function POST(request: Request) {
  try {
    const body: LabelVisionInput = await request.json();
    const result = auditPackagingLabelVision(body);

    return Response.json({
      success: true,
      message: 'Computer Vision packaging label regulatory inspection completed',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Label vision inspection failed' }, { status: 500 });
  }
}
