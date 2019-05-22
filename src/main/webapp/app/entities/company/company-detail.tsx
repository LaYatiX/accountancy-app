import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CompanyDetail extends React.Component<ICompanyDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { companyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Company [<b>{companyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="companyName">Company Name</span>
            </dt>
            <dd>{companyEntity.companyName}</dd>
            <dt>
              <span id="shortName">Short Name</span>
            </dt>
            <dd>{companyEntity.shortName}</dd>
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{companyEntity.name}</dd>
            <dt>
              <span id="surname">Surname</span>
            </dt>
            <dd>{companyEntity.surname}</dd>
            <dt>
              <span id="address">Address</span>
            </dt>
            <dd>{companyEntity.address}</dd>
            <dt>
              <span id="postalCode">Postal Code</span>
            </dt>
            <dd>{companyEntity.postalCode}</dd>
            <dt>
              <span id="city">City</span>
            </dt>
            <dd>{companyEntity.city}</dd>
            <dt>
              <span id="nIP">N IP</span>
            </dt>
            <dd>{companyEntity.nIP}</dd>
            <dt>
              <span id="phone">Phone</span>
            </dt>
            <dd>{companyEntity.phone}</dd>
            <dt>
              <span id="formOfTaxation">Form Of Taxation</span>
            </dt>
            <dd>{companyEntity.formOfTaxation}</dd>
            <dt>
              <span id="vATpayer">V A Tpayer</span>
            </dt>
            <dd>{companyEntity.vATpayer ? 'true' : 'false'}</dd>
            <dt>
              <span id="zUSeasyStart">Z U Seasy Start</span>
            </dt>
            <dd>{companyEntity.zUSeasyStart ? 'true' : 'false'}</dd>
            <dt>
              <span id="zUSmall">Z U Small</span>
            </dt>
            <dd>{companyEntity.zUSmall ? 'true' : 'false'}</dd>
            <dt>
              <span id="zUSdisease">Z U Sdisease</span>
            </dt>
            <dd>{companyEntity.zUSdisease ? 'true' : 'false'}</dd>
            <dt>
              <span id="isZUSpayer">Is ZU Spayer</span>
            </dt>
            <dd>{companyEntity.isZUSpayer ? 'true' : 'false'}</dd>
          </dl>
          <Button tag={Link} to="/entity/company" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/company/${companyEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ company }: IRootState) => ({
  companyEntity: company.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyDetail);
