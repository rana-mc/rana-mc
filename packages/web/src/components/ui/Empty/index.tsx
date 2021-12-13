import React from 'react';
import { ReactSVG } from 'react-svg';
import cn from 'classnames';

import styles from './Empty.module.css';

type Props = {
  select?: boolean;
  size: 's' | 'm' | 'l';
  text?: string;
};

const Empty = ({ select = false, size = 'm', text = '' }: Props) => {
  const emptyIconSVG = require(`./assets/undraw_empty_re_opql.svg`).default;
  const selectIconSVG =
    require(`./assets/undraw_selecting_re_5ff6.svg`).default;

  if (select) {
    return (
      <div className={cn(styles.empty, styles[`size-${size}`])}>
        <ReactSVG
          className={cn(styles.icon, { [styles.withText]: text })}
          src={selectIconSVG}
        />
        {text && <span className={cn(styles.title)}>{text} 😏</span>}
      </div>
    );
  }

  return (
    <div className={cn(styles.empty, styles[`size-${size}`])}>
      <ReactSVG
        className={cn(styles.icon, { [styles.withText]: text })}
        src={emptyIconSVG}
      />
      {text && <span className={cn(styles.title)}>{text} 😓</span>}
    </div>
  );
};

export default Empty;
