import { apiClient } from "@utils";

export const fetchVersionTypes = () => {
  return apiClient.get('/api/types');
};