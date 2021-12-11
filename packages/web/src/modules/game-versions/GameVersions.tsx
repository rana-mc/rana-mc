import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchGameVersionsAC, selectGameVersions } from './gameVersionsSlice';

import styles from './GameVersions.module.css';

const GameVersions = () => {
  const gameVersions = useAppSelector(selectGameVersions);
  const dispatch = useAppDispatch();

  return (
    <div>
      {JSON.stringify(gameVersions)}
      <button
        className={styles.button}
        onClick={() => dispatch(fetchGameVersionsAC())}>
        Fetch GameVersions
      </button>
    </div>
  );
};

export default GameVersions;
