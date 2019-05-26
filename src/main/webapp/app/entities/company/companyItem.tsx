import { ICompany } from 'app/shared/model/company.model';
import { ListGroup, Card } from 'react-bootstrap';
import { Button, Col, Row, Table } from 'reactstrap';
import { ButtonBar, VerticalSpacer } from 'app/shared/layout/styled-components/styled';
import { Link, match } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export function CompanyItem(props: { company: ICompany; match: match<{ url: string }> }) {
  return (
    <Card className="border-left-primary">
      <Card.Body>
        <Card.Title>{props.company.companyName}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Krótka nazwa - {props.company.shortName}</ListGroup.Item>
          <ListGroup.Item>Adres - {props.company.name}</ListGroup.Item>
          <ListGroup.Item>Kod pocztowy {props.company.postalCode}</ListGroup.Item>
          <ListGroup.Item>Miasto - {props.company.city}</ListGroup.Item>
          <ListGroup.Item>NIP {props.company.nIP}</ListGroup.Item>
          <ListGroup.Item>Telefon kontaktowy - {props.company.phone}</ListGroup.Item>
        </ListGroup>
        <VerticalSpacer />
        <ButtonBar className="flex-btn-group-container">
          <Button tag={Link} to={`${props.match.url}/${props.company.id}/edit`} color="primary" size="sm" style={{ flex: '25' }}>
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edytuj</span>
          </Button>
          <Button tag={Link} to={`${props.match.url}/${props.company.id}/delete`} color="danger" size="sm">
            <FontAwesomeIcon icon="trash" />{' '}
          </Button>
        </ButtonBar>
      </Card.Body>
    </Card>
  );
}
