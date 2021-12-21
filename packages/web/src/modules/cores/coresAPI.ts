import { apiClient } from '@utils';

export const fetchForgeCores = (gameVersion: string) =>
  apiClient.get('/api/forge-cores', { params: { version: gameVersion } });

export const fetchFabricCores = (gameVersion: string) =>
  apiClient.get('/api/fabric-cores', { params: { version: gameVersion } });
