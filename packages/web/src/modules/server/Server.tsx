import React from 'react';
import cn from 'classnames';
import Button, { ButtonSize, ButtonType, ButtonView } from '@ui/Button';

import styles from './Server.module.css';
import { useAppDispatch } from '../../app/hooks';
import {
  installServerAC,
  startServerAC,
  stopServerAC,
  acceptEULAServerAC,
} from '@modules/server/serverSlice';
import { removeServerAC } from '@modules/servers/serversSlice';
import Switch from '@ui/Switch';
import Label from '@ui/Label';

type Props = {
  server: Server;
};

const Server = ({ server }: Props) => {
  const dispatch = useAppDispatch();

  const handleInstall = (server: Server) => () => {
    dispatch(installServerAC(server));
  };

  const handleStart = (server: Server) => () => {
    dispatch(startServerAC(server));
  };

  const handleStop = (server: Server) => () => {
    dispatch(stopServerAC(server));
  };

  const handleRemove = (server: Server) => () => {
    dispatch(removeServerAC(server));
  };

  const handleEULAChange = (eulaAccept: boolean) => {
    dispatch(acceptEULAServerAC({ server, accept: eulaAccept }));
  };

  return (
    <div key={server.id} className={cn(styles.server)}>
      <div className={cn(styles.values)}>
        <span className={cn(styles.value)}>id: {server.id}</span>
        <span className={cn(styles.value)}>name: {server.name}</span>
        <span className={cn(styles.value)}>
          gameVersion: {server.gameVersion}
        </span>
        <span className={cn(styles.value)}>
          gameVersionTypeId: {server.gameVersionTypeId}
        </span>
        <span className={cn(styles.value)}>core: {server.core.type}</span>
        <span className={cn(styles.value)}>
          coreVersion: {server.core.coreVersion}
        </span>
        <span className={cn(styles.value)}>
          installerUrl: {server.core.installerUrl}
        </span>
        <span className={cn(styles.value)}>
          status: {server.status || 'unknown'}
        </span>
      </div>
      <div className={cn(styles.buttons)}>
        <Button
          className={cn(styles.button)}
          size={ButtonSize.Small}
          type={ButtonType.Secondary}
          text="Install"
          onClick={handleInstall(server)}
        />
        <Button
          className={cn(styles.button)}
          size={ButtonSize.Small}
          type={ButtonType.Secondary}
          text="Start"
          onClick={handleStart(server)}
        />
        <Button
          className={cn(styles.button)}
          size={ButtonSize.Small}
          type={ButtonType.Secondary}
          text="Stop"
          onClick={handleStop(server)}
        />
        <Button
          className={cn(styles.button)}
          size={ButtonSize.Small}
          type={ButtonType.Secondary}
          view={ButtonView.Danger}
          text="Remove"
          onClick={handleRemove(server)}
        />
        <div>
          <Label text="EULA?" />
          <Switch value={server.eula} size="s" onChange={handleEULAChange} />
        </div>
      </div>
    </div>
  );
};

export default Server;
