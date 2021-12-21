import { apiClient } from '@utils';

export const fetchSettings = () => apiClient.get('/api/settings');

export const setSettings = (settings: Partial<Settings>) =>
  apiClient.post('/api/settings', settings);
