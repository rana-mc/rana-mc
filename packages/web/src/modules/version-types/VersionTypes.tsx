import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchVersionTypesAC,
  selectVersionTypes,
  setCurrentVersionType,
} from './versionTypesSlice';

import styles from './VersionTypes.module.css';

const VersionTypes = () => {
  const dispatch = useAppDispatch();
  const versionTypes = useAppSelector(selectVersionTypes);

  useEffect(() => {
    if (!versionTypes) dispatch(fetchVersionTypesAC());
  }, [dispatch, versionTypes]);

  if (!versionTypes) {
    return null;
  }

  return (
    <div>
      {versionTypes?.map((versionType) => (
        <div
          role="presentation"
          onClick={() => dispatch(setCurrentVersionType(versionType.id))}>
          {versionType.name}
        </div>
      ))}
      <button
        className={styles.button}
        onClick={() => dispatch(fetchVersionTypesAC())}>
        Fetch GameVersions
      </button>
    </div>
  );
};

export default VersionTypes;
