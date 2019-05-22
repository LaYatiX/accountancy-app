import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './contractor.reducer';
import { IContractor } from 'app/shared/model/contractor.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContractorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ContractorDetail extends React.Component<IContractorDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { contractorEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Contractor [<b>{contractorEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="companyName">Company Name</span>
            </dt>
            <dd>{contractorEntity.companyName}</dd>
            <dt>
              <span id="shortName">Short Name</span>
            </dt>
            <dd>{contractorEntity.shortName}</dd>
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{contractorEntity.name}</dd>
            <dt>
              <span id="postalCode">Postal Code</span>
            </dt>
            <dd>{contractorEntity.postalCode}</dd>
            <dt>
              <span id="city">City</span>
            </dt>
            <dd>{contractorEntity.city}</dd>
            <dt>
              <span id="nIP">N IP</span>
            </dt>
            <dd>{contractorEntity.nIP}</dd>
            <dt>
              <span id="phone">Phone</span>
            </dt>
            <dd>{contractorEntity.phone}</dd>
          </dl>
          <Button tag={Link} to="/entity/contractor" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/contractor/${contractorEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ contractor }: IRootState) => ({
  contractorEntity: contractor.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractorDetail);
