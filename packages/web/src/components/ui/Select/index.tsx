import React, { Children, useState } from 'react';
import cn from 'classnames';

import styles from './Select.module.css';

type Props = {
  children: React.ReactElement | React.ReactElement[];
  defaultId?: string;
  onChange?: (selectId: string) => void;
};

const Select = ({ defaultId, children, onChange }: Props) => {
  const [currentId, setCurrentId] = useState<string>(defaultId || '');

  const handleClick = (selectId: string) => {
    setCurrentId(selectId);
    onChange && onChange(selectId);
  };

  return (
    <div className={cn(styles.select)}>
      {Children.map(children, (selectOption) => {
        return React.cloneElement(selectOption, {
          active: currentId === selectOption.props.id,
          onClick: handleClick,
        });
      })}
    </div>
  );
};

export default Select;
