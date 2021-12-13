import React from 'react';
import cn from 'classnames';

import SelectIcon from '@ui/SelectIcon';

import styles from './SelectCoreOption.module.css';

type Props = {
  type: 'forge' | 'fabric';
  onClick?: (coreId: string) => void;
  active?: boolean;
};

// TODO: remove as hardcoded
const SelectCoreOption = ({ type, onClick, active }: Props) => {
  const handleClick = () => onClick && onClick(type);

  return (
    <div
      role="presentation"
      className={cn(styles.selectCoreOption, { [styles.active]: active })}
      onClick={handleClick}>
      <SelectIcon name={type} size="l" />
      <div className={cn(styles.title)}>
        {type === 'forge' && <b>Forge</b>}
        {type === 'fabric' && <b>Fabric</b>}
      </div>
      <div className={cn(styles.description)}>
        {type === 'forge' && <span>Popular choice</span>}
        {type === 'fabric' && <span>Lightweight</span>}
      </div>
    </div>
  );
};

export default SelectCoreOption;
