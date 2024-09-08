import express from 'express';
import { initializeKafka, shutdownKafka, consumeMessages } from './kafka';
import {
  TelemetryData,
  getLatestTelemetry,
  saveTelemetryData,
} from './telemetry';

const app = express();
app.use(express.json());

app.get('/api/telemetry/:deviceId/latest', (req, res) => {
  const telemetry = getLatestTelemetry(req.params.deviceId);
  if (telemetry) {
    res.json(telemetry);
  } else {
    res.status(404).send('No telemetry data found for this device');
  }
});

async function startServer() {
  await initializeKafka();

  await consumeMessages('device-telemetry', async ({ message }) => {
    const telemetryData: TelemetryData = JSON.parse(message.value!.toString());
    saveTelemetryData(telemetryData);
  });

  app.listen(3001, () =>
    console.log('Telemetry service listening on port 3001')
  );
}

startServer().catch(console.error);

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await shutdownKafka();
  process.exit(0);
});
