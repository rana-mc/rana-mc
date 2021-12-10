import * as express from 'express';
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import { config as makeEnvs } from 'dotenv';

const CURSEFORGE_API_URL = 'https://api.curseforge.com/';

const log = (message: string) => {
  console.log(`[API]: ${message}`);
};

const main = () => {
  makeEnvs();

  // TODO: not secure? debug mode?
  log(`API key is ${process.env.CURSE_API_KEY}`);

  const app = express();
  createCurseForgeProxy(app);

  app.listen(3000);
};

const createCurseForgeProxy = (app) => {
  app.use('/', createProxyMiddleware({
    target: CURSEFORGE_API_URL,
    selfHandleResponse: true,
    changeOrigin: true,
    onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
      const response = responseBuffer.toString('utf8');
      handleResponse(response);
      return responseBuffer;
    }),
    onProxyReq(proxyReq, req, res) {
      proxyReq.setHeader('x-api-key', process.env.CURSE_API_KEY);
    }
  }));
};

const handleResponse = (response) => {
  log(`(ProxyResponse): ${response}`);
};

log('hello from @rana/api');
main();