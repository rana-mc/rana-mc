import React from 'react';
import cn from 'classnames';

import styles from './SelectOption.module.css';
import { IconName } from '@ui/Icon';
import SelectIcon from '@ui/SelectIcon';

type Props = {
  icon?: IconName;
  id: string;
  size?: 's' | 'm';
  text?: string;
  onClick?: (selectId: string) => void;
  active?: boolean;
};

const SelectOption = ({
  icon,
  id,
  size = 'm',
  text,
  onClick,
  active,
}: Props) => {
  const handleClick = () => onClick && onClick(id);

  return (
    <div
      role="presentation"
      className={cn(styles.selectOption, styles[`size-${size}`], {
        [styles.active]: active,
      })}
      onClick={handleClick}>
      {icon && <SelectIcon size={size === 'm' ? 's' : 'xs'} name={icon} />}
      <span className={cn(styles.text)}>{text}</span>
    </div>
  );
};

export default SelectOption;
