import axios from "axios";
import { log } from ".";

// TODO: prod / dev envs
const API_URL = 'http://localhost:3001/';

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
