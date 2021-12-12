import React, { Children, useState } from 'react';
import cn from 'classnames';

import styles from './Tabs.module.css';

type Props = {
  children: React.ReactElement | React.ReactElement[];
  defaultId: string;
};

const Tabs = ({ defaultId, children }: Props) => {
  const [currentId, setCurrentId] = useState<string>(defaultId);

  const handleClick = (tabId: string) => {
    setCurrentId(tabId);
  };

  return (
    <div className={cn(styles.tabs)}>
      {Children.map(children, (tab) => {
        return React.cloneElement(tab, {
          active: currentId === tab.props.id,
          onClick: handleClick,
        });
      })}
    </div>
  );
};

export default Tabs;
