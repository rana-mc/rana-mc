import SelectCoreOption from '@ui/SelectCoreOption';
import React from 'react';
import Select from '@ui/Select';
import SelectOption from '@ui/SelectOption';
import Empty from '@ui/Empty';
import { useForgeCoresQuery } from './ForgeStrategy/forgeAPI';
import Spinner, { SpinnerSize } from '@ui/Spinner';

export const ForgeCoreSelector = ({ onChange }: { onChange: () => void }) => (
  <SelectCoreOption
    icon="forge"
    title="Forge"
    description="Popular choice"
    onClick={onChange}
  />
);

export const ForgeCoreBuilder = ({
  version,
  onCoreBuild,
}: {
  version: string;
  onCoreBuild: (core: ForgeCore) => void;
}) => {
  const { isLoading, error, data: cores } = useForgeCoresQuery(version);

  if (isLoading) return <Spinner size={SpinnerSize.Small} />;
  if (error) return <Empty error />;
  if (!cores) return <Empty />;

  const handleChange = (coreVersion: string) => {
    const selectedCore = cores.find(
      (core: ForgeCore) => core.coreVersion === coreVersion
    );

    if (onCoreBuild && selectedCore) onCoreBuild(selectedCore);
  };

  return (
    <div role="presentation">
      <Select onChange={handleChange}>
        {cores.map((core: ForgeCore) => (
          <SelectOption
            icon="forge"
            size="s"
            key={core.coreVersion}
            id={core.coreVersion}
            text={core.coreVersion}
          />
        ))}
      </Select>
    </div>
  );
};

export const ForgeStrategy = {
  Selector: ForgeCoreSelector,
  CoreBuilder: ForgeCoreBuilder,
};

export default ForgeStrategy;
