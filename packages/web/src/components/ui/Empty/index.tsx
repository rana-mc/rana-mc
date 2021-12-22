import React from 'react';
import { ReactSVG } from 'react-svg';
import cn from 'classnames';

import styles from './Empty.module.css';

type Props = {
  error?: boolean;
  select?: boolean;
  size?: 's' | 'm' | 'l';
  text?: string;
  textOnly?: boolean;
};

// TODO: Refactory
const Empty = ({
  error = false,
  select = false,
  size = 'm',
  text = '',
  textOnly = false,
}: Props) => {
  // eslint-disable-next-line global-require
  const emptyIconSVG = require('./assets/undraw_empty_re_opql.svg').default;
  // eslint-disable-next-line global-require
  const selectIconSVG = require('./assets/undraw_selecting_re_5ff6.svg').default;
  // eslint-disable-next-line global-require
  const errorIconSvg = require('./assets/undraw_alert_re_j2op.svg').default;

  if (textOnly) {
    return (
      <div
        className={cn(styles.empty, styles[`size-${size}`], {
          [styles.textOnly]: textOnly,
        })}>
        {text && (
          <span className={cn(styles.title)}>
            {text} {select ? '😏' : '😓'}
          </span>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(styles.empty, styles[`size-${size}`])}>
        <div className={cn(styles.icon)}>
          <ReactSVG className={cn({ [styles.withText]: text })} src={errorIconSvg} />
        </div>
        {text ? (
          <span className={cn(styles.title)}>{text}</span>
        ) : (
          <span className={cn(styles.title)}>Oops, something went wrong</span>
        )}
      </div>
    );
  }

  if (select) {
    return (
      <div className={cn(styles.empty, styles[`size-${size}`])}>
        <div className={cn(styles.icon)}>
          <ReactSVG className={cn({ [styles.withText]: text })} src={selectIconSVG} />
        </div>
        {text && <span className={cn(styles.title)}>{text}</span>}
      </div>
    );
  }

  return (
    <div className={cn(styles.empty, styles[`size-${size}`])}>
      <div className={cn(styles.icon)}>
        <ReactSVG className={cn({ [styles.withText]: text })} src={emptyIconSVG} />
      </div>
      {text && <span className={cn(styles.title)}>{text}</span>}
    </div>
  );
};

export default Empty;
