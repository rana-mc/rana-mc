import React from 'react';
import {
  Breadcrumb, Container, Header, Content, CustomProvider
} from 'rsuite';
import PageIcon from '@rsuite/icons/Page';
import Sidebar, { links as sidebarLinks } from '../Sidebar';

import styles from './index.css';
import NavHeader, { links as navHeaderLinks } from '../NavHeader';

type LayoutProps = {
  children?: React.ReactChild | React.ReactChild[];
  pageTitle?: string;
  path?: string[];
};

const Layout = ({ children, pageTitle, path }: LayoutProps) => (
  <CustomProvider theme="light">
    <Container>
      <Sidebar />
      <Container className="layout__container">
        <NavHeader />
        <Header className="layout__header">
          {path && (
            <Breadcrumb>
              {path.map((value) => (
                <Breadcrumb.Item key={value}>{value}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
          )}
          {pageTitle && (
            <h3>
              <PageIcon style={{ fontSize: '0.8em' }} />
              {pageTitle}
            </h3>
          )}
        </Header>
        <Content>{children}</Content>
      </Container>
    </Container>
  </CustomProvider>
);

export const links = () => [
  { rel: 'stylesheet', href: styles },
  ...sidebarLinks(),
  ...navHeaderLinks(),
];

export default Layout;
