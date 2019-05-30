import { Card, ListGroup } from 'react-bootstrap';
import { Button, Col, Row, Table } from 'reactstrap';
import { ButtonBar, VerticalSpacer } from 'app/shared/layout/styled-components/styled';
import { Link, match } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IInvoice } from 'app/shared/model/invoice.model';

export function InvoiceCard(props: { invoice: IInvoice; match: match<{ url: string }> }) {
  return (
    <Card className="border-left-primary">
      <Card.Body>
        <Card.Title>{props.invoice.name}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Sprzedający - {props.invoice.company.companyName}</ListGroup.Item>
          <ListGroup.Item>Kupujący - {props.invoice.contractor.companyName}</ListGroup.Item>
          <ListGroup.Item>Ilość produktów {props.invoice.products.length}</ListGroup.Item>
          <ListGroup.Item>Łącznie netto - {props.invoice.totalNetto}</ListGroup.Item>
          <ListGroup.Item>Łącznie brutto {props.invoice.totalBrutto}</ListGroup.Item>
          <ListGroup.Item>Data - {props.invoice.documentDate}</ListGroup.Item>
        </ListGroup>
        <VerticalSpacer />
        <ButtonBar className="flex-btn-group-container">
          <Button tag={Link} to={`${props.match.url}/${props.invoice.id}/edit`} color="primary" size="sm" style={{ flex: '25' }}>
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edytuj</span>
          </Button>
          <Button tag={Link} to={`${props.match.url}/${props.invoice.id}/delete`} color="danger" size="sm">
            <FontAwesomeIcon icon="trash" />{' '}
          </Button>
        </ButtonBar>
      </Card.Body>
    </Card>
  );
}
