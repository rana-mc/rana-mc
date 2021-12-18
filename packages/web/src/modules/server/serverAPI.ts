import { apiClient } from "@utils";
import { ServerStatus } from '@rana-mc/types';

export const installServer = (server: Server) => {
  return apiClient.put(`/api/core/install/${server.id}`, {
    status: ServerStatus.Installing
  });
};

export const startServer = (server: Server) => {
  return apiClient.put(`/api/core/start/${server.id}`, {
    status: ServerStatus.Starting
  });
};

export const stopServer = (server: Server) => {
  return apiClient.put(`/api/core/stop/${server.id}`, {
    status: ServerStatus.Stopping
  });
};
