import React, { useEffect } from 'react';
import Empty from '@ui/Empty';
import Server from '@modules/server/Server';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchServersAC, selectServers } from './serversSlice';
import ServerLogs from '../../components/ServerLogs';
import Card from '@ui/Card';

const ServersList = () => {
  const dispatch = useAppDispatch();
  const servers = useAppSelector(selectServers);

  useEffect(() => {
    if (!servers) dispatch(fetchServersAC());
  }, [dispatch, servers]);

  if (!servers) {
    return <Empty select size="s" text="Please, wait..." />;
  }

  if (servers.length === 0) {
    return <Empty size="s" />;
  }

  return (
    <Card>
      {servers.map((server) => (
        <Server key={server.id} server={server} />
      ))}
      <ServerLogs />
    </Card>
  );
};

export default ServersList;
