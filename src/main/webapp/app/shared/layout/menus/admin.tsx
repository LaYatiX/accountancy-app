import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { Dropdown, NavItem } from 'react-bootstrap';
import { NavLinkDropdown } from 'app/shared/layout/header/header-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';

const adminMenuItems = (
  <>
    <MenuItem icon="user" to="/admin/user-management">
      Zarządzanie użytkownikami
    </MenuItem>
    {/*<MenuItem icon="tachometer-alt" to="/admin/metrics">*/}
    {/*<Translate contentKey="global.menu.admin.metrics">Metrics</Translate>*/}
    {/*</MenuItem>*/}
    {/*<MenuItem icon="heart" to="/admin/health">*/}
    {/*<Translate contentKey="global.menu.admin.health">Health</Translate>*/}
    {/*</MenuItem>*/}
    {/*<MenuItem icon="list" to="/admin/configuration">*/}
    {/*<Translate contentKey="global.menu.admin.configuration">Configuration</Translate>*/}
    {/*</MenuItem>*/}
    <MenuItem icon="bell" to="/admin/audits">
      Logi
    </MenuItem>
    {/* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */}
    {/*<MenuItem icon="tasks" to="/admin/logs">*/}
    {/*<Translate contentKey="global.menu.admin.logs">Logs</Translate>*/}
    {/*</MenuItem>*/}
  </>
);

const swaggerItem = (
  <MenuItem icon="book" to="/admin/docs">
    API/SWAGGER
  </MenuItem>
);

export const AdminMenu = ({ showSwagger }) => (
  <Dropdown as={NavItem} className={'no-arrow'} id="admin-menu">
    <Dropdown.Toggle id={'2'} className={'nav-link dropdown-toggle'} as={NavLinkDropdown}>
      <span className="mr-2 d-none d-lg-inline text-gray-600 small">
        <FontAwesomeIcon icon={faUserShield} />
        Admin
      </span>
    </Dropdown.Toggle>
    <Dropdown.Menu className={'shadow animated--grow-in'}>
      {adminMenuItems}
      {showSwagger && swaggerItem}
    </Dropdown.Menu>
  </Dropdown>
);

export default AdminMenu;
