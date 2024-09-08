import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(
  '/api/devices',
  createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
  })
);

app.use(
  '/api/telemetry',
  createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
  })
);

app.listen(8080, () => console.log('API Gateway listening on port 8080'));
