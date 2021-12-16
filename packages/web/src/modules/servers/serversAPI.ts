import { apiClient } from "@utils";

export const fetchServers = () => {
  return apiClient.get('/api/servers');
};

export const createServer = (server: Server) => {
  return apiClient.post('/api/servers', { ...server });
};

export const removeServer = (server: Server) => {
  return apiClient.delete(`/api/servers/${server.id}`);
};

export const installServer = (server: Server) => {
  return apiClient.post(`/api/core/install/${server.id}`);
};

export const startServer = (server: Server) => {
  return apiClient.post(`/api/core/start/${server.id}`);
};
