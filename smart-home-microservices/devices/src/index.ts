import express from 'express';
import { initializeKafka, shutdownKafka, produceMessage } from './kafka';
import { getDevice, updateDeviceStatus } from './device';

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

app.put('/api/devices/:id/status', async (req, res) => {
  const device = updateDeviceStatus(req.params.id, req.body.status);
  if (device) {
    await produceMessage('device-status', JSON.stringify(device));
    res.json(device);
  } else {
    res.status(404).send('Device not found');
  }
});

async function startServer() {
  await initializeKafka();
  app.listen(3000, () => console.log('Devices service listening on port 3000'));
}

startServer().catch(console.error);

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await shutdownKafka();
  process.exit(0);
});
