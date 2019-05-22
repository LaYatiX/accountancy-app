import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as PropTypes from 'prop-types';
import React from 'react';

export const SideNavToggleButton = props => (
  <div className="text-center d-none d-md-inline">
    <button onClick={props.onClick} defaultChecked={false} className="rounded-circle border-0" id="sidebarToggle">
      <FontAwesomeIcon icon={props.icon} />
    </button>
  </div>
);

SideNavToggleButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.any
};
