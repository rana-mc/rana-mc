import Fabric from './Fabric';
import Forge from './Forge';
import styles from './index.css';

type Props = {
  gameVersionId?: string;
  coreTypeId: string;
  onBuild: (serverCore: ServerCore) => void;
};

const ServerCoreBuilder = ({ gameVersionId, coreTypeId, onBuild }: Props) => {
  const handleForgeBuild = (core: ForgeCore) => onBuild({ type: 'forge', ...core });
  const handleFabricBuild = (core: FabricCore) => onBuild({ type: 'fabric', ...core });

  if (!gameVersionId) {
    return null;
  }

  return (
    <>
      {coreTypeId === 'forge' && (
        <Forge gameVersionId={gameVersionId} onBuild={handleForgeBuild} />
      )}
      {coreTypeId === 'fabric' && (
        <Fabric gameVersionId={gameVersionId} onBuild={handleFabricBuild} />
      )}
    </>
  );
};

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default ServerCoreBuilder;
