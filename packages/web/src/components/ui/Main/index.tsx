import React from 'react'
import cn from 'classnames';

import styles from './Main.module.css';

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

const Main = ({ children }: Props) => {
  return (
    <div className={cn(styles.main)}>
      { children }
    </div>
  )
}

export default Main
