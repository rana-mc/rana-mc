import React, { useState } from 'react';
import cn from 'classnames';

import GameVersions from '@modules/game-versions/GameVersions';
import VersionTypes from '@modules/version-types/VersionTypes';
import Button from '@ui/Button';

import CoreBuilder from '../core-builder/CoreBuilder';
import styles from './ServerCreate.module.css';
import { selectCurrentGameVersion } from '@modules/game-versions/gameVersionsSlice';
import { selectCurrentVersionTypeId } from '@modules/version-types/versionTypesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ServerCoreType, ServerStatus } from '@rana-mc/types';
import { createServerAC } from './serversSlice';
import Card from '@ui/Card';
import Space, { SpaceDirection, SpaceSize } from '@ui/Space';

const CreateServer = () => {
  const dispatch = useAppDispatch();

  /** TODO: From store */
  const id = 'test';
  const name = 'test';

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
      if (core.type === ServerCoreType.Forge) {
        const forgeCore = core as ForgeCore;

        if (forgeCore?.installerUrl) {
          window.open(forgeCore?.installerUrl, '_blank', 'noopener,noreferrer');
        }
      }

      dispatch(createServerAC(server));
    }
  };

  return (
    <div className={cn(styles.createServer)}>
      <Card title="Game Version">
        <Space size={SpaceSize.Large} direction={SpaceDirection.Horizontal}>
          <VersionTypes />
          <GameVersions />
        </Space>
      </Card>
      <Card title="Server Core">
        <CoreBuilder onCoreBuild={handleCoreBuild} />
      </Card>
      <section className={cn(styles.section)}>
        <Button text="Create Server" onClick={handleCreate} />
      </section>
    </div>
  );
};

export default CreateServer;
