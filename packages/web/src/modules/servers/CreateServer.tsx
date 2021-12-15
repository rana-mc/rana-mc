import React, { useState } from 'react';
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
import Label from '@ui/Label';
import Input from '@ui/Input';

const CreateServer = () => {
  const dispatch = useAppDispatch();
  const currentGameVersion = useAppSelector(selectCurrentGameVersion);
  const currentCore = useAppSelector(selecCurrentCore);

  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const handleCreate = () => {
    if (currentGameVersion && currentCore) {
      const server: Server = {
        id,
        name,
        status: 'created',
        core: currentCore,
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
        <Label text="Server Id" />
        <Input onChange={setId} value={id} />
        <Label text="Server Name" />
        <Input onChange={setName} value={name} />
      </section>
      <section className={cn(styles.section)}>
        <Button text="Create Server" onClick={handleCreate} />
      </section>
    </div>
  );
};

export default CreateServer;
