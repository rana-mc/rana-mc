import { apiClient } from '@utils/apiClient';
import { useQuery } from 'react-query';

const fetchForgeCores = async (gameVersion: string): Promise<ForgeCore[]> => {
  const response = await apiClient.get('/api/forge-cores', { params: { version: gameVersion } });
  return response.data;
}

export const useForgeCoresQuery = (gameVersion: string) =>
  useQuery(['forgeCoreQuery', gameVersion], () => fetchForgeCores(gameVersion))