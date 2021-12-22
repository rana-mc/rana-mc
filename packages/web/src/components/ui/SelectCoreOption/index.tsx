import React from 'react';
import cn from 'classnames';

import SelectIcon from '@ui/SelectIcon';

import { IconName } from '@ui/Icon';
import styles from './SelectCoreOption.module.css';

type Props = {
  title: string;
  description: string;
  icon: IconName;
  onClick?: () => void;
  active?: boolean;
};

const SelectCoreOption = ({
  title, description, icon, onClick, active
}: Props) => {
  const handleClick = () => onClick && onClick();

  return (
    <div
      role="presentation"
      className={cn(styles.selectCoreOption, { [styles.active]: active })}
      onClick={handleClick}
    >
      <SelectIcon name={icon} size="l" />
      <div className={cn(styles.title)}>
        <b>{title}</b>
      </div>
      <div className={cn(styles.description)}>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default SelectCoreOption;
