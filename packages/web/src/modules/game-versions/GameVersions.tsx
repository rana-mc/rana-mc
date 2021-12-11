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

  return (
    <div>
      {gameVersions?.map((gameVersion) => (
        <div
          role="presentation"
          onClick={() => dispatch(setCurrentGameVersion(gameVersion))}>
          {JSON.stringify(gameVersion)}
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
