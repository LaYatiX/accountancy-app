import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './invoice.reducer';
// tslint:disable-next-line:no-unused-variable
import { Form } from 'react-bootstrap';
import { HeaderButton, Loading } from 'app/shared/layout/styled-components/styled';
import { InvoicesCardList } from 'app/entities/invoice/InvoicesCardList';
import { IInvoice } from 'app/shared/model/invoice.model';

export interface IInvoiceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}
export interface IInvoiceState {
  invoiceList: IInvoice[];
}

export class Invoice extends React.Component<IInvoiceProps, IInvoiceState> {
  constructor(props: Readonly<IInvoiceProps>) {
    super(props);
    this.state = {
      invoiceList: []
    };
  }
  componentDidMount() {
    this.props.getEntities();
  }

  componentWillReceiveProps(nextProps: Readonly<IInvoiceProps>, nextContext: any): void {
    if (nextProps.invoiceList !== this.props.invoiceList) {
      this.setState({
        invoiceList: Array.from(nextProps.invoiceList)
      });
    }
  }

  render() {
    const { match, loading } = this.props;
    const { invoiceList } = this.state;

    const searchHandler = e => {
      const searchText = e.target.value;
      const list = Array.from(this.props.invoiceList);
      this.setState(() => ({
        invoiceList:
          searchText && list.length > 0 ? list.filter(value => value.name.toLowerCase().includes(searchText.toLowerCase())) : list
      }));
    };

    return (
      <div>
        <HeaderButton id="invoice-heading">
          Faktury
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Wprowadź fakturę do systemu
          </Link>
        </HeaderButton>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Wyszukaj fakturę</Form.Label>
            <Form.Control type="text" placeholder="Wyszukaj fakturę" onChange={searchHandler} />
          </Form.Group>
        </Form>

        {loading ? <Loading /> : <InvoicesCardList invoices={invoiceList} match={match} />}
      </div>
    );
  }
}

const mapStateToProps = ({ invoice }: IRootState) => ({
  invoiceList: invoice.entities,
  loading: invoice.loading
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
