// EXIM.IM SaaS Platform - Bundle D: Satellite AIS Vessel Tracking Telemetry Engine

export type AisMilestoneCode = 
  | 'GATE_IN'
  | 'LOADED_VESSEL'
  | 'DEPARTED_PORT'
  | 'AT_SEA_TELEMETRY'
  | 'TRANSSHIPMENT'
  | 'ARRIVED_BERTH'
  | 'CUSTOMS_HOLD'
  | 'OUT_OF_CHARGE';

export interface AisTrackingEvent {
  eventId: string;
  bookingReference: string;
  vesselName: string;
  imoNumber: string;
  milestoneCode: AisMilestoneCode;
  milestoneName: string;
  eventTimestamp: string;
  portName: string;
  latitude: number;
  longitude: number;
  speedKnots: number;
  statusMessage: string;
}

/**
 * Returns satellite AIS vessel milestone telemetry trail for an active shipment booking.
 */
export function getVesselAisTelemetryTrail(bookingRef: string, vesselName: string = 'MAERSK MC-KINNEY MOLLER'): AisTrackingEvent[] {
  return [
    {
      eventId: 'evt-101',
      bookingReference: bookingRef,
      vesselName,
      imoNumber: 'IMO 9632064',
      milestoneCode: 'GATE_IN',
      milestoneName: '1. Gated In at Port Terminal',
      eventTimestamp: '2026-02-01T08:30:00Z',
      portName: 'Nhava Sheva (JNP), India',
      latitude: 18.9499,
      longitude: 72.9515,
      speedKnots: 0.0,
      statusMessage: 'Container received at JNP port gate and seal verified.'
    },
    {
      eventId: 'evt-102',
      bookingReference: bookingRef,
      vesselName,
      imoNumber: 'IMO 9632064',
      milestoneCode: 'LOADED_VESSEL',
      milestoneName: '2. Loaded Onboard Vessel',
      eventTimestamp: '2026-02-02T14:15:00Z',
      portName: 'Nhava Sheva (JNP), India',
      latitude: 18.9505,
      longitude: 72.9520,
      speedKnots: 0.0,
      statusMessage: 'Container stuffed into Bay 14 onboard vessel.'
    },
    {
      eventId: 'evt-103',
      bookingReference: bookingRef,
      vesselName,
      imoNumber: 'IMO 9632064',
      milestoneCode: 'DEPARTED_PORT',
      milestoneName: '3. Departed Origin Port',
      eventTimestamp: '2026-02-03T02:00:00Z',
      portName: 'Arabian Sea (Enroute Jebel Ali)',
      latitude: 19.5000,
      longitude: 70.2000,
      speedKnots: 18.5,
      statusMessage: 'Vessel unberthed and underway at 18.5 knots.'
    },
    {
      eventId: 'evt-104',
      bookingReference: bookingRef,
      vesselName,
      imoNumber: 'IMO 9632064',
      milestoneCode: 'AT_SEA_TELEMETRY',
      milestoneName: '4. Satellite AIS Mid-Ocean Telemetry',
      eventTimestamp: '2026-02-06T10:00:00Z',
      portName: 'Gulf of Oman (Satellite Live)',
      latitude: 24.5000,
      longitude: 58.3000,
      speedKnots: 17.8,
      statusMessage: 'Satellite position ping received. Estimated arrival in 2 days.'
    }
  ];
}
