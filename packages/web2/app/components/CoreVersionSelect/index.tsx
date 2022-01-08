import React from 'react';
import FabricSelector from './FabricSelector';
import ForgeSelector from './ForgeSelector';

type Props = {
  coreType?: string;
};

const CoreVersionSelect = ({ coreType }: Props) => (
  <>
    {coreType === 'forge' && <ForgeSelector />}
    {coreType === 'fabric' && <FabricSelector />}
  </>
);

export default CoreVersionSelect;
