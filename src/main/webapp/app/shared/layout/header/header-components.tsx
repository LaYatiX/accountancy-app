import React, { Component } from 'react';
import { Translate } from 'react-jhipster';

import { NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import appConfig from 'app/config/constants';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="/content/images/logo-jhipster.png" alt="Logo" />
  </div>
);

export class NavLinkDropdown extends Component<{ onClick: (e: any) => void }> {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    return (
      <a className="nav-link dropdown-toggle" role="button" onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

export const AccountAvatar2 = props => (
  <div {...props} className="brand-icon">
    <img src={props.img} alt={props.alt} />
  </div>
);

export const AccountAvatar = props => <FontAwesomeIcon icon={faUser} className="rounded-circle" />;
// export const AccountAvatar = props => <img src="/content/images/lady.jpg" className="img-profile rounded-circle" alt="Avatar" />;

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">
      <Translate contentKey="global.title">Estate4</Translate>
    </span>
    <span className="navbar-version">{appConfig.VERSION}</span>
  </NavbarBrand>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);
