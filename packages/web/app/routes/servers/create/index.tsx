import axios from 'axios';
import { useMemo, useState } from 'react';
import { useFetcher, useLoaderData, useSubmit } from '@remix-run/react';
import { Panel } from 'rsuite';
import CreateServerForm, { CreateServerFormData } from '~/components/CreateServerForm';
import FloatBottom, { links as floatBottomLinks } from '~/components/FloatBottom';
import GameVersionSelect, {
  links as gameVersionSelectLinks,
} from '~/components/GameVersionSelect';
import Layout, { links as layoutLinks } from '~/components/Layout';
import ServerCoreBuilder, {
  links as serverCoreBuilderLinks,
} from '~/components/ServerCoreBuilder';
import ServerCoreTypeSelect, {
  links as serverCoreTypeSelectLinks,
} from '~/components/ServerCoreTypeSelect';
import VersionTypeSelect, {
  links as versionTypeSelectLinks,
} from '~/components/VersionTypeSelect';

export type CreateServerContext = {
  gameVersionId?: string;
  serverCore?: ServerCore;
  setServerCore: (serverCore: ServerCore) => void;
};

export const meta = () => ({ title: 'RanaMC | Servers' });

// TODO: Maybe move into api?
export const loader = async () => {
  const response = await axios.get('http://localhost:3001/api/version-types');
  return response.data;
};

const findGameVersionByVersionTypeId = (
  gameVersions: GameVersion[] = [],
  versionTypeId: number = -1
) => gameVersions?.find((el) => el.type === versionTypeId);

const CreateIndexRoute = () => {
  const submit = useSubmit();

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
      { method: 'post', action: '/servers/create/api/gameVersions' }
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

  const handleCreateServerFormSubmit = (value: CreateServerFormData) => {
    const { id, name } = value;

    // TODO: Make it better
    if (id && name && gameVersionId && versionTypeId && serverCore) {
      const data: CreateServerRequestData = {
        id,
        name,
        gameVersionId,
        versionTypeId,
        coreType: serverCore.type,
      };

      if (serverCore.type === 'forge') {
        const forgeCore = serverCore as ForgeCore;

        // FYI: Support link of Forge, open in new window
        if (forgeCore?.installerUrl) {
          window.open(forgeCore?.installerUrl, '_blank', 'noopener,noreferrer');
        }

        data.coreVersion = forgeCore.coreVersion;
      }

      if (serverCore.type === 'fabric') {
        const fabricCore = serverCore as FabricCore;

        data.installerVersion = fabricCore.installer.version;
        data.loaderVersion = fabricCore.loader.version;
      }

      submit(data as Record<string, any>, {
        method: 'post',
        action: 'servers/create/api/createServer',
      });
    }
  };

  const gameVersion = useMemo(
    () => findGameVersionByVersionTypeId(gameVersions.data, versionTypeId),
    [versionTypeId, gameVersions]
  );

  return (
    <Layout pageTitle="Create Server" path={['Home', 'Servers']}>
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
        header={<h4 style={{ fontWeight: 600 }}>Server Type</h4>}
        bordered>
        <ServerCoreTypeSelect
          defaultValue={serverCoreTypeId}
          onChange={handleServerCoreTypeIdChange}
        />
      </Panel>
      <Panel
        style={{ backgroundColor: '#fff', marginBottom: 32 }}
        header={<h4 style={{ fontWeight: 600 }}>Core</h4>}
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
          <CreateServerForm onSubmit={handleCreateServerFormSubmit} />
        </Panel>
      </FloatBottom>
    </Layout>
  );
};

export const links = () => [
  ...layoutLinks(),
  ...floatBottomLinks(),
  ...gameVersionSelectLinks(),
  ...serverCoreBuilderLinks(),
  ...serverCoreTypeSelectLinks(),
  ...versionTypeSelectLinks(),
];

export default CreateIndexRoute;
