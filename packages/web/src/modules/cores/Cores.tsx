import React from 'react';
import SelectCore from '@ui/SelectCore';
import SelectCoreOption from '@ui/SelectCoreOption';
import { CoreType } from '@utils';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentGameVersion } from '../game-versions/gameVersionsSlice';

import {
  fetchForgeCoresAC,
  fetchFabricCoresAC,
  setCoreType,
  selectCores,
  selectCoreType,
} from './coresSlice';

const Cores = () => {
  const dispatch = useAppDispatch();

  const cores = useAppSelector(selectCores);
  const currentCoreType = useAppSelector(selectCoreType);
  const currentVersion = useAppSelector(selectCurrentGameVersion);

  const handleClick = () => {
    if (currentVersion) {
      if (currentCoreType === CoreType.Forge)
        dispatch(fetchForgeCoresAC(currentVersion));
      if (currentCoreType === CoreType.Fabric)
        dispatch(fetchFabricCoresAC(currentVersion));
    }
  };

  const handleChange = (id: string) => {
    dispatch(setCoreType(id as CoreType));
  };

  return (
    <div>
      {currentCoreType}
      <SelectCore defaultId="forge" onChange={handleChange}>
        <SelectCoreOption type="forge" />
        <SelectCoreOption type="fabric" />
      </SelectCore>
      {JSON.stringify(cores)}
      <button onClick={handleClick}>Fetch</button>
    </div>
  );
};

export default Cores;
