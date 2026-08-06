// EXIM.IM SaaS Platform - Module 12: AIS Telemetry & Container Milestone Engine

export type MilestoneType = 'GATE_IN' | 'LOADED_ON_VESSEL' | 'DEPARTED_PORT' | 'TRANSSHIPMENT' | 'ARRIVED_PORT' | 'CUSTOMS_HOLD' | 'OUT_OF_CHARGE';

export interface AisPositionInput {
  mmsi: string;
  vesselName: string;
  latitude: number;
  longitude: number;
  speedKnots: number;
  headingDegrees: number;
  destinationPort: string;
  destinationEta: string;
}

export interface AisPositionResult {
  mmsi: string;
  vesselName: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  speedKnots: number;
  headingDegrees: number;
  destinationPort: string;
  destinationEta: string;
  isValidCoordinates: boolean;
  navigationalStatus: string;
}

export interface ContainerMilestoneInput {
  containerNumber: string;
  milestoneEvent: MilestoneType;
  locationName: string;
  eventTimestamp?: string;
  notes?: string;
}

export interface ContainerMilestoneResult {
  containerNumber: string;
  milestoneEvent: MilestoneType;
  locationName: string;
  eventTimestamp: string;
  notes: string;
  pipelineStage: number; // 1 to 7
}

/**
 * Parses satellite vessel AIS telemetry and validates latitude [-90, 90] and longitude [-180, 180] bounds.
 */
export function processAisTelemetry(payload: AisPositionInput): AisPositionResult {
  const { mmsi, vesselName, latitude, longitude, speedKnots, headingDegrees, destinationPort, destinationEta } = payload;

  const isValidCoordinates = latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
  
  let navigationalStatus = 'UNDERWAY_USING_ENGINE';
  if (speedKnots < 0.5) {
    navigationalStatus = 'MOORED_AT_BERTH';
  } else if (speedKnots > 20) {
    navigationalStatus = 'HIGH_SPEED_TRANSIT';
  }

  return {
    mmsi,
    vesselName,
    coordinates: { latitude, longitude },
    speedKnots,
    headingDegrees,
    destinationPort,
    destinationEta,
    isValidCoordinates,
    navigationalStatus
  };
}

/**
 * Generates container milestone event pipeline timeline stages.
 */
export function recordContainerMilestone(payload: ContainerMilestoneInput): ContainerMilestoneResult {
  const { containerNumber, milestoneEvent, locationName, eventTimestamp = new Date().toISOString(), notes = '' } = payload;

  const stageMap: Record<MilestoneType, number> = {
    'GATE_IN': 1,
    'LOADED_ON_VESSEL': 2,
    'DEPARTED_PORT': 3,
    'TRANSSHIPMENT': 4,
    'ARRIVED_PORT': 5,
    'CUSTOMS_HOLD': 6,
    'OUT_OF_CHARGE': 7
  };

  return {
    containerNumber,
    milestoneEvent,
    locationName,
    eventTimestamp,
    notes,
    pipelineStage: stageMap[milestoneEvent] || 1
  };
}
