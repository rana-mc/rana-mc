import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import styles from './index.css';
import { ServerEvents } from '@rana-mc/types';

import { ranaSocket } from '../../vendors/ranaSocketIo';
import { parseLine, prepareLines } from './utils';

const UPDATE_LOGS_DELAY = 500;

type Props = {
  serverId?: string;
};

const ServerLogs = ({ serverId }: Props) => {
  const fullServerLogs: string[] = [];
  const [logs, setLogs] = useState<string[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleLogAppend = useCallback(
    debounce(
      (logsToUpdate) => setLogs(prepareLines(logsToUpdate.slice(-100))),
      UPDATE_LOGS_DELAY
    ),
    []
  );

  ranaSocket.on(ServerEvents.Logs, (logsServerId: string, message: string) => {
    if (serverId) {
      if (serverId === logsServerId) {
        fullServerLogs.push(message);
        handleLogAppend(fullServerLogs);
      }
      return;
    }

    fullServerLogs.push(message);
    handleLogAppend(fullServerLogs);
  });

  const renderLine = (line: string) =>
    parseLine(line).groups.map((group) =>
      group.name ? (
        <span className={`serverLogs__${group.name}`}>{group.value}</span>
      ) : (
        <span className="serverLogs__line">{group.value}</span>
      )
    );

  return (
    <div className="serverLogs">
      {logs.map((log) => (
        <span className="serverLogs__log">{renderLine(log)}</span>
      ))}
    </div>
  );
};

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default ServerLogs;
