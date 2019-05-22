import React, { Component } from 'react';
import { NavItem } from 'react-bootstrap';
import { faAngleRight, faFolder } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { MenuRightFontAwesomeIcon, StyledFontAwesomeIcon } from 'app/shared/layout/styled-components/styled';

export interface IMenuItem {
  onClick: (e: any, data: any) => void;
  collapsed: boolean;
  // children: Element;
  name: string;
}

export class ExpandableMenuItem extends Component<IMenuItem> {
  componentDidMount() {
    this.setState({
      menuItemExpanded: false
    });
  }

  render() {
    const { onClick, children, collapsed, name } = this.props;
    return (
      <NavItem>
        {/*<NavItem onClick={onClick}>*/}
        {/*<Link to={'/'} className="nav-link collapsed">*/}
        {/*<StyledFontAwesomeIcon icon={faFolder} />*/}
        {/*<span>{name}</span>*/}
        {/*<MenuRightFontAwesomeIcon navtoggled={collapsed ? 0 : 1} className={'menuIcon'} icon={faAngleRight} />*/}
        {/*</Link>*/}
        {/*</NavItem>*/}
        {children}
      </NavItem>
    );
  }
}
