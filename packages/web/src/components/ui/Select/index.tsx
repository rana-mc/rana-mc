import React, { Children, useState } from 'react';
import cn from 'classnames';

import styles from './Select.module.css';
import Space, { SpaceDirection, SpaceSize } from '@ui/Space';

type Props = {
  title?: string;
  children: React.ReactElement | React.ReactElement[];
  defaultId?: string;
  onChange?: (selectId: string) => void;
};

const Select = ({ title, defaultId, children, onChange }: Props) => {
  const [currentId, setCurrentId] = useState<string>(defaultId || '');

  const handleClick = (selectId: string) => {
    setCurrentId(selectId);
    if (onChange) onChange(selectId);
  };

  return (
    <div className={cn(styles.select)}>
      {title && <h4>{title}</h4>}
      <Space size={SpaceSize.Small} direction={SpaceDirection.Horizontal}>
        {Children.map(children, (selectOption) =>
          React.cloneElement(selectOption, {
            active: currentId === selectOption.props.id,
            onClick: handleClick,
          })
        )}
      </Space>
    </div>
  );
};

export default Select;
