import axios from "axios";

// TODO: prod / dev envs
const API_URL = 'http://localhost:3001/';

export const log = (message: string) => {
  console.log(`[WEB]: ${message}`);
};

export const createApiClient = () => {
  const client = axios.create({
    baseURL: API_URL
  });

  client.interceptors.request.use((config) => {
    log(`Request to origin: ${config.baseURL}${config.url}`);
    return config;
  });

  return client;
};

export const apiClient = createApiClient();

// TODO: fix import from @rana-mc/db with isolatedModules?
export const enum CoreType {
  Forge = 'forge',
  Fabric = 'fabric',
}
