import React from 'react';
import { Col, Row } from 'react-bootstrap';

const AccountRoutesContainer = ({ children }) => (
  <div className="container">
    <Row className={'justify-content-center'}>
      <Col xl={'10'} lg={'12'} md={'9'}>
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">{children}</div>
        </div>
      </Col>
    </Row>
  </div>
);

export default AccountRoutesContainer;
