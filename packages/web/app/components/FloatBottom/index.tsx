import React from 'react';

import styles from './index.css';

type Props = {
  children?: React.ReactChild | React.ReactChild[];
};

const FloatBottom = ({ children }: Props) => (
  <div className="floatBottom">{children}</div>
);

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default FloatBottom;
