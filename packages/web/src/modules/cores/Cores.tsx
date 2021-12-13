import React from 'react';
import SelectCore from '@ui/SelectCore';
import SelectCoreOption from '@ui/SelectCoreOption';
import { CoreType } from '@utils';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentGameVersion } from '../game-versions/gameVersionsSlice';

import {
  fetchForgeCoresAC,
  fetchFabricCoresAC,
  selectCores,
  selectCoreType,
} from './coresSlice';

const Cores = () => {
  const dispatch = useAppDispatch();

  const cores = useAppSelector(selectCores);
  const coreType = useAppSelector(selectCoreType);
  const currentVersion = useAppSelector(selectCurrentGameVersion);

  const handleChange = () => {
    if (currentVersion) {
      if (coreType === CoreType.Forge)
        dispatch(fetchForgeCoresAC(currentVersion));
      if (coreType === CoreType.Fabric)
        dispatch(fetchFabricCoresAC(currentVersion));
    }
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
