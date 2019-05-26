import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { IProduct } from 'app/shared/model/product.model';
import { AvField, AvInput } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const PointerIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  height: 2.3em;
`;

// export const PasswordStrengthBar = ({ password }: IPasswordStrengthBarProps) => {
export interface IInvoiceItemProps {
  updateHandler: Function;
  product: IProduct;
}

export interface IInvoiceItemState {
  product: IProduct;
}

class InvoiceItem extends Component<IInvoiceItemProps, IInvoiceItemState> {
  constructor(props: Readonly<IInvoiceItemProps>) {
    super(props);
    // this.state = {
    //   product: {
    //     priceNetto: 0,
    //     vAT: 23,
    //     quantity: 1
    //   }
    // };
  }

  componentWillMount(): void {
    this.setState({
      product: this.props.product
    });
  }

  updatePrice = () => {
    const { priceNetto, quantity, vAT } = this.state.product;
    const brutto = priceNetto * (vAT / 100 + 1) * quantity;
    const product2 = this.state.product;
    product2.priceBrutto = brutto;
    this.setState(
      () => ({
        product: product2
      }),
      () => this.props.updateHandler(this.state.product)
    );
  };

  render() {
    const { updateHandler } = this.props;
    const { product } = this.state;

    const remove = () => {
      updateHandler(this.state.product, true);
    };

    const updateNetto = e => {
      e.persist();
      this.setState(prevState => {
        prevState.product.priceNetto = +e.target.value;
        return { product: prevState.product };
      }, this.updatePrice);
    };
    const updateQuantity = e => {
      e.persist();
      this.setState(prevState => {
        prevState.product.quantity = +e.target.value;
        return { product: prevState.product };
      }, this.updatePrice);
    };
    const updateVat = e => {
      e.persist();
      this.setState(prevState => {
        prevState.product.vAT = +e.target.value;
        return { product: prevState.product };
      }, this.updatePrice);
    };
    const updateName = e => {
      e.persist();
      this.setState(prevState => {
        prevState.product.name = e.target.value;
        return { product: prevState.product };
      }, this.updatePrice);
    };
    return (
      <Row>
        <Col md="3">
          <AvField type="text" name="city" value={product.name} onChange={updateName} />
        </Col>
        <Col md="2">
          <AvField type="number" name="city" value={product.priceNetto.toFixed(2)} onChange={updateNetto} />
        </Col>
        <Col md="2">
          <AvField type="number" name="city" value={product.quantity} onChange={updateQuantity} />
        </Col>
        <Col md="2">
          <AvField type="text" name="city" value={product.priceBrutto.toFixed(2)} disabled />
        </Col>
        <Col md="2">
          <AvInput type="select" name="city" value={product.vAT} onChange={updateVat}>
            <option value="23" key="0">
              23%
            </option>
            <option value="8" key="1">
              8%
            </option>
            <option value="5" key="2">
              5%
            </option>
            <option value="0" key="3">
              0%
            </option>
          </AvInput>
        </Col>
        <Col md="1">
          <PointerIcon icon={faTrashAlt} onClick={remove} />
        </Col>
      </Row>
    );
  }
}

export default InvoiceItem;
