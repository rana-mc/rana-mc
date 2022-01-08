import { useMemo, useState } from 'react';
import axios from 'axios';
import { useLoaderData } from 'remix';
import { Panel } from 'rsuite';
import GameVersionSelect, {
  links as gameVersionSelectLinks,
} from '~/components/GameVersionSelect';
import VersionTypeSelect, {
  links as versionTypeSelectLinks,
} from '~/components/VersionTypeSelect';

const fetchGameVersions = async () => {
  const response = await axios.get('http://localhost:3001/api/versions');
  return response.data;
};

const fetchVersionTypes = async () => {
  const response = await axios.get('http://localhost:3001/api/version-types');
  return response.data;
};

type LoaderData = { gameVersions: GameVersion[]; versionTypes: VersionType[] };

export const loader = async () => {
  const gameVersions = await fetchGameVersions();
  const versionTypes = await fetchVersionTypes();

  return { gameVersions, versionTypes };
};

const $version = () => {
  const { gameVersions, versionTypes } = useLoaderData<LoaderData>();

  const [versionTypeId, setVersionTypeId] = useState<number>();
  const [gameVersionId, setGameVersionId] = useState<string>();

  const gameVersion = useMemo(
    () => gameVersions.find((version) => version.type === versionTypeId),
    [versionTypeId]
  );

  const handleVersionTypeIdChange = (value: number) => {
    setVersionTypeId(value);
  };

  const handleGameVersionIdChange = (value: string) => {
    setGameVersionId(value);
  };

  return (
    <Panel
      style={{ backgroundColor: '#fff', marginBottom: 32 }}
      header={<h4 style={{ fontWeight: 600 }}>Game Version</h4>}
      bordered>
      <VersionTypeSelect
        versionTypes={versionTypes}
        onChange={handleVersionTypeIdChange}
      />
      {gameVersion && (
        <GameVersionSelect
          gameVersion={gameVersion}
          onChange={handleGameVersionIdChange}
        />
      )}
      {gameVersionId}
    </Panel>
  );
};

export const links = () => [...gameVersionSelectLinks(), ...versionTypeSelectLinks()];

export default $version;
