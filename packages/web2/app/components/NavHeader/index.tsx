import { Notice, Admin } from '@rsuite/icons';
import React from 'react';
import {
  Navbar, Stack, Badge, List, Drawer, Nav, Avatar
} from 'rsuite';
import { MOBILE_QUREY } from '~/constants';
import { useMediaQuery } from '~/hooks/useMediaQuery';
import styles from './index.css';

// TODO: Use real notices
const NavHeader = () => {
  const isMobile = useMediaQuery(MOBILE_QUREY);
  const [open, setOpen] = React.useState(false);

  const handleNoticeSelect = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="navHeader">
        <Navbar className="navHeader__nav">
          <Nav pullRight justified>
            <Nav.Item onSelect={handleNoticeSelect}>
              <Badge>
                <Notice />
              </Badge>
            </Nav.Item>
            <Nav.Item>
              <Stack spacing={8}>
                {!isMobile && <span>admin@rana.mc</span>}
                <Avatar circle size="sm">
                  <Admin />
                </Avatar>
              </Stack>
            </Nav.Item>
          </Nav>
        </Navbar>
      </div>
      <Drawer open={open} size="sm" full={isMobile} onClose={() => setOpen(false)}>
        <Drawer.Body>
          <List>
            <List.Item>
              <Stack spacing={8}>
                <Badge color="yellow" />
                Server stopped
              </Stack>
            </List.Item>
            <List.Item>
              <Stack spacing={8}>
                <Badge color="red" />
                Server crashed
              </Stack>
            </List.Item>
            <List.Item>
              <Stack spacing={8}>
                <Badge color="green" />
                Server started
              </Stack>
            </List.Item>
          </List>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default NavHeader;
