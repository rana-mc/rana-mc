import React, { Children, useState } from 'react';
import cn from 'classnames';

import styles from './SelectCore.module.css';

type Props = {
  children: React.ReactElement | React.ReactElement[];
  defaultId?: string;
  onChange?: (selectId: string) => void;
};

const SelectCore = ({ defaultId, children, onChange }: Props) => {
  const [currentId, setCurrentId] = useState<string>(defaultId || '');

  const handleClick = (selectId: string) => {
    setCurrentId(selectId);
    onChange && onChange(selectId);
  };

  return (
    <div className={cn(styles.selectCore)}>
      {Children.map(children, (selectCoreOption) => {
        return React.cloneElement(selectCoreOption, {
          active: currentId === selectCoreOption.props.id,
          onClick: handleClick,
        });
      })}
    </div>
  );
};

export default SelectCore;
