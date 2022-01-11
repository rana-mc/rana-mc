import { useEffect } from 'react';
import { useFetcher } from 'remix';
import { RadioGroup, Stack, Radio } from 'rsuite';
import { ValueType } from 'rsuite/esm/Radio';
import SelectIcon from '~/components/SelectIcon';

type Props = {
  gameVersionId: string;
  onBuild: (core: FabricCore) => void;
};

type FabricInstallersResponse = { data: FabricInstaller[]; success: boolean };
type FabricLoadersResponse = { data: FabricLoader[]; success: boolean };

const FabricCoreBuilder = ({ gameVersionId, onBuild }: Props) => {
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

  const handleChange = (value: ValueType) => {
    // const core = cores.find((core) => core.serverInstallerUrl === value);
    // if (core) onBuild(core);
  };

  return (
    <>
      <RadioGroup
        className="fabricInstallerSelect"
        inline
        name="fabricInstallerSelect"
        onChange={handleChange}>
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
        onChange={handleChange}>
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
