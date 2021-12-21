import React, { useEffect } from 'react';
import SelectCore from '@ui/SelectCore';
import SelectCoreOption from '@ui/SelectCoreOption';
import { ServerCoreType as CoreType } from '@rana-mc/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentGameVersion } from '../game-versions/gameVersionsSlice';

import {
  fetchForgeCoresAC,
  fetchFabricCoresAC,
  setCoreType,
  selectCores,
  selectCurrentCoreType,
  setCurrentCore,
} from './coresSlice';
import CoreSelect from './CoreSelect';

const Cores = () => {
  const dispatch = useAppDispatch();

  const cores = useAppSelector(selectCores);
  const currentCoreType = useAppSelector(selectCurrentCoreType);
  const currentVersion = useAppSelector(selectCurrentGameVersion);

  useEffect(() => {
    if (currentVersion) {
      if (currentCoreType === CoreType.Forge) dispatch(fetchForgeCoresAC(currentVersion));
      if (currentCoreType === CoreType.Fabric)
        dispatch(fetchFabricCoresAC(currentVersion));
    }
  }, [dispatch, currentVersion, currentCoreType]);

  const handleChange = (id: string) => {
    dispatch(setCoreType(id as CoreType));
  };

  const handleSelect = (core: Core) => {
    dispatch(setCurrentCore(core));
  };

  return (
    <div>
      <SelectCore onChange={handleChange}>
        <SelectCoreOption type="forge" />
        <SelectCoreOption type="fabric" />
      </SelectCore>
      {currentCoreType && (
        <CoreSelect type={currentCoreType} cores={cores} onSelect={handleSelect} />
      )}
    </div>
  );
};

export default Cores;
