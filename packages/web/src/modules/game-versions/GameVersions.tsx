import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchGameVersionsAC,
  selectGameVersions,
  setCurrentGameVersion,
} from './gameVersionsSlice';

import styles from './GameVersions.module.css';
import { selectCurrentVersionType } from '../version-types/versionTypesSlice';

const GameVersions = () => {
  const dispatch = useAppDispatch();
  const allGameVersions = useAppSelector(selectGameVersions);
  const versionType = useAppSelector(selectCurrentVersionType);

  const gameVersion = allGameVersions?.find(
    (gameVersion) => gameVersion.type.toString() === versionType
  );

  useEffect(() => {
    if (!gameVersion) dispatch(fetchGameVersionsAC());
  }, [dispatch, gameVersion]);

  if (!gameVersion) {
    return null;
  }

  return (
    <div>
      type: {gameVersion.type}
      {gameVersion.versions.map((version) => (
        <div
          role="presentation"
          onClick={() => dispatch(setCurrentGameVersion(version))}>
          {version}
        </div>
      ))}
      <button
        className={styles.button}
        onClick={() => dispatch(fetchGameVersionsAC())}>
        Fetch GameVersions
      </button>
    </div>
  );
};

export default GameVersions;
