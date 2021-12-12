import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchVersionTypesAC,
  selectVersionTypes,
  setCurrentVersionType,
} from './versionTypesSlice';
import Tabs from '@ui/Tabs';
import Tab from '@ui/Tab';
import { formatName, formatTypes } from './utils';

const VersionTypes = () => {
  const dispatch = useAppDispatch();
  const versionTypes = useAppSelector(selectVersionTypes);

  useEffect(() => {
    if (!versionTypes) dispatch(fetchVersionTypesAC());
  }, [dispatch, versionTypes]);

  if (!versionTypes) {
    return null;
  }

  const handleChange = (id: string) => {
    dispatch(setCurrentVersionType(parseInt(id)));
  };

  return (
    <div>
      <Tabs onChange={handleChange}>
        {formatTypes(versionTypes)?.map((versionType) => (
          <Tab
            key={versionType.id.toString()}
            id={versionType.id.toString()}
            text={formatName(versionType.name)}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default VersionTypes;
