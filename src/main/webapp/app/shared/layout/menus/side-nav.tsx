import './menu.scss';
import React, { Component } from 'react';
import {
  faAngleLeft,
  faAngleRight,
  faFileInvoice,
  faHome,
  faWeight,
  faTachometerAlt,
  faWrench,
  faBuilding,
  faUserFriends,
  faBarcode,
  faPlus,
  faMinus,
  faDollarSign,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { NavLink as Link } from 'react-router-dom';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { NavItem } from 'react-bootstrap';
import { StyledFontAwesomeIcon } from 'app/shared/layout/styled-components/styled';
import { SideNavToggleButton } from 'app/shared/layout/menus/side-nav-toggle-button';

export interface IMenuItem {
  icon?: IconProp;
  to?: string;
  id?: string;
  toggleIcon?: any;
  collapsed?: boolean;
}

// export default class MenuItem extends React.Component<IMenuItem>

class SideNav extends Component<IMenuItem> {
  state: IMenuItem = {
    toggleIcon: faAngleLeft,
    collapsed: false
  };

  openMenu = () => {
    document.getElementById('accordionSidebar').classList.toggle('toggled');
    this.setState((state: IMenuItem) => {
      return {
        toggleIcon: state.toggleIcon === faAngleLeft ? faAngleRight : faAngleLeft,
        collapsed: !state.collapsed
      };
    });
  };

  render() {
    return (
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <Link to={'/'} className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-text mx-3">
            <div className="logo">
              priceA<sup>2</sup>
            </div>
          </div>
          <div className="mx-3 logo logo-small">
            pA<sup>2</sup>
          </div>
        </Link>

        <hr className="sidebar-divider my-0" />

        <NavItem className="active">
          <Link to={'/'} className="nav-link">
            <StyledFontAwesomeIcon icon={faTachometerAlt} />
            <span>Pulpit</span>
          </Link>
        </NavItem>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Główne opcje</div>

        <NavItem>
          <Link to={'/entity/income'} className={'nav-link'}>
            <StyledFontAwesomeIcon icon={faPlus} />
            <span>Przychody</span>
          </Link>
        </NavItem>

        <NavItem>
          <Link to={'/entity/expense'} className={'nav-link'}>
            <StyledFontAwesomeIcon icon={faMinus} />
            <span>Koszty</span>
          </Link>
        </NavItem>

        <NavItem>
          <Link to={'/entity/month-sum-up'} className="nav-link collapsed">
            <StyledFontAwesomeIcon icon={faDollarSign} />
            <span>Rozlicz okres</span>
          </Link>
        </NavItem>

        <NavItem>
          <Link to={'/entity/invoice'} className="nav-link collapsed">
            <StyledFontAwesomeIcon icon={faFileInvoice} />
            <span>Faktury</span>
          </Link>
        </NavItem>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Dodatkowe</div>

        <NavItem>
          <Link to={'/entity/product'} className="nav-link collapsed">
            <StyledFontAwesomeIcon icon={faBarcode} />
            <span>Produkty</span>
          </Link>
        </NavItem>

        <NavItem>
          <Link to={'/entity/company'} className="nav-link collapsed">
            <StyledFontAwesomeIcon icon={faUser} />
            <span>Firmy</span>
          </Link>
        </NavItem>

        <NavItem>
          <Link to={'/entity/contractor'} className="nav-link collapsed">
            <StyledFontAwesomeIcon icon={faUserFriends} />
            <span>Kontrahenci</span>
          </Link>
        </NavItem>

        <hr className="sidebar-divider d-none d-md-block" />

        <SideNavToggleButton onClick={this.openMenu} icon={this.state.toggleIcon} />
      </ul>
    );
  }
}

export default SideNav;
