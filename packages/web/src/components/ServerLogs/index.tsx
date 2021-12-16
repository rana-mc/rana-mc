import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import cn from 'classnames';

import { ranaSocket } from '../../vendors/ranaSocketIo';
import styles from './ServerLogs.module.css';

const UPDATE_LOGS_DELAY = 500;

const ServerLogs = () => {
  const fullServerLogs: string[] = [];
  const [logs, setLogs] = useState<string[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleLogAppend = useCallback(
    debounce((logsToUpdate) => setLogs(logsToUpdate), UPDATE_LOGS_DELAY),
    []
  );

  ranaSocket.on('log', (message: string) => {
    fullServerLogs.push(message);
    handleLogAppend(fullServerLogs);
  });

  return (
    <div className={cn(styles.serverLogs)}>
      {logs.map((log) => (
        <span className={cn(styles.log)}>{log}</span>
      ))}
    </div>
  );
};

export default ServerLogs;
