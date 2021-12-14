import axios from "axios";
import { db } from "@rana-mc/db";
import { log } from "./index";

// TODO: prod envs?
const BASE_CURSE_URL = 'http://localhost:3001';

export const createCurseApiClient = () => {
  const client = axios.create({
    baseURL: BASE_CURSE_URL
  });

  client.interceptors.request.use((config) => {
    log(`Request to curse origin: ${config.baseURL}${config.url}`);
    return config;
  });

  return client;
};

export const curseApiClient = createCurseApiClient();

curseApiClient.interceptors.request.use(config => {
  config.headers.common['x-api-key'] = db.getSettings()?.curseApiKey;
  return config;
});