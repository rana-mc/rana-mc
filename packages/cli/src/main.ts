import express from 'express';
import path from 'path';
import { startApiServer } from '@rana-mc/api';

const WEB_PORT = 3000;

const startWebServer = async () => {
  const app = express();
  const webPath = path.resolve('.', 'node_modules/@rana-mc/web/public/build');

  console.log(`RanaMC web path: ${webPath}`);
  app.use(express.static(webPath));

  app.listen(WEB_PORT, () => {
    console.log(`Working on ${WEB_PORT} port...`);
  });
};

const main = () => {
  startWebServer();
  startApiServer();
};

main();
