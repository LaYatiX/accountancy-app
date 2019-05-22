import './header.scss';

import React from 'react';
import { Storage } from 'react-jhipster';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import { faBars, faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Form, NavItem } from 'react-bootstrap';
import { NavLinkDropdown } from 'app/shared/layout/header/header-components';
import { AccountMenu, AdminMenu, EntitiesMenu } from 'app/shared/layout/menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  user?: object;
}

export interface IHeaderState {
  menuOpen: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };
  // toggleMenu = () => {
  //   this.setState({ menuOpen: !this.state.menuOpen });
  // };

  openMenu = () => {
    document.getElementById('accordionSidebar').classList.toggle('toggled');
  };

  render() {
    const { isAuthenticated, isAdmin, isSwaggerEnabled, isInProduction, user } = this.props;

    /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

    return (
      <>
        <LoadingBar className="loading-bar" />

        {/*<Brand />*/}
        <Nav className="navbar navbar-expand navbar-light bg-white topbar shadow">
          <button onClick={this.openMenu} id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <FontAwesomeIcon icon={faBars} />
          </button>
          {/*<form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">*/}
          {/*<div className="input-group">*/}
          {/*<input*/}
          {/*type="text"*/}
          {/*className="form-control bg-light border-0 small"*/}
          {/*placeholder="Search for..."*/}
          {/*aria-label="Search"*/}
          {/*aria-describedby="basic-addon2"*/}
          {/*/>*/}
          {/*<div className="input-group-append">*/}
          {/*<button className="btn btn-primary" type="button">*/}
          {/*<FontAwesomeIcon icon={faSearch} className={'fa-sm'} />*/}
          {/*</button>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*</form>*/}

          <NavItem className="nav-item dropdown no-arrow d-sm-none">
            <Link to={'/'}>
              <FontAwesomeIcon icon={faSearch} className={'fa-fw'} />
            </Link>
            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
              <Form className="form-inline mr-auto w-100 navbar-search">
                <Form.Group className="input-group">
                  <Form.Control type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <FontAwesomeIcon icon={faSearch} className={'fa-sm'} />
                    </button>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </NavItem>
          <Dropdown as={NavItem} className={'no-arrow'}>
            <Dropdown.Toggle id={'0'} className={'nav-link dropdown-toggle'} as={NavLinkDropdown}>
              <FontAwesomeIcon icon={faEnvelope} className={'fa-fw'} />
              <span className="badge badge-danger badge-counter">7</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className={'shadow animated--grow-in dropdown-list'} as={'div'}>
              <h6 className="dropdown-header">Message Center</h6>
              <Link to={'/'} className={'dropdown-item d-flex align-items-center'}>
                <div className="dropdown-list-image mr-3">
                  <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="" />
                  <div className="status-indicator bg-success" />
                </div>
                <div className="font-weight-bold">
                  <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                  <div className="small text-gray-500">Emily Fowler · 58m</div>
                </div>
              </Link>
              <Link to={'/page-2'} className={'dropdown-item d-flex align-items-center'}>
                <div className="dropdown-list-image mr-3">
                  <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt="" />
                  <div className="status-indicator" />
                </div>
                <div>
                  <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                  <div className="small text-gray-500">Jae Chun · 1d</div>
                </div>
              </Link>
              <Link to={'/'} className={'dropdown-item d-flex align-items-center'}>
                <div className="dropdown-list-image mr-3">
                  <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt="" />
                  <div className="status-indicator bg-warning" />
                </div>
                <div>
                  <div className="text-truncate">
                    Last month's report looks great, I am very happy with the progress so far, keep up the good work!
                  </div>
                  <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                </div>
              </Link>
              <Link to={'/users'} className={'dropdown-item d-flex align-items-center'}>
                <div className="dropdown-list-image mr-3">
                  <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="" />
                  <div className="status-indicator bg-success" />
                </div>
                <div>
                  <div className="text-truncate">
                    Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't
                    good...
                  </div>
                  <div className="small text-gray-500">Chicken the Dog · 2w</div>
                </div>
              </Link>
              <Link to={'/users'} className={'dropdown-item text-center small text-gray-500'}>
                Read More Messages
              </Link>
            </Dropdown.Menu>
          </Dropdown>

          <div className="topbar-divider d-none d-sm-block" />

          {isAuthenticated && <EntitiesMenu />}
          {isAuthenticated && isAdmin && <AdminMenu showSwagger={isSwaggerEnabled} />}
          <AccountMenu isAuthenticated={isAuthenticated} isAdmin={isAdmin} user={user} />
        </Nav>
      </>
    );
  }
}
