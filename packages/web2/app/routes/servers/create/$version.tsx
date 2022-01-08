import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { Outlet, useLoaderData, useNavigate, useParams } from 'remix';
import { Panel } from 'rsuite';
import GameVersionIdSelect, {
  links as gameVersionSelectLinks,
} from '~/components/GameVersionSelect';
import VersionTypeIdSelect, {
  links as versionTypeSelectLinks,
} from '~/components/VersionTypeSelect';
import { RESTRICTED_TYPE_IDS } from '~/constants';

// TODO: Move into utils?
const filterGameVersions = (gameVersions: GameVersion[]) => {
  return gameVersions.filter((el) => !RESTRICTED_TYPE_IDS.includes(el.type));
};

const fetchGameVersions = async () => {
  const response = await axios.get('http://localhost:3001/api/versions');
  return filterGameVersions(response.data);
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
  const navigate = useNavigate();
  const params = useParams<{ version?: string }>();
  const { gameVersions, versionTypes } = useLoaderData<LoaderData>();

  const defaultGameVersionId = params.version || '';
  const defaultVersionTypeId = useMemo(() => {
    return (
      gameVersions.find((el) => el.versions.includes(defaultGameVersionId))?.type || -1
    );
  }, [gameVersions, defaultGameVersionId]);

  const [versionTypeId, setVersionTypeId] = useState<number>(defaultVersionTypeId);
  const [gameVersionId, setGameVersionId] = useState<string>(defaultGameVersionId);

  const gameVersion = useMemo(
    () => gameVersions.find((el) => el.type === versionTypeId),
    [versionTypeId, defaultVersionTypeId]
  );

  const handleVersionTypeIdChange = (value: number) => {
    setVersionTypeId(value);
  };

  const handleGameVersionIdChange = (value: string) => {
    setGameVersionId(value);
    navigate(`../${value}/type`, { replace: false });
  };

  return (
    <React.Fragment>
      <Panel
        style={{ backgroundColor: '#fff', marginBottom: 32 }}
        header={<h4 style={{ fontWeight: 600 }}>Game Version</h4>}
        bordered>
        <VersionTypeIdSelect
          defaultValue={defaultVersionTypeId}
          versionTypes={versionTypes}
          onChange={handleVersionTypeIdChange}
        />
        {gameVersion && (
          <GameVersionIdSelect
            defaultValue={defaultGameVersionId}
            gameVersion={gameVersion}
            onChange={handleGameVersionIdChange}
          />
        )}
      </Panel>
      <Outlet />
    </React.Fragment>
  );
};

export const links = () => [...gameVersionSelectLinks(), ...versionTypeSelectLinks()];

export default $version;
