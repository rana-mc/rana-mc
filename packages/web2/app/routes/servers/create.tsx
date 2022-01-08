import { Panel } from 'rsuite';
import { useLoaderData } from 'remix';
import axios from 'axios';
import { useState } from 'react';
import Layout, { links as layoutLinks } from '~/components/Layout';
import VersionTypeSelect, {
  links as versionTypeSelectLinks,
} from '~/components/VersionTypeSelect';
import FloatBottom, { links as floatBottomLinks } from '~/components/FloatBottom';
import CreateServerForm, {
  links as createServerFormLinks,
} from '~/components/CreateServerForm';
import GameVersionSelect, {
  links as gameVersionSelectLinks,
} from '~/components/GameVersionSelect';
import ServerCoreTypeSelect, {
  links as serverCoreTypeSelectLinks,
} from '~/components/ServerCoreTypeSelect';
import CoreVersionSelect from '~/components/CoreVersionSelect';

type GameVersion = { type: number; versions: string[] };
type VersionType = { id: number; gameId: number; name: string; slug: string };
type GreateServerData = {
  gameVersions: GameVersion[];
  versionTypes: VersionType[];
};

const fetchGameVersions = async () => {
  const response = await axios.get('http://localhost:3001/api/versions');
  return response.data;
};

const fetchVersionTypes = async () => {
  const response = await axios.get('http://localhost:3001/api/version-types');
  return response.data;
};

export const loader = async () => {
  const gameVersions = await fetchGameVersions();
  const versionTypes = await fetchVersionTypes();

  return { gameVersions, versionTypes };
};

const CreateServer = () => {
  const { gameVersions, versionTypes } = useLoaderData<GreateServerData>();
  const [gameVersion, setGameVersion] = useState<GameVersion>();
  const [version, setVersion] = useState<string>();
  const [serverCoreType, setServerCoreType] = useState<string>();

  const handleVersionTypeChange = (value: number) => {
    const currentGameVersion = gameVersions.find(
      (_gameVersion) => _gameVersion.type === value
    );

    setGameVersion(currentGameVersion);
  };

  const handleVersionChange = (value: string) => {
    setVersion(value);
  };

  const handleServerCoreTypeChange = (value: string) => {
    setServerCoreType(value);
  };

  return (
    <Layout pageTitle="Create server" path={['Home', 'Servers']}>
      <Panel
        style={{ backgroundColor: '#fff', marginBottom: 32 }}
        header={<h4 style={{ fontWeight: 600 }}>Game Version</h4>}
        bordered
      >
        <VersionTypeSelect
          versionTypes={versionTypes}
          onChange={handleVersionTypeChange}
        />
        {gameVersion && (
          <GameVersionSelect gameVersion={gameVersion} onChange={handleVersionChange} />
        )}
      </Panel>
      <Panel
        style={{ backgroundColor: '#fff', marginBottom: 32 }}
        header={<h4 style={{ fontWeight: 600 }}>Server Core</h4>}
        bordered
      >
        <ServerCoreTypeSelect onChange={handleServerCoreTypeChange} />
      </Panel>
      <Panel
        style={{ backgroundColor: '#fff', marginBottom: 32 }}
        header={<h4 style={{ fontWeight: 600 }}>Core Version</h4>}
        bordered
      >
        <CoreVersionSelect coreType={serverCoreType} />
      </Panel>
      <FloatBottom>
        <Panel style={{ backgroundColor: '#F5F5F5' }} bordered>
          {version}
          -
          {serverCoreType}
          <CreateServerForm />
        </Panel>
      </FloatBottom>
    </Layout>
  );
};

export const ErrorBoundary = ({ error }: { error: Error }) => (
  <Layout pageTitle="Servers" path={['Servers']}>
    <h1>Error</h1>
    <p>{error.message}</p>
    <p>The stack trace is:</p>
    <pre>{error.stack}</pre>
  </Layout>
);

export const meta = () => ({
  title: 'RanaMC | Create Server',
});

export const links = () => [
  ...layoutLinks(),
  ...gameVersionSelectLinks(),
  ...versionTypeSelectLinks(),
  ...floatBottomLinks(),
  ...createServerFormLinks(),
  ...serverCoreTypeSelectLinks(),
];

export default CreateServer;
