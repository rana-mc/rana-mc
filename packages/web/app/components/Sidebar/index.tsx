import cn from 'classnames';
import { Nav, Dropdown, Sidebar as BaseSidebar, Sidenav, Stack } from 'rsuite';
import { Gear, HelpOutline, Dashboard, AppSelect } from '@rsuite/icons';
import { useNavigate, useLocation } from 'remix';
import Version, { links as versionLinks } from '../Version';
import Logo, { links as logoLinks } from '../Logo';
import styles from './index.css';
import GithubRepo, { links as githubRepoLinks } from '../GithubRepo';
import { MOBILE_QUREY } from '~/constants';
import { useMediaQuery } from '~/hooks/useMediaQuery';

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(MOBILE_QUREY);

  const handleSelect = (eventKey: string) => {
    navigate(`..${eventKey}`, { replace: true });
  };

  const handleLogoClick = () => {
    navigate('../', { replace: true });
  };

  return (
    <BaseSidebar className={cn('sidebar', { sidebar_mobile: isMobile })}>
      <Sidenav.Header className="sidebar__header">
        <div className="sidebar__github">
          <GithubRepo />
        </div>
        <Stack direction="column" spacing={isMobile ? 16 : 32}>
          <Logo onClick={handleLogoClick} />
          <Version />
        </Stack>
      </Sidenav.Header>
      <Sidenav
        expanded={!isMobile}
        defaultOpenKeys={['/servers', '/settings']}
        className="sidebar__nav"
        appearance="subtle">
        <Sidenav.Body>
          <Nav activeKey={pathname} onSelect={handleSelect}>
            <Dropdown
              eventKey="/servers"
              title="Servers"
              icon={<Dashboard />}
              placement="rightStart">
              <Dropdown.Item eventKey="/servers/create">Create</Dropdown.Item>
              <Dropdown.Item eventKey="/servers">List</Dropdown.Item>
            </Dropdown>
            <Dropdown
              eventKey="/mods"
              title="Mods"
              disabled
              icon={<AppSelect />}
              placement="rightStart">
              <Dropdown.Item eventKey="/mods/gallery" disabled>
                Gallery
              </Dropdown.Item>
              <Dropdown.Item eventKey="/mods/downloaded" disabled>
                Downloads
              </Dropdown.Item>
            </Dropdown>
            <Dropdown
              eventKey="/settings"
              title="Settings"
              icon={<Gear />}
              placement="rightStart">
              <Dropdown.Item eventKey="/settings/rana-mc">RanaMC</Dropdown.Item>
              <Dropdown.Item eventKey="/settings/curseforge">CurseForge</Dropdown.Item>
            </Dropdown>
            <Nav.Item eventKey="/about" icon={<HelpOutline />}>
              About
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </BaseSidebar>
  );
};

export const links = () => [
  { rel: 'stylesheet', href: styles },
  ...versionLinks(),
  ...logoLinks(),
  ...githubRepoLinks(),
];

export default Sidebar;
