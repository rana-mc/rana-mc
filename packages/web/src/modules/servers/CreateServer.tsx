import React from 'react';
import cn from 'classnames';

import Cores from '@modules/cores/Cores';
import GameVersions from '@modules/game-versions/GameVersions';
import VersionTypes from '@modules/version-types/VersionTypes';
import Button from '@ui/Button';

import styles from './CreateServer.module.css';

const CreateServer = () => {
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
        <Button text="Create Server" />
      </section>
    </div>
  );
};

export default CreateServer;
