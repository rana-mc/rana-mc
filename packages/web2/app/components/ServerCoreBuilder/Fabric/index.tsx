import { useEffect, useState } from 'react';
import { useFetcher } from 'remix';
import { RadioGroup, Stack, Radio } from 'rsuite';
import { ValueType } from 'rsuite/esm/Radio';
import SelectIcon from '~/components/SelectIcon';
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
      action: 'test/api/fabricInstallers',
      method: 'post',
    });
    fabricLoaders.submit(null, {
      action: 'test/api/fabricLoaders',
      method: 'post',
    });
  }, [gameVersionId]);

  const handleCoreBuild = () => {
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
  };

  const handleInstallerChange = (installerVersion: ValueType) => {
    const selectedInstaller = fabricInstallers.data?.data?.find(
      (_installer) => _installer.version === installerVersion
    );
    setInstaller(selectedInstaller);
    handleCoreBuild();
  };

  const handleLoaderChange = (loaderVersion: ValueType) => {
    const selectedLoader = fabricLoaders.data?.data?.find(
      (_loader) => _loader.version === loaderVersion
    );
    setLoader(selectedLoader);
    handleCoreBuild();
  };

  return (
    <>
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
    </>
  );
};

export default FabricCoreBuilder;
