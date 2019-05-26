import './header.scss';

import React from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import { faBars, faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Form, NavItem } from 'react-bootstrap';
import { NavLinkDropdown } from 'app/shared/layout/header/header-components';
import { AccountMenu, AdminMenu, EntitiesMenu } from 'app/shared/layout/menus';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { ICompany } from 'app/shared/model/company.model';
import { IContractorProps } from 'app/entities/contractor/contractor';

// import('@date-io/core').IUtils;

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  handleCompanyChange: Function;
  companies: ReadonlyArray<ICompany>;
  workingCompany?: ICompany;
  user?: object;
}

export interface IHeaderState {
  menuOpen: boolean;
  companies: ICompany[];
  company?: ICompany;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false,
    companies: Array.from(this.props.companies)
  };

  openMenu = () => {
    document.getElementById('accordionSidebar').classList.toggle('toggled');
  };

  componentWillReceiveProps(nextProps: Readonly<IHeaderProps>, nextContext: any): void {
    if (nextProps.companies !== this.props.companies) {
      this.setState({
        companies: Array.from(nextProps.companies)
      });
    }
  }

  handleCompanyChange = e => {
    this.props.handleCompanyChange(e.target.value);
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
          {/*<DatePicker*/}
          {/*views={['year', 'month']}*/}
          {/*label="Okres"*/}
          {/*helperText="Wybierz okres"*/}
          {/*minDate={new Date('2010-01-01')}*/}
          {/*maxDate={new Date()}*/}
          {/*value={new Date()}*/}
          {/*onChange={this.handleDateChange}*/}
          {/*/>*/}
          <Select id={'workingCompany'} value={this.props.workingCompany.id} onChange={this.handleCompanyChange}>
            {this.props.companies.map(el => (
              <MenuItem value={el.id} key={el.id}>
                {el.companyName}
              </MenuItem>
            ))}
            {/*<MenuItem value="LINEAR" key="0">Liniowo 19%</MenuItem>*/}
            {/*<MenuItem value="COMMON" key="0">Na zasadach ogólnych 18%</MenuItem>*/}
            {/*<MenuItem value="LUPSUM" key="0">Ryczałt ewidencjonowany</MenuItem>*/}
          </Select>
          {/*<InputLabel htmlFor="workingCompany">Kontekst firmy:</InputLabel>*/}

          <div className="topbar-divider d-none d-sm-block" />

          {isAuthenticated && <EntitiesMenu />}
          {isAuthenticated && isAdmin && <AdminMenu showSwagger={isSwaggerEnabled} />}
          <AccountMenu isAuthenticated={isAuthenticated} isAdmin={isAdmin} user={user} />
        </Nav>
      </>
    );
  }
}
