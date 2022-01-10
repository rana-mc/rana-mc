import Fabric from './Fabric';
import Forge from './Forge';

type Props = {
  coreTypeId: string;
  onBuild: (serverCore: ServerCore) => void;
};

const ServerCoreBuilder = ({ coreTypeId, onBuild }: Props) => {
  const handleForgeBuild = (core: ForgeCore) => onBuild({ type: 'forge', ...core });
  const handleFabricBuild = (core: FabricCore) => onBuild({ type: 'fabric', ...core });

  return (
    <>
      {coreTypeId === 'forge' && <Forge onBuild={handleForgeBuild} />}
      {coreTypeId === 'fabric' && <Fabric onBuild={handleFabricBuild} />}
    </>
  );
};

export default ServerCoreBuilder;
