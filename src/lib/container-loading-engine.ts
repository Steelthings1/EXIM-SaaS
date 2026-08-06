// EXIM.IM SaaS Platform - Bundle C: 3D Container Loading Optimization Engine

export type ContainerType = '20FT_STD' | '40FT_STD' | '40FT_HC' | '45FT_HC';

export interface ContainerSpec {
  type: ContainerType;
  name: string;
  maxPayloadWeightKg: number;
  maxVolumeCbm: number;
  internalLengthM: number;
  internalWidthM: number;
  internalHeightM: number;
}

export const CONTAINER_SPECS: Record<ContainerType, ContainerSpec> = {
  '20FT_STD': {
    type: '20FT_STD',
    name: '20ft Standard Dry Container',
    maxPayloadWeightKg: 21800.0,
    maxVolumeCbm: 33.2,
    internalLengthM: 5.89,
    internalWidthM: 2.35,
    internalHeightM: 2.39
  },
  '40FT_STD': {
    type: '40FT_STD',
    name: '40ft Standard Dry Container',
    maxPayloadWeightKg: 26500.0,
    maxVolumeCbm: 67.7,
    internalLengthM: 12.03,
    internalWidthM: 2.35,
    internalHeightM: 2.39
  },
  '40FT_HC': {
    type: '40FT_HC',
    name: '40ft High Cube Container',
    maxPayloadWeightKg: 26500.0,
    maxVolumeCbm: 76.4,
    internalLengthM: 12.03,
    internalWidthM: 2.35,
    internalHeightM: 2.69
  },
  '45FT_HC': {
    type: '45FT_HC',
    name: '45ft High Cube Container',
    maxPayloadWeightKg: 27800.0,
    maxVolumeCbm: 86.0,
    internalLengthM: 13.55,
    internalWidthM: 2.35,
    internalHeightM: 2.69
  }
};

export interface ContainerLoadingParams {
  containerType: ContainerType;
  cargoTotalGrossWeightKg: number;
  cargoTotalVolumeCbm: number;
  numberOfCartons: number;
}

export interface ContainerLoadingResult {
  containerType: ContainerType;
  containerName: string;
  maxPayloadWeightKg: number;
  maxVolumeCbm: number;
  cargoTotalGrossWeightKg: number;
  cargoTotalVolumeCbm: number;
  weightUtilizationPct: number;
  volumeUtilizationPct: number;
  isOverweight: number; // 0 if safe, >0 if overweight in kg
  isVolumeOverfilled: boolean;
  status: 'SAFE_OPTIMAL' | 'OVERWEIGHT_DANGER' | 'VOLUME_EXCEEDED';
  recommendation: string;
}

/**
 * Calculates 3D container weight and volume utilization metrics and flags safety limits.
 */
export function calculateContainerLoading(params: ContainerLoadingParams): ContainerLoadingResult {
  const spec = CONTAINER_SPECS[params.containerType] || CONTAINER_SPECS['20FT_STD'];

  const weightUtilizationPct = Number(((params.cargoTotalGrossWeightKg / spec.maxPayloadWeightKg) * 100).toFixed(2));
  const volumeUtilizationPct = Number(((params.cargoTotalVolumeCbm / spec.maxVolumeCbm) * 100).toFixed(2));

  const isOverweightKg = Math.max(0, params.cargoTotalGrossWeightKg - spec.maxPayloadWeightKg);
  const isVolumeOverfilled = params.cargoTotalVolumeCbm > spec.maxVolumeCbm;

  let status: 'SAFE_OPTIMAL' | 'OVERWEIGHT_DANGER' | 'VOLUME_EXCEEDED' = 'SAFE_OPTIMAL';
  let recommendation = 'Payload is within safe port road axle and container structural limits.';

  if (isOverweightKg > 0) {
    status = 'OVERWEIGHT_DANGER';
    recommendation = `DANGER: Cargo exceeds container max payload by ${isOverweightKg.toFixed(0)} kg! Offload cartons or upgrade to 40ft HC.`;
  } else if (isVolumeOverfilled) {
    status = 'VOLUME_EXCEEDED';
    recommendation = 'Cubic volume capacity exceeded! Split cargo into multi-container shipment.';
  }

  return {
    containerType: spec.type,
    containerName: spec.name,
    maxPayloadWeightKg: spec.maxPayloadWeightKg,
    maxVolumeCbm: spec.maxVolumeCbm,
    cargoTotalGrossWeightKg: params.cargoTotalGrossWeightKg,
    cargoTotalVolumeCbm: params.cargoTotalVolumeCbm,
    weightUtilizationPct,
    volumeUtilizationPct,
    isOverweight: isOverweightKg,
    isVolumeOverfilled,
    status,
    recommendation
  };
}
