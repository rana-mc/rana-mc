import SelectCore from '@ui/SelectCore';
import SelectCoreOption from '@ui/SelectCoreOption';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentGameVersion } from '../game-versions/gameVersionsSlice';

import { fetchCoresAC, selectCores } from './coresSlice';

const Cores = () => {
  const dispatch = useAppDispatch();

  const cores = useAppSelector(selectCores);
  const currentVersion = useAppSelector(selectCurrentGameVersion);

  const handleChange = () => {
    if (currentVersion) dispatch(fetchCoresAC(currentVersion));
  };

  return (
    <div>
      <SelectCore onChange={handleChange}>
        <SelectCoreOption type="forge" />
        <SelectCoreOption type="fabric" />
      </SelectCore>
      {JSON.stringify(cores)}
    </div>
  );
};

export default Cores;
