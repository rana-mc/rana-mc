import {
  Panel,
  Tag,
  Button,
  Row,
  Col,
  Grid,
  Toggle,
  Divider,
  Stack,
  ButtonToolbar,
  PanelGroup,
} from 'rsuite';
import CodeIcon from '@rsuite/icons/Code';
import ToolsIcon from '@rsuite/icons/Tools';
import AppSelectIcon from '@rsuite/icons/AppSelect';
import DocPassIcon from '@rsuite/icons/DocPass';
import ServerLogs, { links as serverLogsLinks } from '~/components/ServerLogs';
import styles from './index.css';
import Badge, { links as badgeLinks } from '../Badge';
import { ServerStatus } from '~/vendors/ranaSocketIo';
import { MOBILE_QUREY } from '~/constants';
import { useMediaQuery } from '~/hooks/useMediaQuery';

type Props = {
  server: Server;
  onInstall: () => void;
  onStart: () => void;
  onStop: () => void;
  onRemove: () => void;
  onEulaChange: (value: boolean) => void;
};

const ServerCardLarge = ({
  server,
  onInstall,
  onStart,
  onStop,
  onRemove,
  onEulaChange,
}: Props) => {
  const isMobile = useMediaQuery(MOBILE_QUREY);

  const handleInstall = () => onInstall();
  const handleStart = () => onStart();
  const handleStop = () => onStop();
  const handleRemove = () => onRemove();
  const handleEulaChange = (value: boolean) => onEulaChange(value);

  return (
    <PanelGroup style={{ backgroundColor: '#fff' }} accordion bordered>
      <Panel defaultExpanded collapsible={false}>
        <Stack justifyContent="space-between" alignItems="center">
          <Stack alignItems="flex-start" spacing={12}>
            <h5 className="serverCardLarge__header">{server.name}</h5>
            <Badge altColor="grey" content={server.id} />
          </Stack>
          <Tag size="sm" color="cyan">
            {server.status}
          </Tag>
        </Stack>
      </Panel>
      <Grid fluid>
        <Row>
          <Col xs={isMobile ? 24 : 12}>
            <Panel collapsible defaultExpanded>
              <Stack
                direction="column"
                alignItems="stretch"
                divider={<Divider className="serverCardLarge__divider" />}>
                <Stack justifyContent="space-between" alignItems="center">
                  <Stack alignItems="center" spacing={8}>
                    <CodeIcon />
                    {server.gameVersion}
                  </Stack>
                  <Stack>{server.gameVersion}</Stack>
                </Stack>
                <Stack justifyContent="space-between" alignItems="center">
                  <Stack alignItems="center" spacing={8}>
                    <ToolsIcon />
                    <span style={{ textTransform: 'capitalize' }}>
                      {server.core.type}
                    </span>
                  </Stack>
                  <Stack>...</Stack>
                </Stack>
                <Stack justifyContent="space-between" alignItems="center">
                  <Stack alignItems="center" spacing={8}>
                    <AppSelectIcon />
                    Mods
                  </Stack>
                  <Stack>{server.mods.length}</Stack>
                </Stack>
                <Stack justifyContent="space-between" alignItems="center">
                  <Stack alignItems="center" spacing={8}>
                    <DocPassIcon />
                    EULA
                  </Stack>
                  <Stack>
                    <Toggle defaultChecked={server.eula} onChange={handleEulaChange} />
                  </Stack>
                </Stack>
              </Stack>
            </Panel>
            <Panel bodyFill defaultExpanded className="serverCardLarge__footer">
              <ButtonToolbar>
                <Stack justifyContent="space-between">
                  <Button
                    appearance="link"
                    color="red"
                    size="md"
                    disabled={
                      !(
                        server.status === ServerStatus.Created ||
                        server.status === ServerStatus.Stopped
                      )
                    }
                    onClick={handleRemove}>
                    {server.status === ServerStatus.Removing ? 'Removing...' : 'Remove'}
                  </Button>
                  <Stack spacing={12}>
                    <Button
                      appearance="link"
                      color="cyan"
                      disabled={
                        server.status === ServerStatus.CoreInstalled ||
                        server.status === ServerStatus.CoreInstalling
                      }
                      size="md"
                      onClick={handleInstall}>
                      {server.status === ServerStatus.CoreInstalling
                        ? 'Installing...'
                        : 'Install'}
                    </Button>
                    <Button
                      appearance="link"
                      color="orange"
                      disabled={
                        server.status === ServerStatus.Stopping ||
                        server.status === ServerStatus.Stopped
                      }
                      size="md"
                      onClick={handleStop}>
                      {server.status === ServerStatus.Stopping ? 'Stopping...' : 'Stop'}
                    </Button>
                    <Button
                      appearance="ghost"
                      disabled={
                        server.status === ServerStatus.Starting ||
                        server.status === ServerStatus.Started
                      }
                      size="md"
                      onClick={handleStart}>
                      {server.status === ServerStatus.Starting ? 'Starting...' : 'Start'}
                    </Button>
                  </Stack>
                </Stack>
              </ButtonToolbar>
            </Panel>
          </Col>
          <Col xs={isMobile ? 24 : 12}>
            <Panel collapsible defaultExpanded header="Logs">
              <ServerLogs />
            </Panel>
          </Col>
        </Row>
      </Grid>
    </PanelGroup>
  );
};

export const links = () => [
  { rel: 'stylesheet', href: styles },
  ...serverLogsLinks(),
  ...badgeLinks(),
];

export default ServerCardLarge;
