import React from 'react';
import Cores from '@modules/cores/Cores';
import GameVersions from '@modules/game-versions/GameVersions';
import VersionTypes from '@modules/version-types/VersionTypes';

const CreateServer = () => {
  return (
    <div>
      <VersionTypes />
      <hr />
      <GameVersions />
      <Cores />
    </div>
  );
};

export default CreateServer;
