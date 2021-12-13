import { useAppDispatch, useAppSelector } from '../../app/hooks';
import React, { useEffect } from 'react';
import { fetchServersAC, selectServers } from './serversSlice';

const ServersList = () => {
  const dispatch = useAppDispatch();
  const servers = useAppSelector(selectServers);

  useEffect(() => {
    if (!servers) dispatch(fetchServersAC());
  }, [dispatch, servers]);

  return <div>{JSON.stringify(servers)}</div>;
};

export default ServersList;
