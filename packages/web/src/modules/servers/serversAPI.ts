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

export const updateServer = (server: Server) => {
  return apiClient.put(`/api/servers/${server.id}`, { ...server });
};
