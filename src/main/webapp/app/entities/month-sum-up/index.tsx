import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MonthSumUp from './month-sum-up';
import MonthSumUpDetail from './month-sum-up-detail';
import MonthSumUpUpdate from './month-sum-up-update';
import MonthSumUpDeleteDialog from './month-sum-up-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MonthSumUpUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MonthSumUpUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MonthSumUpDetail} />
      <ErrorBoundaryRoute path={match.url} component={MonthSumUp} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MonthSumUpDeleteDialog} />
  </>
);

export default Routes;
