import { useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { RadioGroup, Stack, Radio, Panel } from 'rsuite';
import { ValueType } from 'rsuite/esm/Radio';
import SelectIcon, { links as selectIconLinks } from '~/components/SelectIcon';

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
      { action: 'servers/create/api/forgeCores', method: 'post' }
    );
  }, [gameVersionId]);

  const handleChange = (value: ValueType) => {
    const core = forgeCores.data?.data.find((core) => core.coreVersion === value);
    if (core) onBuild(core);
  };

  return (
    <Panel header="Forge Core Version">
      <RadioGroup
        className="forgeCoreSelect"
        inline
        name="forgeCoreSelect"
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
    </Panel>
  );
};

export const links = () => [...selectIconLinks()];

export default ForgeCoreBuilder;
