import { apiClient } from '@utils/apiClient';
import { useQueries, useQuery } from 'react-query';

const fetchFabricLoaders = async (): Promise<FabricLoader[]> => {
  const response = await apiClient.get('/api/fabric-loaders', {
    params: {},
  });
  return response.data;
};

export const useFabricLoadersQuery = () =>
  useQuery(['fabricLoaders'], () => fetchFabricLoaders());


const fetchFabricInstallers = async (): Promise<FabricInstaller[]> => {
  const response = await apiClient.get('/api/fabric-installers', {
    params: {},
  });
  return response.data;
};

export const useFabricInstallersQuery = () =>
  useQuery(['fabricInstallers'], () => fetchFabricInstallers());

export const useFabricQueries = () => useQueries([
  { queryKey: ['loaders', 1], queryFn: fetchFabricLoaders },
  { queryKey: ['installers', 2], queryFn: fetchFabricInstallers },
])