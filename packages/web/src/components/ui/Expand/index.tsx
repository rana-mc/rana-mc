import React, { useState } from 'react';
import cn from 'classnames';

import styles from './Expand.module.css';
import Space from '@ui/Space';

type Props = {
  step?: number;
  children: React.ReactElement | React.ReactElement[];
  text?: string;
};

const Expand = ({ step = 5, children, text = 'More' }: Props) => {
  const childrens = React.Children.toArray(children);

  const [count, setCount] = useState(step);
  const [hasMore, setHasMore] = useState(childrens.length > step);

  const handleExpand = () => {
    const nextCount = count + step;
    if (nextCount >= childrens.length) setHasMore(false);
    setCount(nextCount);
  };

  return (
    <>
      <Space>{childrens.slice(0, count)}</Space>
      {hasMore && (
        <div className={cn(styles.button)} onClick={handleExpand}>
          {text}
        </div>
      )}
    </>
  );
};

export default Expand;
