import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Contractor from './contractor';
import ContractorDetail from './contractor-detail';
import ContractorUpdate from './contractor-update';
import ContractorDeleteDialog from './contractor-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ContractorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ContractorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ContractorDetail} />
      <ErrorBoundaryRoute path={match.url} component={Contractor} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ContractorDeleteDialog} />
  </>
);

export default Routes;
