import { EqualHeightColumns } from 'app/shared/layout/styled-components/styled';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { match } from 'react-router';
import { CompanyItem } from 'app/entities/company/companyItem';

export class CompanyList extends Component<{ companies: any[]; match: match<{ url: string }> }> {
  render() {
    const { companies, match: Link } = this.props;
    const items = companies.map((company, i) => <CompanyItem key={company.id} company={company} match={Link} />);

    return (
      <ReactCSSTransitionGroup
        component={EqualHeightColumns}
        transitionName="simple-fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {items}
      </ReactCSSTransitionGroup>
    );
  }
}
