import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import styles from './index.css';

import { ranaSocket } from '~/vendors/ranaSocketIo';
import { parseLine, prepareLines } from './utils';

const UPDATE_LOGS_DELAY = 250;
const LAST_LOGS_COUNT = 100;

type Props = {
  serverId?: string;
};

const ServerLogs = ({ serverId }: Props) => {
  const fullServerLogs: string[] = [];
  const [logs, setLogs] = useState<string[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleLogAppend = useCallback(
    debounce(
      (logsToUpdate) => setLogs(prepareLines(logsToUpdate.slice(-LAST_LOGS_COUNT))),
      UPDATE_LOGS_DELAY
    ),
    []
  );

  // TODO: Replace with ServerEvents.Logs
  ranaSocket.on('logs', (logsServerId: string, message: string) => {
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
    parseLine(line).groups.map((group, index) =>
      group.name ? (
        <span key={`${group.name}_${index}`} className={`serverLogs__${group.name}`}>
          {group.value}
        </span>
      ) : (
        <span key={`${group.name}_${index}`} className="serverLogs__line">
          {group.value}
        </span>
      )
    );

  return (
    <div className="serverLogs">
      {logs.map((log, index) => (
        <span key={`${log.length}_${index}`} className="serverLogs__log">
          {renderLine(log)}
        </span>
      ))}
    </div>
  );
};

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default ServerLogs;
