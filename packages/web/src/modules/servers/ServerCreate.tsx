import React, { useState } from 'react';
import cn from 'classnames';

import GameVersions from '@modules/game-versions/GameVersions';
import VersionTypes from '@modules/version-types/VersionTypes';
import Button from '@ui/Button';

import Label from '@ui/Label';
import Input from '@ui/Input';
import CoreBuilder from '../core-builder/CoreBuilder';
import styles from './ServerCreate.module.css';
import { selectCurrentGameVersion } from '@modules/game-versions/gameVersionsSlice';
import { selectCurrentVersionTypeId } from '@modules/version-types/versionTypesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ServerCoreType, ServerStatus } from '@rana-mc/types';
import { createServerAC } from './serversSlice';

const CreateServer = () => {
  const dispatch = useAppDispatch();

  const [id, setId] = useState<string>();
  const [name, setName] = useState<string>();
  const [core, setCore] = useState<ServerCore>();

  const gameVersion = useAppSelector(selectCurrentGameVersion);
  const versionTypeId = useAppSelector(selectCurrentVersionTypeId);

  const handleCoreBuild = (core: ServerCore) => {
    console.log(core);
    setCore(core);
  };

  const handleCreate = () => {
    if (id && name && gameVersion && versionTypeId && core) {
      const server: Server = {
        id,
        name,
        gameVersion,
        gameVersionTypeId: versionTypeId,
        status: ServerStatus.Created,
        core,
        mods: [],
        eula: false,
        startTimes: [],
      };

      // FYI: Support link of Forge
      if (core.type === ServerCoreType.Forge && core?.installerUrl) {
        window.open(core?.installerUrl, '_blank', 'noopener,noreferrer');
      }

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
        <CoreBuilder onCoreBuild={handleCoreBuild} />
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
