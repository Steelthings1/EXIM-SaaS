// EXIM.IM SaaS Platform - 3D Container Loading Engine API Endpoint
import { calculateContainerLoading, ContainerType } from '@/lib/container-loading-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { containerType, cargoTotalGrossWeightKg, cargoTotalVolumeCbm, numberOfCartons } = body;

    if (!containerType || !cargoTotalGrossWeightKg) {
      return Response.json({ success: false, error: 'containerType and cargoTotalGrossWeightKg are required' }, { status: 400 });
    }

    const loadingResult = calculateContainerLoading({
      containerType: (containerType as ContainerType) || '20FT_STD',
      cargoTotalGrossWeightKg: Number(cargoTotalGrossWeightKg) || 15000.0,
      cargoTotalVolumeCbm: Number(cargoTotalVolumeCbm) || 25.0,
      numberOfCartons: Number(numberOfCartons) || 500
    });

    return Response.json({
      success: true,
      message: 'Container Loading Calculation Completed',
      data: loadingResult
    });
  } catch (error) {
    return Response.json({ success: false, error: 'Container loading calculation failed' }, { status: 500 });
  }
}
