import express from 'express';
import {
  TelemetryData,
  getLatestTelemetry,
  saveTelemetryData,
} from './telemetry';
import { consumeMessages } from './kafka';

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

app.listen(3001, () => console.log('Telemetry service listening on port 3001'));

// Start consuming Kafka messages
consumeMessages('device-telemetry', (message: string) => {
  const telemetryData: TelemetryData = JSON.parse(message);
  saveTelemetryData(telemetryData);
});
