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

type Props = {
  server: Server;
  onStart?: () => void;
  onStop?: () => void;
  onRemove?: () => void;
  onEulaChange?: (value: boolean) => void;
};

const ServerCardLarge = ({ server }: Props) => {
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
          <Col xs={12}>
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
                    <Toggle defaultChecked={server.eula} />
                  </Stack>
                </Stack>
              </Stack>
            </Panel>
            <Panel bodyFill defaultExpanded className="serverCardLarge__footer">
              <ButtonToolbar>
                <Stack justifyContent="space-between">
                  <Button appearance="link" color="red" size="md">
                    Remove
                  </Button>
                  <Stack spacing={12}>
                    <Button appearance="link" color="orange" size="md">
                      Stop server
                    </Button>
                    <Button appearance="ghost" size="md">
                      Start server
                    </Button>
                  </Stack>
                </Stack>
              </ButtonToolbar>
            </Panel>
          </Col>
          <Col xs={12}>
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
