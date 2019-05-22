import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IContent } from 'app/shared/model/content.model';
import { getEntities as getContents } from 'app/entities/content/content.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { getEntities as getProducts } from 'app/entities/product/product.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { IContractor } from 'app/shared/model/contractor.model';
import { getEntities as getContractors } from 'app/entities/contractor/contractor.reducer';
import { getEntity, updateEntity, createEntity, reset } from './invoice.reducer';
import { IInvoice } from 'app/shared/model/invoice.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInvoiceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IInvoiceUpdateState {
  isNew: boolean;
  idsproduct: any[];
  contentId: string;
  companyId: string;
  contractorId: string;
}

export class InvoiceUpdate extends React.Component<IInvoiceUpdateProps, IInvoiceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsproduct: [],
      contentId: '0',
      companyId: '0',
      contractorId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getContents();
    this.props.getProducts();
    this.props.getCompanies();
    this.props.getContractors();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { invoiceEntity } = this.props;
      const entity = {
        ...invoiceEntity,
        ...values,
        products: mapIdList(values.products)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/invoice');
  };

  render() {
    const { invoiceEntity, contents, products, companies, contractors, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="accountancyApp.invoice.home.createOrEditLabel">Create or edit a Invoice</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : invoiceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="invoice-id">ID</Label>
                    <AvInput id="invoice-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="invoice-name">
                    Name
                  </Label>
                  <AvField
                    id="invoice-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="numberLabel" for="invoice-number">
                    Number
                  </Label>
                  <AvField id="invoice-number" type="string" className="form-control" name="number" />
                </AvGroup>
                <AvGroup>
                  <Label id="documentDateLabel" for="invoice-documentDate">
                    Document Date
                  </Label>
                  <AvField id="invoice-documentDate" type="date" className="form-control" name="documentDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="sellPlaceLabel" for="invoice-sellPlace">
                    Sell Place
                  </Label>
                  <AvField id="invoice-sellPlace" type="text" name="sellPlace" />
                </AvGroup>
                <AvGroup>
                  <Label id="sellDateLabel" for="invoice-sellDate">
                    Sell Date
                  </Label>
                  <AvField id="invoice-sellDate" type="date" className="form-control" name="sellDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="bankAccountLabel" for="invoice-bankAccount">
                    Bank Account
                  </Label>
                  <AvField id="invoice-bankAccount" type="text" name="bankAccount" />
                </AvGroup>
                <AvGroup>
                  <Label id="totalNettoLabel" for="invoice-totalNetto">
                    Total Netto
                  </Label>
                  <AvField id="invoice-totalNetto" type="string" className="form-control" name="totalNetto" />
                </AvGroup>
                <AvGroup>
                  <Label id="totalVatLabel" for="invoice-totalVat">
                    Total Vat
                  </Label>
                  <AvField id="invoice-totalVat" type="string" className="form-control" name="totalVat" />
                </AvGroup>
                <AvGroup>
                  <Label id="totalBruttoLabel" for="invoice-totalBrutto">
                    Total Brutto
                  </Label>
                  <AvField id="invoice-totalBrutto" type="string" className="form-control" name="totalBrutto" />
                </AvGroup>
                <AvGroup>
                  <Label id="paymentTypeLabel" for="invoice-paymentType">
                    Payment Type
                  </Label>
                  <AvField id="invoice-paymentType" type="text" name="paymentType" />
                </AvGroup>
                <AvGroup>
                  <Label id="paymentDateLabel" for="invoice-paymentDate">
                    Payment Date
                  </Label>
                  <AvField id="invoice-paymentDate" type="date" className="form-control" name="paymentDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="paymentDueDateLabel" for="invoice-paymentDueDate">
                    Payment Due Date
                  </Label>
                  <AvField id="invoice-paymentDueDate" type="date" className="form-control" name="paymentDueDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="notesLabel" for="invoice-notes">
                    Notes
                  </Label>
                  <AvField id="invoice-notes" type="text" name="notes" />
                </AvGroup>
                <AvGroup>
                  <Label id="sizeLabel" for="invoice-size">
                    Size
                  </Label>
                  <AvField
                    id="invoice-size"
                    type="string"
                    className="form-control"
                    name="size"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="mimeTypeLabel" for="invoice-mimeType">
                    Mime Type
                  </Label>
                  <AvField id="invoice-mimeType" type="text" name="mimeType" />
                </AvGroup>
                <AvGroup>
                  <Label for="invoice-content">Content</Label>
                  <AvInput id="invoice-content" type="select" className="form-control" name="content.id">
                    <option value="" key="0" />
                    {contents
                      ? contents.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="invoice-product">Product</Label>
                  <AvInput
                    id="invoice-product"
                    type="select"
                    multiple
                    className="form-control"
                    name="products"
                    value={invoiceEntity.products && invoiceEntity.products.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {products
                      ? products.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="invoice-company">Company</Label>
                  <AvInput id="invoice-company" type="select" className="form-control" name="company.id">
                    <option value="" key="0" />
                    {companies
                      ? companies.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="invoice-contractor">Contractor</Label>
                  <AvInput id="invoice-contractor" type="select" className="form-control" name="contractor.id">
                    <option value="" key="0" />
                    {contractors
                      ? contractors.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/invoice" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  contents: storeState.content.entities,
  products: storeState.product.entities,
  companies: storeState.company.entities,
  contractors: storeState.contractor.entities,
  invoiceEntity: storeState.invoice.entity,
  loading: storeState.invoice.loading,
  updating: storeState.invoice.updating,
  updateSuccess: storeState.invoice.updateSuccess
});

const mapDispatchToProps = {
  getContents,
  getProducts,
  getCompanies,
  getContractors,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceUpdate);
