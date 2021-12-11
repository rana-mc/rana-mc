import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentGameVersion } from '../game-versions/gameVersionsSlice';

import styles from './Cores.module.css';
import { fetchCoresAC, selectCores } from './coresSlice';

const Cores = () => {
  const dispatch = useAppDispatch();

  const cores = useAppSelector(selectCores);
  const currentVersion = useAppSelector(selectCurrentGameVersion);

  const handleClick = () => {
    if (currentVersion) dispatch(fetchCoresAC(currentVersion));
  };

  return (
    <div>
      {JSON.stringify(currentVersion)}
      <hr />
      {JSON.stringify(cores)}
      <button className={styles.button} onClick={handleClick}>
        Fetch Cores
      </button>
    </div>
  );
};

export default Cores;
