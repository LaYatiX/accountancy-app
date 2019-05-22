import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { NavItem, Dropdown, NavDropdown } from 'react-bootstrap';
import { AccountAvatar, NavLinkDropdown } from 'app/shared/layout/header/header-components';
import { faCogs, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';

const accountMenuItemsAuthenticated = isAdmin => (
  <>
    <Link to={'/account/settings'} className={'dropdown-item'}>
      <FontAwesomeIcon icon={faUser} className={'fa-sm fa-fw mr-2 text-gray-400'} />
      Profil
    </Link>
    <Link to={'/account/password'} className={'dropdown-item'}>
      <FontAwesomeIcon icon={faCogs} className={'fa-sm fa-fw mr-2 text-gray-400'} />
      Zmień hasło
    </Link>
    {isAdmin && (
      <Link to={'/admin/audits'} className={'dropdown-item'}>
        <FontAwesomeIcon icon={faList} className={'fa-sm fa-fw mr-2 text-gray-400'} />
        Logi
      </Link>
    )}
    <Dropdown.Divider />
    <Link to={'/logout'} className={'dropdown-item'}>
      <FontAwesomeIcon icon={faSignOutAlt} className={'fa-sm fa-fw mr-2 text-gray-400'} />
      Wyloguj
    </Link>
  </>
);

const accountMenuItems = (
  <>
    <Link to={'/login'} className={'dropdown-item'}>
      <FontAwesomeIcon icon={faList} className={'fa-sm fa-fw mr-2 text-gray-400'} />
      Zaloguj
    </Link>
    <Dropdown.Divider />
    <Link to={'/register'} className={'dropdown-item'}>
      <FontAwesomeIcon icon={faSignOutAlt} className={'fa-sm fa-fw mr-2 text-gray-400'} />
      Zarejestruj się
    </Link>
  </>
);

export const AccountMenu = ({ isAuthenticated = false, isAdmin = false, user }) => (
  <Dropdown as={NavItem} className={'no-arrow'}>
    <Dropdown.Toggle id={'1'} className={'nav-link dropdown-toggle'} as={NavLinkDropdown}>
      <span className="mr-2 d-none d-lg-inline text-gray-600 small">
        {user.firstName} {user.lastName}
      </span>
      <AccountAvatar />
    </Dropdown.Toggle>
    <Dropdown.Menu className={'shadow animated--grow-in'}>
      {isAuthenticated ? accountMenuItemsAuthenticated(isAdmin) : accountMenuItems}
    </Dropdown.Menu>
  </Dropdown>
);

export default AccountMenu;
