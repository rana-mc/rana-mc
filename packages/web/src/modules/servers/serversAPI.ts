import { apiClient } from "@utils";

export const fetchServers = () => {
  return apiClient.get('/api/servers');
};

export const createServer = (server: Server) => {
  return apiClient.post('/api/servers', { body: server });
};