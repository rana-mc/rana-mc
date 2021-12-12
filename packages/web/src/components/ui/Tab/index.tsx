import React from 'react';
import cn from 'classnames';

import styles from './Tab.module.css';

type Props = {
  id: string;
  text: string;
  onClick?: (tabId: string) => void;
  active?: boolean;
};

const Tab = ({ id, text, active, onClick }: Props) => {
  const handleClick = () => onClick && onClick(id);

  return (
    <div
      className={cn(styles.tab, { [styles.active]: active })}
      onClick={handleClick}>
      {text}
    </div>
  );
};

export default Tab;
