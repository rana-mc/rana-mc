import express from 'express';
import path from 'path';
import { startApiServer } from '@rana-mc/api';
import { createRequestHandler } from '@remix-run/express';

// @ts-ignore
import build from '@rana-mc/web/build';

const WEB_PORT = 3000;

const startWebServer = async () => {
  const app = express();

  console.log(`RanaMC web path: ${build}`);
  app.all(
    "*",
    createRequestHandler({
      build,
      getLoadContext(req, res) {
        // FYI: Maybe later add context of host machine
        return {};
      }
    })
  );

  app.listen(WEB_PORT, () => {
    console.log(`Working on ${WEB_PORT} port...`);
  });
};

const main = () => {
  startWebServer();
  startApiServer();
};

main();
