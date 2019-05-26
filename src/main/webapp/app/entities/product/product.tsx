import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// tslint:disable-next-line:no-unused-variable
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
// tslint:disable-next-line:no-unused-variable
import { ButtonBarList, HeaderButton, Loading } from 'app/shared/layout/styled-components/styled';
import { Form } from 'react-bootstrap';

export interface IProductProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProductState {
  productList: IProduct[];
}

export class Product extends React.Component<IProductProps, IProductState> {
  constructor(props: Readonly<IProductProps>) {
    super(props);
    this.state = {
      productList: []
    };
  }

  componentDidMount() {
    this.props.getEntities();
  }

  componentWillReceiveProps(nextProps: Readonly<IProductProps>, nextContext: any): void {
    if (nextProps.productList !== this.props.productList) {
      this.setState({
        productList: Array.from(nextProps.productList)
      });
    }
  }

  render() {
    const { match, loading } = this.props;
    const { productList } = this.state;

    const searchHandler = e => {
      const searchText = e.target.value;
      const list = Array.from(this.props.productList);
      this.setState(() => ({
        productList:
          searchText && list.length > 0 ? list.filter(value => value.name.toLowerCase().includes(searchText.toLowerCase())) : list
      }));
    };

    const items = productList.map((product, i) => (
      <tr key={`entity-${i}`}>
        <td style={{ width: '300px' }}>{product.name}</td>
        <td>{product.priceNetto}</td>
        <td>{product.vAT}</td>
        <td>{product.priceBrutto}</td>
        <td className="text-right">
          <ButtonBarList>
            <Button tag={Link} to={`${match.url}/${product.id}/edit`} color="primary" size="sm">
              <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
            </Button>
            <Button tag={Link} to={`${match.url}/${product.id}/delete`} color="danger" size="sm">
              <FontAwesomeIcon icon="trash" />
            </Button>
          </ButtonBarList>
        </td>
      </tr>
    ));

    return (
      <div>
        <HeaderButton id="product-heading">
          Produkty
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Dodaj nowy produkt
          </Link>
        </HeaderButton>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Wyszukaj produkt</Form.Label>
                <Form.Control type="text" placeholder="Wyszukaj produkty" onChange={searchHandler} />
              </Form.Group>
            </Form>
            <Table responsive>
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>Cena netto</th>
                  <th>VAT</th>
                  <th>Cena brutto</th>
                  <th />
                </tr>
              </thead>
              <ReactCSSTransitionGroup
                component="tbody"
                transitionName="simple-fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {items}
              </ReactCSSTransitionGroup>
            </Table>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ product }: IRootState) => ({
  productList: product.entities,
  loading: product.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
