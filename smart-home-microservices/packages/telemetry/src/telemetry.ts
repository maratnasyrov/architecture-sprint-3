export interface TelemetryData {
  deviceId: string;
  timestamp: number;
  value: number;
}

let telemetryStore: TelemetryData[] = [];

export function getLatestTelemetry(
  deviceId: string
): TelemetryData | undefined {
  return telemetryStore
    .filter((t) => t.deviceId === deviceId)
    .sort((a, b) => b.timestamp - a.timestamp)[0];
}

export function saveTelemetryData(data: TelemetryData): void {
  telemetryStore.push(data);
  // In a real application, you'd probably want to limit the size of telemetryStore
  // or use a database instead of in-memory storage
}
