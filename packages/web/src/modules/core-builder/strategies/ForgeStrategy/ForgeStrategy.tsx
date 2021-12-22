import SelectCoreOption from '@ui/SelectCoreOption';
import React from 'react';
import Select from '@ui/Select';
import SelectOption from '@ui/SelectOption';
import Empty from '@ui/Empty';
import { useForgeCoresQuery } from './forgeAPI';
import Spinner, { SpinnerSize } from '@ui/Spinner';
import { ServerCoreType } from '@rana-mc/types';

export const ForgeStrategyId = "forge";

type SelectorProps = {
  onChange: () => void;
  currentStrategyId?: string;
};

export const ForgeCoreSelector = ({ onChange, currentStrategyId }: SelectorProps) => (
  <SelectCoreOption
    icon="forge"
    title="Forge"
    description="Popular choice"
    onClick={onChange}
    active={ currentStrategyId === ForgeStrategyId }
  />
);

export const ForgeCoreBuilder = ({
  gameVersion,
  onCoreBuild,
}: {
  gameVersion: string;
  onCoreBuild: (core: ServerCore) => void;
}) => {
  const { isLoading, error, data: cores } = useForgeCoresQuery(gameVersion);

  if (isLoading) return <Spinner size={SpinnerSize.Small} />;
  if (error) return <Empty error />;
  if (!cores) return <Empty />;

  const handleChange = (coreVersion: string) => {
    const selectedCore = cores.find(
      (core: ForgeCore) => core.coreVersion === coreVersion
    );

    if (onCoreBuild && selectedCore)
      onCoreBuild({
        type: ServerCoreType.Forge,
        ...selectedCore,
      });
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
  StrategyId: ForgeStrategyId,
  Selector: ForgeCoreSelector,
  CoreBuilder: ForgeCoreBuilder,
};

export default ForgeStrategy;
