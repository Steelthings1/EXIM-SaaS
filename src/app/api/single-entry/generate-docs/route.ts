// EXIM.IM SaaS Platform - Single-Entry Document Generator API Endpoint
import { calculateSingleEntryOrder, SingleEntryOrderPayload } from '@/lib/single-entry-engine';

export async function POST(request: Request) {
  try {
    const payload: SingleEntryOrderPayload = await request.json();

    const calcResult = calculateSingleEntryOrder(payload);

    return Response.json({
      success: true,
      message: 'Single-entry data successfully propagated across all 5 export trade documents',
      data: {
        orderNumber: calcResult.orderNumber,
        totals: {
          subtotalUsd: calcResult.subtotalUsd,
          totalCifUsd: calcResult.totalCifUsd,
          totalGrossWeightKg: calcResult.totalGrossWeightKg,
          totalVolumeCbm: calcResult.totalVolumeCbm,
          totalCartons: calcResult.totalCartons
        },
        documents: calcResult.generatedDocuments
      }
    });
  } catch (error) {
    return Response.json({ success: false, error: 'Document generation failed' }, { status: 500 });
  }
}
