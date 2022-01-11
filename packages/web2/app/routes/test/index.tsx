import axios from 'axios';
import { useMemo, useState } from 'react';
import { useFetcher, useLoaderData } from 'remix';
import { Panel } from 'rsuite';
import CreateServerForm from '~/components/CreateServerForm';
import FloatBottom from '~/components/FloatBottom';
import GameVersionSelect from '~/components/GameVersionSelect';
import Layout, { links as layoutLinks } from '~/components/Layout';
import ServerCoreBuilder from '~/components/ServerCoreBuilder';
import ServerCoreTypeSelect from '~/components/ServerCoreTypeSelect';
import VersionTypeSelect from '~/components/VersionTypeSelect';

export type CreateServerContext = {
  gameVersionId?: string;
  serverCore?: ServerCore;
  setServerCore: (serverCore: ServerCore) => void;
};

export const meta = () => ({ title: 'RanaMC | Test' });
export const links = () => [...layoutLinks()];

export const loader = async () => {
  const response = await axios.get('http://localhost:3001/api/version-types');
  return response.data;
};

const findGameVersionByVersionTypeId = (
  gameVersions: GameVersion[] = [],
  versionTypeId: number = -1
) => gameVersions?.find((el) => el.type === versionTypeId);

const Test = () => {
  const [versionTypeId, setVersionTypeId] = useState<number>();
  const [gameVersionId, setGameVersionId] = useState<string>();
  const [serverCoreTypeId, setServerCoreTypeId] = useState<string>();
  const [serverCore, setServerCore] = useState<ServerCore>();

  const versionTypes = useLoaderData<VersionType[]>();
  const gameVersions = useFetcher<GameVersion[]>();

  const handleVersionTypeIdChange = (value: number) => {
    setVersionTypeId(value);

    gameVersions.submit(
      { version: value.toString() },
      { method: 'post', action: '/test/api/gameVersions' }
    );
  };

  const handleGameVersionIdChange = (value: string) => {
    setGameVersionId(value);
  };

  const handleServerCoreTypeIdChange = (value: string) => {
    setServerCoreTypeId(value);
  };

  const handleServerCoreBuild = (value: ServerCore) => {
    setServerCore(value);
  };

  const gameVersion = useMemo(
    () => findGameVersionByVersionTypeId(gameVersions.data, versionTypeId),
    [versionTypeId, gameVersions]
  );

  return (
    <Layout pageTitle="About" path={['Home', 'Test']}>
      <Panel
        style={{ backgroundColor: '#fff', marginBottom: 32 }}
        header={<h4 style={{ fontWeight: 600 }}>Game Version</h4>}
        bordered>
        <VersionTypeSelect
          defaultValue={versionTypeId}
          versionTypes={versionTypes}
          onChange={handleVersionTypeIdChange}
        />
        {gameVersion && (
          <GameVersionSelect
            gameVersion={gameVersion}
            onChange={handleGameVersionIdChange}
          />
        )}
      </Panel>
      <Panel
        style={{ backgroundColor: '#fff', marginBottom: 32 }}
        header={<h4 style={{ fontWeight: 600 }}>Server Core</h4>}
        bordered>
        <ServerCoreTypeSelect
          defaultValue={serverCoreTypeId}
          onChange={handleServerCoreTypeIdChange}
        />
      </Panel>
      <Panel
        style={{ backgroundColor: '#fff', marginBottom: 32 }}
        header={<h4 style={{ fontWeight: 600 }}>Core Version</h4>}
        bordered>
        {serverCoreTypeId && (
          <ServerCoreBuilder
            gameVersionId={gameVersionId}
            coreTypeId={serverCoreTypeId}
            onBuild={handleServerCoreBuild}
          />
        )}
      </Panel>
      <FloatBottom>
        <Panel style={{ backgroundColor: '#F5F5F5' }} bordered>
          {JSON.stringify(serverCore)}
          <CreateServerForm />
        </Panel>
      </FloatBottom>
    </Layout>
  );
};

export default Test;
