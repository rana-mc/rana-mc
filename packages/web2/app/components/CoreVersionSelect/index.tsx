import React from 'react';
import FabricSelector from './FabricSelector';
import ForgeSelector from './ForgeSelector';
import styles from './index.css';

type Props = {
  coreType?: string;
  onChange?: (serverCore: ServerCore) => void;
};

const CoreVersionSelect = ({ coreType }: Props) => (
  <>
    {coreType === 'forge' && <ForgeSelector />}
    {coreType === 'fabric' && <FabricSelector />}
  </>
);

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default CoreVersionSelect;
