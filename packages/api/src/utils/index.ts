import axios from "axios";

// TODO: prod envs?
const BASE_CURSE_URL = 'http://localhost:3001';

export const log = (message: string) => {
  console.log(`[API]: ${message}`);
};

export const createApiClient = () => {
  const client = axios.create({
    baseURL: BASE_CURSE_URL
  });

  client.interceptors.request.use((config) => {
    log(`Request to origin: ${config.baseURL}${config.url}`);
    return config;
  });

  return client;
};

export const getForgeVersionUrl = (version: string) => {
  const baseUrl = `https://files.minecraftforge.net/net/minecraftforge/forge/`;
  const htmlForVersion = `index_${version}.html`;

  return `${baseUrl}${htmlForVersion}`;
}
export const apiClient = createApiClient();