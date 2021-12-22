import { ServerCoreType } from '@rana-mc/types';
import SelectCoreOption from '@ui/SelectCoreOption';
import React from 'react';

export const FabricCoreSelector = ({ onChange }: { onChange: () => void }) => (
  <SelectCoreOption
    icon="fabric"
    title="Fabric"
    description="Lightweight"
    onClick={onChange}
  />
);

export const FabricCoreBuilder = ({
  version,
  onCoreBuild,
}: {
  version: string;
  onCoreBuild: (core: ServerCore) => void;
}) => {
  const handleCoreBuild = () => {
    if (onCoreBuild)
      onCoreBuild({
        type: ServerCoreType.Fabric,
        gameVersion: '*',
        coreVersion: '1',
        installerUrl: '2',
        maven: '3',
        stable: true,
      });
  };

  return (
    <div role="presentation" onClick={handleCoreBuild}>
      {version}
      builder fabric here
    </div>
  );
};

export const FabricStrategy = {
  Selector: FabricCoreSelector,
  CoreBuilder: FabricCoreBuilder,
};

export default FabricStrategy;
