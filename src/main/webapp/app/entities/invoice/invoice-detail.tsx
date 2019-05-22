import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './invoice.reducer';
import { IInvoice } from 'app/shared/model/invoice.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class InvoiceDetail extends React.Component<IInvoiceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { invoiceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Invoice [<b>{invoiceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{invoiceEntity.name}</dd>
            <dt>
              <span id="number">Number</span>
            </dt>
            <dd>{invoiceEntity.number}</dd>
            <dt>
              <span id="documentDate">Document Date</span>
            </dt>
            <dd>
              <TextFormat value={invoiceEntity.documentDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="sellPlace">Sell Place</span>
            </dt>
            <dd>{invoiceEntity.sellPlace}</dd>
            <dt>
              <span id="sellDate">Sell Date</span>
            </dt>
            <dd>
              <TextFormat value={invoiceEntity.sellDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="bankAccount">Bank Account</span>
            </dt>
            <dd>{invoiceEntity.bankAccount}</dd>
            <dt>
              <span id="totalNetto">Total Netto</span>
            </dt>
            <dd>{invoiceEntity.totalNetto}</dd>
            <dt>
              <span id="totalVat">Total Vat</span>
            </dt>
            <dd>{invoiceEntity.totalVat}</dd>
            <dt>
              <span id="totalBrutto">Total Brutto</span>
            </dt>
            <dd>{invoiceEntity.totalBrutto}</dd>
            <dt>
              <span id="paymentType">Payment Type</span>
            </dt>
            <dd>{invoiceEntity.paymentType}</dd>
            <dt>
              <span id="paymentDate">Payment Date</span>
            </dt>
            <dd>
              <TextFormat value={invoiceEntity.paymentDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="paymentDueDate">Payment Due Date</span>
            </dt>
            <dd>
              <TextFormat value={invoiceEntity.paymentDueDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="notes">Notes</span>
            </dt>
            <dd>{invoiceEntity.notes}</dd>
            <dt>
              <span id="size">Size</span>
            </dt>
            <dd>{invoiceEntity.size}</dd>
            <dt>
              <span id="mimeType">Mime Type</span>
            </dt>
            <dd>{invoiceEntity.mimeType}</dd>
            <dt>Content</dt>
            <dd>{invoiceEntity.content ? invoiceEntity.content.id : ''}</dd>
            <dt>Product</dt>
            <dd>
              {invoiceEntity.products
                ? invoiceEntity.products.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === invoiceEntity.products.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Company</dt>
            <dd>{invoiceEntity.company ? invoiceEntity.company.id : ''}</dd>
            <dt>Contractor</dt>
            <dd>{invoiceEntity.contractor ? invoiceEntity.contractor.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/invoice" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/invoice/${invoiceEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ invoice }: IRootState) => ({
  invoiceEntity: invoice.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceDetail);
