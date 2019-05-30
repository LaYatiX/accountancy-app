import { EqualHeightColumns } from 'app/shared/layout/styled-components/styled';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { match } from 'react-router';
import { InvoiceCard } from 'app/entities/invoice/InvoiceCard';
import { IInvoice } from 'app/shared/model/invoice.model';

export class InvoicesCardList extends Component<{ invoices: IInvoice[]; match: match<{ url: string }> }> {
  render() {
    const { invoices, match: Link } = this.props;
    const items = invoices.map((invoice, i) => <InvoiceCard key={invoice.id} invoice={invoice} match={Link} />);

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
