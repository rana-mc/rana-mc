import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentGameVersion } from '../game-versions/gameVersionsSlice';

import styles from './Cores.module.css';
import { selectCores } from './coresSlice';

const Cores = () => {
  const cores = useAppSelector(selectCores);
  const currentVersion = useAppSelector(selectCurrentGameVersion);

  const handleClick = () => {
    // if (currentVersion) dispatch(fetchCoresAC(currentVersion.name));
    console.log(currentVersion);
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
