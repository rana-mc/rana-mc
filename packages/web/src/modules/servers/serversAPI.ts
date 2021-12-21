import { apiClient } from '@utils';

export const fetchServers = () => apiClient.get('/api/servers');

export const createServer = (server: Server) =>
  apiClient.post('/api/servers', { ...server });

export const removeServer = (server: Server) =>
  apiClient.delete(`/api/servers/${server.id}`);

export const updateServer = (server: Server) =>
  apiClient.put(`/api/servers/${server.id}`, { ...server });
