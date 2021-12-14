import { apiClient } from "@utils";

export const fetchSettings = () => {
  return apiClient.get('/api/settings');
};

export const setSettings = (settings: Partial<Settings>) => {
  return apiClient.post('/api/settings', settings);
};