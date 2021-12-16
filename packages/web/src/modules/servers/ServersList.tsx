import { useAppDispatch, useAppSelector } from '../../app/hooks';
import React, { useEffect } from 'react';
import cn from 'classnames';
import {
  fetchServersAC,
  installServerAC,
  removeServerAC,
  selectServers,
} from './serversSlice';
import styles from './ServersList.module.css';
import Empty from '@ui/Empty';
import Button, { ButtonSize, ButtonType, ButtonView } from '@ui/Button';
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

  const handleInstall = (server: Server) => () => {
    dispatch(installServerAC(server));
  };

  const handleRemove = (server: Server) => () => {
    dispatch(removeServerAC(server));
  };

  return (
    <div className={cn(styles.serversList)}>
      {servers.map((server) => (
        <div key={server.id} className={cn(styles.server)}>
          <div className={cn(styles.values)}>
            <span className={cn(styles.value)}>id: {server.id}</span>
            <span className={cn(styles.value)}>name: {server.name}</span>
            <span className={cn(styles.value)}>core: {server.core.type}</span>
            <span className={cn(styles.value)}>coreVersion: {server.core.coreVersion}</span>
            <span className={cn(styles.value)}>installerUrl: {server.core.installerUrl}</span>
            <span className={cn(styles.value)}>
              status: {server.status || 'unknown'}
            </span>
          </div>
          <div className={cn(styles.buttons)}>
            <Button
              className={cn(styles.button)}
              size={ButtonSize.Small}
              type={ButtonType.Secondary}
              text="Install Server"
              onClick={handleInstall(server)}
            />
            <Button
              className={cn(styles.button)}
              size={ButtonSize.Small}
              type={ButtonType.Secondary}
              view={ButtonView.Danger}
              text="Remove"
              onClick={handleRemove(server)}
            />
          </div>
        </div>
      ))}
      <ServerLogs />
    </div>
  );
};

export default ServersList;
