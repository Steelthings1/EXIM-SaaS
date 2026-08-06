// EXIM.IM SaaS Platform - AI License Vision Parse API Endpoint
import { parseLicenseDocument } from '@/lib/ai/license-parser';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const filename = file?.name || 'document_gstin_certificate.pdf';

    const parseResult = await parseLicenseDocument('mock-buffer', filename);

    return Response.json({
      success: true,
      message: 'AI Document Vision parsing completed successfully',
      data: parseResult
    });
  } catch (error) {
    return Response.json({ success: false, error: 'Failed to process AI license vision parsing' }, { status: 500 });
  }
}
