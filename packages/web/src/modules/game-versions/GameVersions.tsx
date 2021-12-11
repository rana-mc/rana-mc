import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchGameVersionsAC,
  selectGameVersions,
  setCurrentGameVersion,
} from './gameVersionsSlice';

import styles from './GameVersions.module.css';

const GameVersions = () => {
  const dispatch = useAppDispatch();
  const gameVersions = useAppSelector(selectGameVersions);

  useEffect(() => {
    if (!gameVersions) dispatch(fetchGameVersionsAC());
  }, [dispatch, gameVersions]);

  if (!gameVersions) {
    return null;
  }

  return (
    <div>
      {gameVersions?.map((gameVersion) => (
        <React.Fragment>
          type: {gameVersion.type}
          {gameVersion.versions.map((version) => (
            <div
              role="presentation"
              onClick={() => dispatch(setCurrentGameVersion(version))}>
              {version}
            </div>
          ))}
        </React.Fragment>
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
