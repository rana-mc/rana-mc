import { apiClient } from '@utils';

export const fetchGameVersions = () => apiClient.get('/api/versions');
