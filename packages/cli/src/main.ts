import express from 'express';
import path from 'path';
import { startApiServer } from '@rana-mc/api';
import { createRequestHandler } from '@remix-run/express';

import build from '@rana-mc/web/build';

const WEB_PORT = 3000;

const startWebServer = async () => {
  const app = express();
  const webPath = path.resolve('.', 'node_modules/@rana-mc/web/public');

  console.log(`RanaMC web path: ${webPath}`);
  console.log(`RanaMC build path: ${build}`);

  const router = express.Router({ strict: true });

  router.use(express.static(webPath));
  router.use(
    createRequestHandler({
      build,
      getLoadContext(req, res) {
        // FYI: Maybe later add context of host machine
        return {};
      },
    })
  );

  app.use(router);
  app.listen(WEB_PORT, () => {
    console.log(`Working on ${WEB_PORT} port...`);
  });
};

const main = () => {
  startWebServer();
  startApiServer();
};

main();
