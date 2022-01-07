import React from 'react';
import styles from './index.css';

const GithubRepo = () => (
  // eslint-disable-next-line max-len
  // eslint-disable-next-line jsx-a11y/control-has-associated-label, jsx-a11y/anchor-has-content
  <a
    className="githubRepo"
    target="_blank"
    href="https://github.com/rana-mc"
    rel="noreferrer"
  />
);

export const links = () => [
  {
    rel: 'preload',
    href: '/icons/github.svg',
    as: 'image',
    type: 'image/svg+xml',
  },
  { rel: 'stylesheet', href: styles },
];

export default GithubRepo;
