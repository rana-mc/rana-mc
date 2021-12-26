import React from 'react';
import cn from 'classnames';

import styles from './Card.module.css';

type Props = {
  title?: string;
  children: React.ReactElement | React.ReactElement[] | React.ReactNode;
  className?: string;
};

const Card = ({ className, title, children }: Props) => {
  return (
    <div className={cn(styles.card, className)}>
      {title && <h3 className={cn(styles.title)}>{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
