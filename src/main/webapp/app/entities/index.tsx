import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Invoice from './invoice';
import Content from './content';
import MonthSumUp from './month-sum-up';
import Expense from './expense';
import Income from './income';
import Entry from './entry';
import Company from './company';
import Contractor from './contractor';
import Product from './product';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/invoice`} component={Invoice} />
      <ErrorBoundaryRoute path={`${match.url}/content`} component={Content} />
      <ErrorBoundaryRoute path={`${match.url}/month-sum-up`} component={MonthSumUp} />
      <ErrorBoundaryRoute path={`${match.url}/expense`} component={Expense} />
      <ErrorBoundaryRoute path={`${match.url}/income`} component={Income} />
      <ErrorBoundaryRoute path={`${match.url}/entry`} component={Entry} />
      <ErrorBoundaryRoute path={`${match.url}/company`} component={Company} />
      <ErrorBoundaryRoute path={`${match.url}/contractor`} component={Contractor} />
      <ErrorBoundaryRoute path={`${match.url}/product`} component={Product} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
