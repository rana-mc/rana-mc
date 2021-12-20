import React, { useEffect } from 'react';
import cn from 'classnames';
import Empty from '@ui/Empty';
import Server from '@modules/server/Server';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchServersAC, selectServers } from './serversSlice';
import styles from './ServersList.module.css';
import ServerLogs from '../../components/ServerLogs';

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
    <div className={cn(styles.serversList)}>
      {servers.map((server) => (
        <Server key={server.id} server={server} />
      ))}
      <ServerLogs />
    </div>
  );
};

export default ServersList;
