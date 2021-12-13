import React from 'react';
import Empty from '@ui/Empty';
import SelectOption from '@ui/SelectOption';
import Select from '@ui/Select';
import { CoreType } from '@utils';

type Props = {
  type: CoreType;
  cores: ForgeCore[] | FabricCore[] | null;
};

const CoreSelect = ({ type, cores }: Props) => {
  const hasCores = cores && cores.length > 0;

  if (!hasCores) {
    return <Empty />;
  }

  const handleChange = (coreVersion: string) => {
    const selectedCore = cores.find((core) => core.coreVersion === coreVersion);
    console.log(selectedCore);
  };

  return (
    <Select onChange={handleChange}>
      {cores.map((core) => (
        <SelectOption
          icon={type}
          size="s"
          key={core.coreVersion}
          id={core.coreVersion}
          text={core.coreVersion}
        />
      ))}
    </Select>
  );
};

export default CoreSelect;
