import React from 'react';
import { DropdownItem } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { Translate } from 'react-jhipster';

export interface IMenuItem {
  icon?: IconProp;
  to?: string;
  id?: string;
  toggleIcon?: any;
  collapsed?: boolean;
}

export default class MenuItem extends React.Component<IMenuItem> {
  render() {
    const { to, icon, id, children } = this.props;

    return (
      <Link to={to} id={id} className={'dropdown-item'}>
        <FontAwesomeIcon icon={icon} className={'fa-sm fa-fw mr-2 text-gray-400'} />
        {children}
      </Link>
    );
  }
}
