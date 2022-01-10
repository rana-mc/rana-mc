import { RadioGroup, Stack, Radio } from 'rsuite';
import { ValueType } from 'rsuite/esm/Radio';
import SelectIcon from '~/components/SelectIcon';

type Props = {
  onBuild?: (core: FabricCore) => void;
};

// TODO: Use loader and installer for build core
const FabricCoreBuilder = ({ onBuild }: Props) => {
  const cores: FabricCore[] = [
    {
      gameVersion: '123',
      loader: {
        separator: '',
        build: 1,
        maven: '',
        version: '',
        stable: true,
      },
      installer: {
        url: '',
        maven: '',
        version: '',
        stable: true,
      },
      serverInstallerUrl: '',
    },
  ];

  const handleChange = (value: ValueType) => {
    const core = cores.find((core) => core.serverInstallerUrl === value);
    if (onBuild && core) onBuild(core);
  };

  return (
    <RadioGroup
      className="coreVersionSelect"
      inline
      name="coreVersionSelect"
      onChange={handleChange}>
      {cores.map((core) => (
        <Radio key={core.serverInstallerUrl} value={core.serverInstallerUrl}>
          <Stack direction="row" spacing={8} alignItems="flex-start">
            <SelectIcon name="minecraft" />
            {core.installer.version} - {core.loader.version}
          </Stack>
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default FabricCoreBuilder;
