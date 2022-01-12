import React from 'react';
import styles from './index.css';

type LogoProps = {
  onClick?: () => void;
};

const Logo = ({ onClick }: LogoProps) => (
  <div role="presentation" className="logo" onClick={onClick} />
);

export const links = () => [
  {
    rel: 'preload',
    href: '/icons/logo.svg',
    as: 'image',
    type: 'image/svg+xml',
  },
  { rel: 'stylesheet', href: styles },
];

export default Logo;
