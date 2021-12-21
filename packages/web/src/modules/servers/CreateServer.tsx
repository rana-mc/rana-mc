import React, { useState } from 'react';
import cn from 'classnames';

import GameVersions from '@modules/game-versions/GameVersions';
import VersionTypes from '@modules/version-types/VersionTypes';
import Button from '@ui/Button';

import Label from '@ui/Label';
import Input from '@ui/Input';
import styles from './CreateServer.module.css';

const CreateServer = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const handleCreate = () => {
    // if (currentGameVersion && currentCoreType && currentVersionType && currentCore) {
    //   const server: Server = {
    //     id,
    //     name,
    //     gameVersion: currentGameVersion,
    //     gameVersionTypeId: currentVersionType,
    //     status: ServerStatus.Created,
    //     core: {},
    //     mods: [],
    //     eula: false,
    //     startTimes: [],
    //   };

    //   // FYI: Support link of Forge
    //   if (currentCoreType === CoreType.Forge && currentCore?.installerUrl) {
    //     window.open(currentCore?.installerUrl, '_blank', 'noopener,noreferrer');
    //   }

    //   dispatch(createServerAC(server));
    // }
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
        cores
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
