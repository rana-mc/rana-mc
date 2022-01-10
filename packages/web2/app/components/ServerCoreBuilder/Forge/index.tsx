import { RadioGroup, Stack, Radio } from 'rsuite';
import { ValueType } from 'rsuite/esm/Radio';
import SelectIcon from '~/components/SelectIcon';

type Props = {
  onBuild?: (core: ForgeCore) => void;
};

const ForgeCoreBuilder = ({ onBuild }: Props) => {
  const cores: ForgeCore[] = [
    {
      gameVersion: '123',
      coreVersion: 'test',
      uploadTime: '',
      changelogUrl: '',
      installerUrl: '',
      mdkUrl: '',
    },
  ];

  const handleChange = (value: ValueType) => {
    const core = cores.find((core) => core.coreVersion === value);
    if (onBuild && core) onBuild(core);
  };

  return (
    <RadioGroup
      className="coreVersionSelect"
      inline
      name="coreVersionSelect"
      onChange={handleChange}>
      {cores.map((core) => (
        <Radio key={core.coreVersion} value={core.coreVersion}>
          <Stack direction="row" spacing={8} alignItems="flex-start">
            <SelectIcon name="minecraft" />
            {core.coreVersion}
          </Stack>
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default ForgeCoreBuilder;
