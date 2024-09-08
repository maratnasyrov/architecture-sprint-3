import express from 'express';
import { getDevice, updateDeviceStatus } from './device';
import { produceMessage } from './kafka';

const app = express();
app.use(express.json());

app.get('/api/devices/:id', (req, res) => {
  const device = getDevice(req.params.id);
  if (device) {
    res.json(device);
  } else {
    res.status(404).send('Device not found');
  }
});

app.put('/api/devices/:id/status', (req, res) => {
  const device = updateDeviceStatus(req.params.id, req.body.status);
  if (device) {
    produceMessage('device-status', JSON.stringify(device));
    res.json(device);
  } else {
    res.status(404).send('Device not found');
  }
});

app.listen(3000, () => console.log('Devices service listening on port 3000'));
