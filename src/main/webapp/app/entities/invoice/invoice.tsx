import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './invoice.reducer';
import { IInvoice } from 'app/shared/model/invoice.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Invoice extends React.Component<IInvoiceProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { invoiceList, match } = this.props;
    return (
      <div>
        <h2 id="invoice-heading">
          Invoices
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Invoice
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Number</th>
                <th>Document Date</th>
                <th>Sell Place</th>
                <th>Sell Date</th>
                <th>Bank Account</th>
                <th>Total Netto</th>
                <th>Total Vat</th>
                <th>Total Brutto</th>
                <th>Payment Type</th>
                <th>Payment Date</th>
                <th>Payment Due Date</th>
                <th>Notes</th>
                <th>Size</th>
                <th>Mime Type</th>
                <th>Content</th>
                <th>Product</th>
                <th>Company</th>
                <th>Contractor</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {invoiceList.map((invoice, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${invoice.id}`} color="link" size="sm">
                      {invoice.id}
                    </Button>
                  </td>
                  <td>{invoice.name}</td>
                  <td>{invoice.number}</td>
                  <td>
                    <TextFormat type="date" value={invoice.documentDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{invoice.sellPlace}</td>
                  <td>
                    <TextFormat type="date" value={invoice.sellDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{invoice.bankAccount}</td>
                  <td>{invoice.totalNetto}</td>
                  <td>{invoice.totalVat}</td>
                  <td>{invoice.totalBrutto}</td>
                  <td>{invoice.paymentType}</td>
                  <td>
                    <TextFormat type="date" value={invoice.paymentDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={invoice.paymentDueDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{invoice.notes}</td>
                  <td>{invoice.size}</td>
                  <td>{invoice.mimeType}</td>
                  <td>{invoice.content ? <Link to={`content/${invoice.content.id}`}>{invoice.content.id}</Link> : ''}</td>
                  <td>
                    {invoice.products
                      ? invoice.products.map((val, j) => (
                          <span key={j}>
                            <Link to={`product/${val.id}`}>{val.id}</Link>
                            {j === invoice.products.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>{invoice.company ? <Link to={`company/${invoice.company.id}`}>{invoice.company.id}</Link> : ''}</td>
                  <td>{invoice.contractor ? <Link to={`contractor/${invoice.contractor.id}`}>{invoice.contractor.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${invoice.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${invoice.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${invoice.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ invoice }: IRootState) => ({
  invoiceList: invoice.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice);
