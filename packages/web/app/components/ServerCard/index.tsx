import { Panel, Toggle, Stack, Tag, Divider, Button } from 'rsuite';
import CodeIcon from '@rsuite/icons/Code';
import ToolsIcon from '@rsuite/icons/Tools';
import AppSelectIcon from '@rsuite/icons/AppSelect';
import DocPassIcon from '@rsuite/icons/DocPass';
import styles from './index.css';
import { useNavigate } from '@remix-run/react';

type Props = {
  server: Server;
};

const ServerCard = ({ server }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/servers/${server.id}`);
  };

  const handleToggleClick: React.MouseEventHandler<HTMLDivElement> = (event) =>
    event.stopPropagation();

  return (
    <Panel
      role="presentation"
      onClick={handleClick}
      className="serverCard"
      shaded
      bordered
      bodyFill>
      <Panel
        header={
          <Stack justifyContent="space-between" alignItems="center">
            <h5 className="serverCard__header">{server.name}</h5>
            <Tag size="sm" color="cyan">
              Created
            </Tag>
          </Stack>
        }>
        <Stack
          direction="column"
          alignItems="stretch"
          // spacing={16}
          divider={<Divider className="serverCard__divider" />}>
          <Stack justifyContent="space-between" alignItems="center">
            <Stack alignItems="center" spacing={8}>
              <CodeIcon />
              Game version
            </Stack>
            <Stack>{server.gameVersion}</Stack>
          </Stack>
          <Stack justifyContent="space-between" alignItems="center">
            <Stack alignItems="center" spacing={8}>
              <ToolsIcon />
              Forge
            </Stack>
            <Stack>123</Stack>
          </Stack>
          <Stack justifyContent="space-between" alignItems="center">
            <Stack alignItems="center" spacing={8}>
              <AppSelectIcon />
              Mods
            </Stack>
            <Stack>32</Stack>
          </Stack>
          <div onClick={handleToggleClick}>
            <Stack justifyContent="space-between" alignItems="center">
              <Stack alignItems="center" spacing={8}>
                <DocPassIcon />
                EULA
              </Stack>
              <Stack>
                <Toggle />
              </Stack>
            </Stack>
          </div>
        </Stack>
      </Panel>
      <Panel bodyFill className="serverCard__footer">
        <Stack justifyContent="space-between" alignItems="stretch">
          <Button appearance="link" size="sm">
            Go to server
          </Button>
          <Button color="red" appearance="link" size="sm">
            Remove
          </Button>
        </Stack>
      </Panel>
    </Panel>
  );
};

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default ServerCard;
