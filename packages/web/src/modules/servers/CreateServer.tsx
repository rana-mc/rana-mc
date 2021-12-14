import React from 'react';
import cn from 'classnames';

import Cores from '@modules/cores/Cores';
import GameVersions from '@modules/game-versions/GameVersions';
import VersionTypes from '@modules/version-types/VersionTypes';
import Button from '@ui/Button';

import styles from './CreateServer.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createServerAC } from './serversSlice';
import { selectCurrentGameVersion } from '@modules/game-versions/gameVersionsSlice';
import { selecCurrentCore } from '@modules/cores/coresSlice';

const CreateServer = () => {
  const dispatch = useAppDispatch();
  const currentGameVersion = useAppSelector(selectCurrentGameVersion);
  const currentCore = useAppSelector(selecCurrentCore);

  const handleCreate = () => {
    if (currentGameVersion && currentCore) {
      const server: Server = {
        id: 'test',
        name: 'Test Server',
        gameVersion: currentGameVersion,
        coreVersion: currentCore?.coreVersion,
        installerUrl: currentCore?.installerUrl,
        mods: [],
      };

      dispatch(createServerAC(server));
    }
  };

  return (
    <div className={cn(styles.createServer)}>
      <section className={cn(styles.section)}>
        <VersionTypes />
      </section>
      <section className={cn(styles.section)}>
        <GameVersions />
      </section>
      <section className={cn(styles.section)}>
        <Cores />
      </section>
      <section className={cn(styles.section)}>
        <Button text="Create Server" onClick={handleCreate} />
      </section>
    </div>
  );
};

export default CreateServer;
