import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Label, Row } from 'reactstrap';
import { AvFeedback, AvField, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { faMailBulk, faPaperclip, faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
// tslint:disable-next-line:no-unused-variable
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntities as getContents } from 'app/entities/content/content.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { getEntities as getProducts } from 'app/entities/product/product.reducer';
import { getEntities as getCompanies, getState } from 'app/entities/company/company.reducer';
import { IContractor } from 'app/shared/model/contractor.model';
import { getEntities as getContractors } from 'app/entities/contractor/contractor.reducer';
import { createEntity, getEntity, getPdf, reset, sendEmail, updateEntity } from './invoice.reducer';
// tslint:disable-next-line:no-unused-variable
import { Flex, Loading } from 'app/shared/layout/styled-components/styled';
import InvoiceItem from 'app/entities/invoice/invoice-item';
import { InvoiceEmailModal } from 'app/entities/invoice/invoice-email-modal';

const PointerIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const PdfButtons = styled(Flex)`
  justify-content: flex-end;
  align-items: flex-end;
`;

const SumRight = styled(Label)`
  display: flex;
  justify-content: flex-end;
  height: 100%;
  align-items: center;
  font-size: 1.7rem;
  font-weight: bold;
`;

export interface IInvoiceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IInvoiceUpdateState {
  isNew: boolean;
  idsproduct: any[];
  contentId: string;
  companyId: string;
  contractorId?: string;
  contractor: IContractor;
  products: IProduct[];
  sumNetto: number;
  sumVAT: number;
  sumBrutto: number;
  modalOpen: boolean;
}

export class InvoiceUpdate extends React.Component<IInvoiceUpdateProps, IInvoiceUpdateState> {
  private gen: IterableIterator<number>;

  *generator() {
    let index = 0;
    while (true) {
      yield index++;
    }
  }

  constructor(props) {
    super(props);
    this.gen = this.generator();
    // @ts-ignore
    this.state = {
      idsproduct: [],
      products: [
        {
          id: this.gen.next().value,
          name: '',
          priceBrutto: 0,
          priceNetto: 0,
          quantity: 1,
          vAT: 23
        }
      ],
      contentId: '0',
      companyId: '0',
      contractorId: '0',
      sumNetto: 0,
      sumVAT: 0,
      sumBrutto: 0,
      modalOpen: false,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      // this.handleClose();
    }
  }

  componentWillReceiveProps(nextProps: Readonly<IInvoiceUpdateProps>, nextContext: any): void {
    if (nextProps.invoiceEntity !== this.props.invoiceEntity) {
      this.setState({
        products: Array.from(nextProps.invoiceEntity.products) || []
      });
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
      this.setState(
        () => ({
          products: this.props.invoiceEntity.products,
          contractor: this.props.invoiceEntity.contractor
        }),
        this.calculateSums
      );
    }

    this.props.getContents();
    this.props.getProducts();
    this.props.getCompanies();
    this.props.getContractors();
    // this.props.getPdf(this.props.match.params.id);
  }
  addProduct() {
    this.setState(prevState => ({
      products: prevState.products.concat([
        {
          id: this.gen.next().value,
          name: '',
          priceBrutto: 0,
          priceNetto: 0,
          quantity: 0,
          vAT: 23
        }
      ])
    }));
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { invoiceEntity } = this.props;
      const entity = {
        ...invoiceEntity,
        ...values,
        products: this.state.products,
        company: this.props.workingCompany
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  calculateSums() {
    this.setState(prevState => {
      const { products } = prevState;
      const sumBrutto = (products && products.reduce((a, { priceBrutto: b }) => a + +b, 0)) || 0;
      const sumNetto = (products && products.reduce((a, { priceNetto: b, quantity: q }) => a + +b * q, 0)) || 0;
      return {
        sumBrutto,
        sumNetto,
        sumVAT: sumBrutto - sumNetto
      };
    });
  }
  sendMail(event, errors, { email }) {
    this.props.sendEmail(this.props.match.params.id, email);
  }

  render() {
    const { invoiceEntity, contents, companies, contractors, loading, updating } = this.props;
    const { isNew, products, contractor, sumBrutto, sumNetto, sumVAT } = this.state;

    const downloadPdf = () => {
      // await getPdf(this.props.match.params.id);
      window.open('/api/invoices/pdf/' + this.props.match.params.id);
    };

    const openModal = () => {
      this.setState(() => ({ modalOpen: true }));
    };

    const closeModal = () => {
      this.setState(() => ({ modalOpen: false }));
    };

    const setContractor = e => {
      const id = e.target.value;
      this.setState({
        contractor: this.props.contractors.filter(value => {
          return value.id === +id;
        })[0]
      });
    };
    const updateProducts = (product2: IProduct, toDelete: Boolean = false) => {
      if (toDelete) {
        this.setState(
          prevState => ({
            products: prevState.products.filter(value => value.id !== product2.id)
          }),
          this.calculateSums
        );
      } else {
        this.setState(prevState => {
          const newproducts = prevState.products.map(value => {
            if (value.id === product2.id) {
              // update produktu
              return product2;
            }
            return value;
          });
          return { products: newproducts };
        }, this.calculateSums);
      }
    };

    const addProduct = () => {
      this.addProduct();
    };

    const items = products && products.map(el => <InvoiceItem key={el.id} product={el} updateHandler={updateProducts} />);

    return (
      <div>
        <InvoiceEmailModal handleClose={closeModal} handleSendMail={this.sendMail} showModal={this.state.modalOpen} />
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="accountancyApp.invoice.home.createOrEditLabel">Dodaj lub edytuj fakture</h2>
          </Col>
          <Col md="4">
            <PdfButtons>
              <Button onClick={downloadPdf} to={'/entity/invoice/pdf/1401'} color="primary">
                <FontAwesomeIcon icon={faPaperclip} /> <span className="d-none d-md-inline">PDF</span>
              </Button>{' '}
              &nbsp;
              <Button onClick={openModal} color="primary">
                <FontAwesomeIcon icon={faMailBulk} /> <span className="d-none d-md-inline">Wyślij mailem</span>
              </Button>
            </PdfButtons>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="12">
            {loading ? (
              <Loading />
            ) : (
              <AvForm model={isNew ? {} : invoiceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="invoice-id">ID</Label>
                    <AvInput id="invoice-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <h4>Dane</h4>
                <Row>
                  <Col md="8">
                    <AvGroup>
                      <Label for="invoice-contractor">Kontrahent</Label>
                      <AvInput onChange={setContractor} id="invoice-contractor" type="select" className="form-control" name="contractor.id">
                        <option value="" key="0" />
                        {contractors
                          ? contractors.map(otherEntity => (
                              <option value={otherEntity.id} key={otherEntity.id}>
                                {otherEntity.companyName}
                              </option>
                            ))
                          : null}
                      </AvInput>
                    </AvGroup>
                    <AvGroup>
                      <Row>
                        <Col md="4">
                          <Label for="invoice-contractor">Adres</Label>
                          <AvField id="city" type="text" name="city" value={contractor && contractor.name} />
                        </Col>
                        <Col md="4">
                          <Label for="invoice-contractor">Miasto</Label>
                          <AvField id="city" type="text" name="city" value={contractor && contractor.city} />
                        </Col>
                        <Col md="4">
                          <Label for="invoice-contractor">Kod pocztowy</Label>
                          <AvField id="city" type="text" name="city" value={contractor && contractor.postalCode} />
                        </Col>
                      </Row>
                    </AvGroup>
                  </Col>
                  <Col md="4">
                    <AvGroup>
                      <Label id="nameLabel" for="invoice-name">
                        Nazwa faktury
                      </Label>
                      <AvField id="invoice-name" type="text" name="name" />
                    </AvGroup>
                    <AvGroup>
                      <Label id="numberLabel" for="invoice-number">
                        Numer faktury
                      </Label>
                      <AvField
                        id="invoice-number"
                        type="string"
                        className="form-control"
                        name="number"
                        validate={{
                          required: { value: true, errorMessage: 'Numer faktury jest wymagany' }
                        }}
                      />
                    </AvGroup>
                    <AvGroup>
                      <Label id="documentDateLabel" for="invoice-documentDate">
                        Data wystawienia
                      </Label>
                      <AvField id="invoice-documentDate" type="date" className="form-control" name="documentDate" />
                    </AvGroup>
                    <AvGroup>
                      <Label id="sellDateLabel" for="invoice-sellDate">
                        Data sprzedaży
                      </Label>
                      <AvField id="invoice-sellDate" type="date" className="form-control" name="sellDate" />
                    </AvGroup>
                  </Col>
                </Row>
                <h4>
                  Pozycje <PointerIcon icon={faPlus} onClick={addProduct} />
                </h4>
                <Row>
                  <Col md="12">
                    <Row>
                      <Col md="3">Nazwa artykułu (usługi)</Col>
                      <Col md="2">Cena jedn.</Col>
                      <Col md="2">Ilość</Col>
                      <Col md="2">Brutto</Col>
                      <Col md="2">VAT%</Col>
                    </Row>
                  </Col>
                  <Col md="12">
                    <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                      {items}
                    </ReactCSSTransitionGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <SumRight>Suma pozycji:</SumRight>
                  </Col>
                  <Col md="2">
                    <AvGroup>
                      <Label id="totalNettoLabel" for="invoice-totalNetto">
                        Netto
                      </Label>
                      <AvField
                        id="invoice-totalNetto"
                        type="string"
                        className="form-control"
                        name="totalNetto"
                        value={sumNetto.toFixed(2)}
                      />
                    </AvGroup>
                  </Col>
                  <Col md="2">
                    <AvGroup>
                      <Label id="totalVatLabel" for="invoice-totalVat">
                        VAT
                      </Label>
                      <AvField id="invoice-totalVat" type="string" className="form-control" name="totalVat" value={sumVAT.toFixed(2)} />
                    </AvGroup>
                  </Col>
                  <Col md="2">
                    <AvGroup>
                      <Label id="totalBruttoLabel" for="invoice-totalBrutto">
                        Brutto
                      </Label>
                      <AvField
                        id="invoice-totalBrutto"
                        type="string"
                        className="form-control"
                        name="totalBrutto"
                        value={sumBrutto.toFixed(2)}
                      />
                    </AvGroup>
                  </Col>
                </Row>
                <h4>Płatność</h4>
                <Row>
                  <Col md="4">
                    <AvGroup>
                      <Label id="paymentType" for="invoice-paymentType">
                        Sposób płatności
                      </Label>
                      <AvInput id="invoice-paymentType" type="select" className="form-control" name="paymentType">
                        <option value="Przelew" key="0">
                          Przelew
                        </option>
                        <option value="Gotówka" key="1">
                          Gotówka
                        </option>
                        <option value="Pobranie" key="2">
                          Pobranie
                        </option>
                        <option value="Karta" key="3">
                          Karta
                        </option>
                      </AvInput>
                    </AvGroup>
                  </Col>
                  <Col md="4">
                    <AvGroup>
                      <Label id="paymentDateLabel" for="invoice-paymentDate">
                        Dzień zapłaty
                      </Label>
                      <AvField id="invoice-paymentDate" type="date" className="form-control" name="paymentDate" />
                    </AvGroup>
                  </Col>
                  <Col md="4">
                    <AvGroup>
                      <Label id="paymentDueDateLabel" for="invoice-paymentDueDate">
                        Termin zapłaty
                      </Label>
                      <AvField id="invoice-paymentDueDate" type="date" className="form-control" name="paymentDueDate" />
                    </AvGroup>
                  </Col>
                </Row>
                {/*<AvGroup>*/}
                {/*<Label id="sellPlaceLabel" for="invoice-sellPlace">*/}
                {/*Sell Place*/}
                {/*</Label>*/}
                {/*<AvField id="invoice-sellPlace" type="text" name="sellPlace" />*/}
                {/*</AvGroup>*/}
                {/*<AvGroup>*/}
                {/*<Label id="bankAccountLabel" for="invoice-bankAccount">*/}
                {/*Bank Account*/}
                {/*</Label>*/}
                {/*<AvField id="invoice-bankAccount" type="text" name="bankAccount"/>*/}
                {/*</AvGroup>*/}
                <AvGroup>
                  <Label id="notesLabel" for="invoice-notes">
                    Uwagi
                  </Label>
                  <AvInput id="invoice-notes" type="textarea" name="notes" />
                </AvGroup>
                {/*<AvGroup>*/}
                {/*<Label for="invoice-product">Product</Label>*/}
                {/*<AvInput*/}
                {/*id="invoice-product"*/}
                {/*type="select"*/}
                {/*multiple*/}
                {/*className="form-control"*/}
                {/*name="products"*/}
                {/*value={invoiceEntity.products && invoiceEntity.products.map(e => e.id)}*/}
                {/*>*/}
                {/*<option value="" key="0" />*/}
                {/*{products*/}
                {/*? products.map(otherEntity => (*/}
                {/*<option value={otherEntity.id} key={otherEntity.id}>*/}
                {/*{otherEntity.id}*/}
                {/*</option>*/}
                {/*))*/}
                {/*: null}*/}
                {/*</AvInput>*/}
                {/*</AvGroup>*/}
                {/*<AvGroup>*/}
                {/*<Label for="invoice-company">Company</Label>*/}
                {/*<AvInput id="invoice-company" type="select" className="form-control" name="company.id">*/}
                {/*<option value="" key="0" />*/}
                {/*{companies*/}
                {/*? companies.map(otherEntity => (*/}
                {/*<option value={otherEntity.id} key={otherEntity.id}>*/}
                {/*{otherEntity.id}*/}
                {/*</option>*/}
                {/*))*/}
                {/*: null}*/}
                {/*</AvInput>*/}
                {/*</AvGroup>*/}
                <Button tag={Link} id="cancel-save" to="/entity/invoice" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Wróć</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Zapisz
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
  updateSuccess: storeState.invoice.updateSuccess,
  workingCompany: storeState.company.workingCompany,
  pdf: storeState.invoice.pdf
});

const mapDispatchToProps = {
  getContents,
  getProducts,
  getCompanies,
  getContractors,
  getEntity,
  updateEntity,
  createEntity,
  reset,
  getState,
  getPdf,
  sendEmail
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceUpdate);
