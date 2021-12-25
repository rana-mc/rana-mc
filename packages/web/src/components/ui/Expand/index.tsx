import React, { useEffect, useRef, useState } from 'react';
import chunk from 'lodash.chunk';
import cn from 'classnames';

import styles from './Expand.module.css';
import Space from '@ui/Space';

type Props = {
  viewCount?: number;
  children: React.ReactElement | React.ReactElement[];
  text?: string;
};

type ChunkProps = {
  children:
    | React.ReactElement
    | (React.ReactChild | React.ReactFragment | React.ReactPortal)[];
  fixed?: boolean;
};

const ExpandChunk = ({ children, fixed }: ChunkProps) => {
  const chunk = useRef() as React.MutableRefObject<HTMLInputElement>;
  const wrapper = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setHeight(wrapper?.current?.clientHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  });

  useEffect(() => {
    if (fixed) return;

    const handleAnimation = () => {
      if (chunk?.current?.clientHeight === height) {
        chunk.current.style.overflow = 'visible';
      } else {
        chunk.current.style.overflow = 'hidden';
        window.requestAnimationFrame(handleAnimation);
      }
    };

    window.requestAnimationFrame(handleAnimation);
  });

  return (
    <div
      ref={chunk}
      className={cn(styles.chunk, { [styles.fixed]: fixed })}
      style={{ height, overflow: fixed ? 'visible' : 'hidden' }}>
      <div ref={wrapper} className={cn(styles.wrapper)}>
        <Space>{children}</Space>
      </div>
    </div>
  );
};

const Expand = ({ children, text, viewCount = 5 }: Props) => {
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const chunks = chunk(React.Children.toArray(children), viewCount);

  const hasMore = React.Children.toArray(children).length > viewCount;

  if (!hasMore) {
    return <Space>{children}</Space>;
  }

  const handleExpand = () => {
    setCurrentChunkIndex(currentChunkIndex + 1);
  };

  return (
    <div className={cn(styles.expand)}>
      <Space>
        {chunks.slice(0, currentChunkIndex + 1).map((chunk, index) => (
          <ExpandChunk fixed={index + 1 === 1}>{chunk}</ExpandChunk>
        ))}
        {hasMore && (
          <div className={cn(styles.button)} onClick={handleExpand}>
            {text || 'More'}
          </div>
        )}
      </Space>
    </div>
  );
};

export default Expand;
