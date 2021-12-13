import { apiClient } from "@utils";

export const fetchGameVersions = () => {
  return apiClient.get('/api/versions');
};