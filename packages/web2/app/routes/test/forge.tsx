import React from 'react';
import { useOutletContext } from 'remix';
import { Button } from 'rsuite';
import ForgeCoreBuilder from '~/components/CoreBuilder/Forge';
import CoreVersionSelect from '~/components/CoreVersionSelect';
import { CreateServerContext } from '../test';

const Forge = () => {
  const { gameVersionId, setServerCore } = useOutletContext<CreateServerContext>();

  const handleForgeCoreBuild = (core: ForgeCore) => {
    setServerCore({ type: 'forge', ...core });
  };

  return <ForgeCoreBuilder onBuild={handleForgeCoreBuild} />;
};

export default Forge;
