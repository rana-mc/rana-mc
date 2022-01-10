import React from 'react';
import { useOutletContext } from 'remix';
import { Button } from 'rsuite';
import FabricCoreBuilder from '~/components/CoreBuilder/Fabric';
import CoreVersionSelect from '~/components/CoreVersionSelect';
import { CreateServerContext } from '../test';

const Fabric = () => {
  const { gameVersionId, setServerCore } = useOutletContext<CreateServerContext>();

  const handleFabricCoreBuild = (core: FabricCore) => {
    setServerCore({ type: 'fabric', ...core });
  };

  return <FabricCoreBuilder onBuild={handleFabricCoreBuild} />;
};

export default Fabric;
