import { useAppDispatch, useAppSelector } from '../../app/hooks';
import React, { useEffect } from 'react';
import cn from 'classnames';
import { fetchServersAC, selectServers } from './serversSlice';
import styles from './ServersList.module.css';
import Empty from '@ui/Empty';
import Button, { ButtonSize, ButtonType } from '@ui/Button';

const ServersList = () => {
  const dispatch = useAppDispatch();
  const servers = useAppSelector(selectServers);

  useEffect(() => {
    if (!servers) dispatch(fetchServersAC());
  }, [dispatch, servers]);

  if (!servers) {
    return <Empty size="s" text="Please, wait..." />;
  }

  if (servers.length === 0) {
    return <Empty size="s" />;
  }

  const handleInstall = (server: Server) => () => {
    console.log(server);
  };

  return (
    <div className={cn(styles.serversList)}>
      {servers.map((server) => (
        <div className={cn(styles.server)}>
          <div className={cn(styles.values)}>
            <span className={cn(styles.value)}>id: {server.id}</span>
            <span className={cn(styles.value)}>name: {server.name}</span>
            <span className={cn(styles.value)}>
              status: {server.status || 'unknown'}
            </span>
          </div>
          <Button
            size={ButtonSize.Small}
            type={ButtonType.Secondary}
            text="Install Server"
            onClick={handleInstall(server)}
          />
        </div>
      ))}
    </div>
  );
};

export default ServersList;
