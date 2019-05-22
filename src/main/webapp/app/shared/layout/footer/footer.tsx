import './footer.scss';

import React from 'react';
import { Col, Row } from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <div className="copyright text-center my-auto">
          <span>Copyright Grzegorz Piwosz © Price Admin {new Date().getFullYear()}</span>
        </div>
      </Col>
    </Row>
  </div>
);

export default Footer;
