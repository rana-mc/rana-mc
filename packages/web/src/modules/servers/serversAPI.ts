import { apiClient } from "@utils";

export const fetchServers = () => {
  return apiClient.get('/api/servers');
};

export const createServer = (server: Server) => {
  return apiClient.post('/api/servers', { ...server });
};

export const installServer = (server: Server) => {
  // TODO: maybe only id?
  return apiClient.post('/api/install', { ...server });
};

export const removeServer = (server: Server) => {
  // TODO: maybe only id?
  return apiClient.post('/api/remove', { ...server });
};