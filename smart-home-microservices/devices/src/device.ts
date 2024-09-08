export interface Device {
  id: string;
  name: string;
  status: string;
}

const devices: Device[] = [
  { id: '1', name: 'Living Room Light', status: 'OFF' },
  { id: '2', name: 'Kitchen Thermostat', status: 'ON' },
];

export function getDevice(id: string): Device | undefined {
  return devices.find((device) => device.id === id);
}

export function updateDeviceStatus(
  id: string,
  status: string
): Device | undefined {
  const device = getDevice(id);
  if (device) {
    device.status = status;
  }
  return device;
}
