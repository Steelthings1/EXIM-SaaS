// EXIM.IM SaaS Platform - Compliance API: Landed Cost & Duty Calculator
import { calculateLandedCost } from '@/lib/compliance/duty-calculator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cifValueUsd, hsCode, exporterCountry, importerCountry, stdBcdRatePct, vatIgstRatePct, applyFtaPreference } = body;

    if (!cifValueUsd || !hsCode) {
      return Response.json({ success: false, error: 'cifValueUsd and hsCode are required' }, { status: 400 });
    }

    const result = calculateLandedCost({
      cifValueUsd: Number(cifValueUsd),
      hsCode,
      exporterCountry: exporterCountry || 'IND',
      importerCountry: importerCountry || 'ARE',
      stdBcdRatePct: stdBcdRatePct !== undefined ? Number(stdBcdRatePct) : 10.0,
      vatIgstRatePct: vatIgstRatePct !== undefined ? Number(vatIgstRatePct) : 5.0,
      applyFtaPreference: applyFtaPreference !== false
    });

    return Response.json({
      success: true,
      data: result
    });
  } catch (error) {
    return Response.json({ success: false, error: 'Tariff calculation failed' }, { status: 500 });
  }
}
