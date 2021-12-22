import React, { useState } from 'react';
import cn from 'classnames';
import { ServerCoreType } from '@rana-mc/types';
import Empty from '@ui/Empty';
import Select from '@ui/Select';
import SelectCoreOption from '@ui/SelectCoreOption';
import SelectOption from '@ui/SelectOption';
import Spinner, { SpinnerSize } from '@ui/Spinner';
import { UseQueryResult } from 'react-query';
import { useFabricQueries } from './fabricAPI';

import styles from './FabricStrategy.module.css';
import { getFabricServerUrl } from './utils';

export const FabricCoreSelector = ({ onChange }: { onChange: () => void }) => (
  <SelectCoreOption
    icon="fabric"
    title="Fabric"
    description="Lightweight"
    onClick={onChange}
  />
);

export const FabricCoreBuilder = ({
  gameVersion,
  onCoreBuild,
}: {
  gameVersion: string;
  onCoreBuild: (core: ServerCore) => void;
}) => {
  const fabric = useFabricQueries();
  const loaders: UseQueryResult<FabricLoader[]> = fabric[0];
  const installers: UseQueryResult<FabricInstaller[]> = fabric[1];

  const [loader, setLoader] = useState<FabricLoader>();
  const [installer, setInstaller] = useState<FabricInstaller>();

  const isLoading = loaders.isLoading || installers.isLoading;
  const error = loaders.error || installers.error;
  const hasFabric = loaders.data && installers.data;

  if (isLoading) return <Spinner size={SpinnerSize.Small} />;
  if (error) return <Empty error />;
  if (!hasFabric) return <Empty />;

  const handleCoreBuild = () => {
    if (loader && installer) {
      const loaderVersion = loader.version;
      const installerVersion = installer.version;
      const serverInstallerUrl = getFabricServerUrl(
        gameVersion,
        loaderVersion,
        installerVersion
      );

      onCoreBuild({
        type: ServerCoreType.Fabric,
        gameVersion,
        loader,
        installer,
        serverInstallerUrl,
      });
    }
  };

  const handleChangeLoader = (loaderVersion: string) => {
    const selectedLoader = loaders?.data?.find(
      (_loader) => _loader.version === loaderVersion
    );
    setLoader(selectedLoader);
    handleCoreBuild();
  };

  const handleChangeInstaller = (installerVersion: string) => {
    const selectedInstaller = installers?.data?.find(
      (_installer) => _installer.version === installerVersion
    );
    setInstaller(selectedInstaller);
    handleCoreBuild();
  };

  return (
    <div className={cn(styles.fabricStrategy)}>
      <Select onChange={handleChangeLoader}>
        {loaders?.data.map((loader: FabricLoader) => (
          <SelectOption
            icon="fabric"
            size="s"
            key={loader.version}
            id={loader.version}
            text={loader.version}
          />
        ))}
      </Select>
      <Select onChange={handleChangeInstaller}>
        {installers?.data.map((installer: FabricInstaller) => (
          <SelectOption
            icon="fabric"
            size="m"
            key={installer.version}
            id={installer.version}
            text={installer.version}
          />
        ))}
      </Select>
    </div>
  );
};

export const FabricStrategy = {
  Selector: FabricCoreSelector,
  CoreBuilder: FabricCoreBuilder,
};

export default FabricStrategy;
