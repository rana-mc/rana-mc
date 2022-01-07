import { Panel } from 'rsuite';
import { useLoaderData } from 'remix';
import axios from 'axios';
import Layout, { links as layoutLinks } from '~/components/Layout';
import GameVersionSelect, {
  links as gameVersionSelectLinks,
} from '~/components/GameVersionSelect';

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

  return (
    <Layout pageTitle="Create server" path={['Home', 'Servers']}>
      <Panel
        style={{ backgroundColor: '#fff' }}
        header={<h4 style={{ fontWeight: 600 }}>Game Version</h4>}
        bordered
      >
        <GameVersionSelect gameVersions={gameVersions} versionTypes={versionTypes} />
      </Panel>
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

export const links = () => [...layoutLinks(), ...gameVersionSelectLinks()];

export default CreateServer;
