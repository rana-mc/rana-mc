import { useEffect } from 'react';
import { useFetcher } from 'remix';
import { RadioGroup, Stack, Radio } from 'rsuite';
import { ValueType } from 'rsuite/esm/Radio';
import SelectIcon from '~/components/SelectIcon';

type Props = {
  gameVersionId: string;
  onBuild: (core: ForgeCore) => void;
};

type ForgeCoresResponse = { data: ForgeCore[]; success: boolean };

const ForgeCoreBuilder = ({ gameVersionId, onBuild }: Props) => {
  const forgeCores = useFetcher<ForgeCoresResponse>();

  useEffect(() => {
    forgeCores.submit(
      { version: gameVersionId },
      { action: 'test/api/forgeCores', method: 'post' }
    );
  }, [gameVersionId]);

  const handleChange = (value: ValueType) => {
    const core = forgeCores.data?.data.find((core) => core.coreVersion === value);
    if (core) onBuild(core);
  };

  return (
    <RadioGroup
      className="coreVersionSelect"
      inline
      name="coreVersionSelect"
      onChange={handleChange}>
      {forgeCores.data?.success &&
        forgeCores.data.data.map((core) => (
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
