import React from 'react';
import cn from 'classnames';

import styles from './Space.module.css';

export enum SpaceSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum SpaceDirection {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

type Props = {
  children:
    | React.ReactElement
    | (React.ReactElement | React.ReactChild | React.ReactFragment | React.ReactPortal)[];
  size?: SpaceSize;
  direction?: SpaceDirection;
  ref?: React.MutableRefObject<HTMLDivElement>;
};

const Space = ({
  ref,
  children,
  size = SpaceSize.Medium,
  direction = SpaceDirection.Horizontal,
}: Props) => {
  return (
    <div
      ref={ref}
      className={cn(
        styles.space,
        styles[`size-${size}`],
        styles[`direction-${direction}`]
      )}>
      {children}
    </div>
  );
};

export default Space;
