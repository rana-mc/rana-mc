import React, { useState } from 'react';
import cn from 'classnames';
import { ServerCoreType } from '@rana-mc/types';
import Empty from '@ui/Empty';
import Select from '@ui/Select';
import SelectCoreOption from '@ui/SelectCoreOption';
import SelectOption from '@ui/SelectOption';
import Spinner, { SpinnerSize } from '@ui/Spinner';
import { UseQueryResult } from 'react-query';
import { useFabricCoreStatusQuery, useFabricQueries } from './fabricAPI';

import styles from './FabricStrategy.module.css';
import { getFabricServerUrl } from './utils';
import Status from '@ui/Status';
import Space, { SpaceSize } from '@ui/Space';

export const FabricStrategyId = 'fabric';

type SelectorProps = {
  onChange: () => void;
  currentStrategyId?: string;
};

export const FabricCoreSelector = ({ onChange, currentStrategyId }: SelectorProps) => (
  <SelectCoreOption
    icon="fabric"
    title="Fabric"
    description="Lightweight"
    onClick={onChange}
    active={currentStrategyId === FabricStrategyId}
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

  const status = useFabricCoreStatusQuery(
    gameVersion,
    loader?.version,
    installer?.version
  );

  const hasFabricServer = status?.isSuccess;

  const isLoading = loaders.isLoading || installers.isLoading;
  const error = loaders.error || installers.error;
  const hasFabric = loaders.data && installers.data;

  if (isLoading)
    return (
      <div className={cn(styles.fabricStrategyLoading)}>
        <Spinner size={SpinnerSize.Small} />
      </div>
    );
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

  // TODO: Improve Status component
  return (
    <div className={cn(styles.fabricStrategy)}>
      <Status
        available={hasFabricServer}
        availableText="Available core!"
        unavailableText={status?.isLoading ? 'Loading...' : 'Wrong server core :('}
      />
      <div className={cn(styles.list)}>
        <Space size={SpaceSize.Medium}>
          <Select title="Loaders" onChange={handleChangeLoader}>
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
          <Select title="Installers" onChange={handleChangeInstaller}>
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
        </Space>
      </div>
    </div>
  );
};

export const FabricStrategy = {
  StrategyId: FabricStrategyId,
  Selector: FabricCoreSelector,
  CoreBuilder: FabricCoreBuilder,
};

export default FabricStrategy;
