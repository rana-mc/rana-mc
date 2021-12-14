import { Router } from 'express';
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import { log } from './utils';

const CURSEFORGE_API_URL = 'https://api.curseforge.com/';

export const getCurseForgeProxy = () => {
  const router = Router();

  const handleResponse = (response) => {
    // TODO: cache? something more?
    if (response) log(`(ProxyResponse): ${response}`);
  };

  router.use('/', createProxyMiddleware({
    target: CURSEFORGE_API_URL,
    selfHandleResponse: true,
    changeOrigin: true,
    onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
      const response = responseBuffer.toString('utf8');
      handleResponse(response);
      return responseBuffer;
    })
  }));

  return router;
};