import { apiClient } from "@utils";

export const fetchForgeCores = (gameVersion: string) => {
  return apiClient.get('/api/forge-cores', { params: { version: gameVersion, force: 1 } });
};


export const fetchFabricCores = (gameVersion: string) => {
  return apiClient.get('/api/fabric-cores', { params: { version: gameVersion, force: 1 } });
};