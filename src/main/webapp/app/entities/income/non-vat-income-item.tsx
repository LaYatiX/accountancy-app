import { IEntry } from 'app/shared/model/entry.model';
import React, { useState } from 'react';
import { Button, Col, Row, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SpaceBetweenCenter } from 'app/shared/layout/styled-components/styled';
import { Form, ListGroup } from 'react-bootstrap';
import { AvField, AvInput } from 'availity-reactstrap-validation';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export function NonVatIncomeItem(props: { entry: IEntry; updateHandler: Function }) {
  const [item, setItem] = useState(props.entry);
  const removeItem = () => {
    props.updateHandler(item, true);
  };
  const updateItemDesc = e => {
    setItem({ ...item, description: e.target.value });
    props.updateHandler(item);
  };

  const updateItemAmount = e => {
    const newItem = { ...item, amount: +e.target.value };
    setItem(newItem);
    props.updateHandler(newItem);
  };

  return (
    <ListGroup.Item>
      <Form>
        <Row key={item.id}>
          <Col md="7">
            <Form.Control type="text" name="city" value={item.description} onChange={updateItemDesc} />
          </Col>
          <Col md="4">
            <Form.Control type="number" name="city" value={item.amount + ''} onChange={updateItemAmount} />
          </Col>
          <Col md="1">
            <SpaceBetweenCenter>
              <Button onClick={removeItem} color="danger" size="sm">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </SpaceBetweenCenter>
          </Col>
        </Row>
      </Form>
    </ListGroup.Item>
  );
}
