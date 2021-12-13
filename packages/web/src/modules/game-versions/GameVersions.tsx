import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchGameVersionsAC,
  selectGameVersions,
  setCurrentGameVersion,
} from './gameVersionsSlice';

import { selectCurrentVersionType } from '../version-types/versionTypesSlice';
import SelectOption from '@ui/SelectOption';
import Select from '@ui/Select';
import Empty from '@ui/Empty';

const GameVersions = () => {
  const dispatch = useAppDispatch();
  const allGameVersions = useAppSelector(selectGameVersions);
  const versionType = useAppSelector(selectCurrentVersionType);

  const gameVersion = allGameVersions?.find(
    (gameVersion) => gameVersion.type === versionType
  );

  useEffect(() => {
    if (!gameVersion) dispatch(fetchGameVersionsAC());
  }, [dispatch, gameVersion]);

  if (!gameVersion) {
    return <Empty textOnly select size="s" text="Please, select game version" />;
  }

  if (gameVersion?.versions?.length === 0) {
    return <Empty size="s" text="Has no available game versions" />;
  }

  const handleChange = (id: string) => {
    dispatch(setCurrentGameVersion(id));
  };

  return (
    <div>
      <Select onChange={handleChange}>
        {gameVersion.versions.map((version) => (
          <SelectOption
            key={version}
            id={version}
            icon="minecraft"
            text={version}
          />
        ))}
      </Select>
    </div>
  );
};

export default GameVersions;
