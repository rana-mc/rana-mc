import { apiClient } from "../../utils";

export const fetchCores = (gameVersion: string) => {
  return apiClient.get('/api/cores', { params: { version: gameVersion, force: 1 } });
};