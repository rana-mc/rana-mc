import { useAppDispatch, useAppSelector } from '../../app/hooks';
import React, { useEffect } from 'react';
import cn from 'classnames';
import { fetchServersAC, selectServers } from './serversSlice';
import styles from './ServersList.module.css';
import Empty from '@ui/Empty';
import ServerLogs from '../../components/ServerLogs';
import Server from '@modules/server/Server';

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
        <Server server={server} />
      ))}
      <ServerLogs />
    </div>
  );
};

export default ServersList;
