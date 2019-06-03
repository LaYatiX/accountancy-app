import { IEntry } from 'app/shared/model/entry.model';
import React from 'react';
import { Button, Col, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SpaceBetweenCenter } from 'app/shared/layout/styled-components/styled';
import { ListGroup } from 'react-bootstrap';

export const IncomeItem = (props: { entry: IEntry }) => (
  <ListGroup.Item>
    <Row key={props.entry.id}>
      <Col md="2">{props.entry.invoice.documentDate}</Col>
      <Col md="2">{props.entry.invoice.number}</Col>
      <Col md="2">{props.entry.invoice.contractor && props.entry.invoice.contractor.shortName}</Col>
      <Col md="2">{props.entry.invoice.totalNetto} PLN</Col>
      <Col md="2">{props.entry.invoice.totalVat} PLN</Col>
      <Col md="2">
        <SpaceBetweenCenter>
          {props.entry.invoice.totalBrutto} PLN
          <Button tag={Link} to={`/entity/invoice/${props.entry.invoice.id}/edit`} color="primary" size="sm">
            <FontAwesomeIcon icon="pencil-alt" />
          </Button>
        </SpaceBetweenCenter>
      </Col>
    </Row>
  </ListGroup.Item>
);
