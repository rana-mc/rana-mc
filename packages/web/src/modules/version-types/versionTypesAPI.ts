import { apiClient } from '@utils';

export const fetchVersionTypes = () => apiClient.get('/api/version-types');
