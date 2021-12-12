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
    return <div>not found, {versionType}</div>;
  }

  const handleChange = (id: string) => {
    dispatch(setCurrentGameVersion(id));
  };

  return (
    <div>
      <Select onChange={handleChange}>
        {gameVersion.versions.map((version) => (
          <SelectOption id={version} icon="minecraft" text={version} />
        ))}
      </Select>
    </div>
  );
};

export default GameVersions;
