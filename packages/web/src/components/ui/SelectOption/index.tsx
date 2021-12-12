import React from 'react';
import cn from 'classnames';

import styles from './SelectOption.module.css';

type Props = {
  id: string;
  text: string;
  onClick?: (selectId: string) => void;
  active?: boolean;
};

const SelectOption = ({ id, text, onClick, active }: Props) => {
  const handleClick = () => onClick && onClick(id);

  return (
    <div
      role="presentation"
      className={cn(styles.selectOption, { [styles.active]: active })}
      onClick={handleClick}>
      <div className={cn(styles.icon)}></div>
      {text}
    </div>
  );
};

export default SelectOption;
