import { useEffect, useState } from 'react';
import { useFetcher } from '@remix-run/react';
import { Panel, RadioGroup, Stack, Radio } from 'rsuite';
import { ValueType } from 'rsuite/esm/Radio';
import SelectIcon, { links as selectIconLinks } from '~/components/SelectIcon';
import { getFabricServerUrl } from '../utils';

type Props = {
  gameVersionId: string;
  onBuild: (core: FabricCore) => void;
};

type FabricInstallersResponse = { data: FabricInstaller[]; success: boolean };
type FabricLoadersResponse = { data: FabricLoader[]; success: boolean };

const FabricCoreBuilder = ({ gameVersionId, onBuild }: Props) => {
  const [installer, setInstaller] = useState<FabricInstaller>();
  const [loader, setLoader] = useState<FabricLoader>();

  const fabricInstallers = useFetcher<FabricInstallersResponse>();
  const fabricLoaders = useFetcher<FabricLoadersResponse>();

  useEffect(() => {
    fabricInstallers.submit(null, {
      action: 'servers/create/api/fabricInstallers',
      method: 'post',
    });
    fabricLoaders.submit(null, {
      action: 'servers/create/api/fabricLoaders',
      method: 'post',
    });
  }, [gameVersionId]);

  useEffect(() => {
    if (loader && installer) {
      const loaderVersion = loader.version;
      const installerVersion = installer.version;
      const serverInstallerUrl = getFabricServerUrl(
        gameVersionId,
        loaderVersion,
        installerVersion
      );

      onBuild({
        gameVersion: gameVersionId,
        loader,
        installer,
        serverInstallerUrl,
      });
    }
  }, [installer, loader]);

  const handleInstallerChange = (installerVersion: ValueType) => {
    const selectedInstaller = fabricInstallers.data?.data?.find(
      (el) => el.version === installerVersion
    );
    setInstaller(selectedInstaller);
  };

  const handleLoaderChange = (loaderVersion: ValueType) => {
    const selectedLoader = fabricLoaders.data?.data?.find(
      (el) => el.version === loaderVersion
    );
    setLoader(selectedLoader);
  };

  return (
    <>
      <Panel header="Fabric Installer Version">
        <RadioGroup
          className="fabricInstallerSelect"
          inline
          name="fabricInstallerSelect"
          onChange={handleInstallerChange}>
          {fabricInstallers.data?.success &&
            fabricInstallers.data.data.map((installer) => (
              <Radio key={installer.version} value={installer.version}>
                <Stack direction="row" spacing={8} alignItems="flex-start">
                  <SelectIcon name="minecraft" />
                  {installer.version}
                </Stack>
              </Radio>
            ))}
        </RadioGroup>
      </Panel>
      <Panel header="Fabric Loader Version">
        <RadioGroup
          className="fabricLoaderSelect"
          inline
          name="fabricLoaderSelect"
          onChange={handleLoaderChange}>
          {fabricLoaders.data?.success &&
            fabricLoaders.data.data.map((loader) => (
              <Radio key={loader.version} value={loader.version}>
                <Stack direction="row" spacing={8} alignItems="flex-start">
                  <SelectIcon name="minecraft" />
                  {loader.version}
                </Stack>
              </Radio>
            ))}
        </RadioGroup>
      </Panel>
    </>
  );
};

export const links = () => [...selectIconLinks()];

export default FabricCoreBuilder;
