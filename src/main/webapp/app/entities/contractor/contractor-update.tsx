import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './contractor.reducer';
import { IContractor } from 'app/shared/model/contractor.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IContractorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IContractorUpdateState {
  isNew: boolean;
}

export class ContractorUpdate extends React.Component<IContractorUpdateProps, IContractorUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { contractorEntity } = this.props;
      const entity = {
        ...contractorEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/contractor');
  };

  render() {
    const { contractorEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="accountancyApp.contractor.home.createOrEditLabel">Create or edit a Contractor</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : contractorEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="contractor-id">ID</Label>
                    <AvInput id="contractor-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="companyNameLabel" for="contractor-companyName">
                    Company Name
                  </Label>
                  <AvField id="contractor-companyName" type="text" name="companyName" />
                </AvGroup>
                <AvGroup>
                  <Label id="shortNameLabel" for="contractor-shortName">
                    Short Name
                  </Label>
                  <AvField id="contractor-shortName" type="text" name="shortName" />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="contractor-name">
                    Name
                  </Label>
                  <AvField id="contractor-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="postalCodeLabel" for="contractor-postalCode">
                    Postal Code
                  </Label>
                  <AvField id="contractor-postalCode" type="text" name="postalCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="contractor-city">
                    City
                  </Label>
                  <AvField id="contractor-city" type="text" name="city" />
                </AvGroup>
                <AvGroup>
                  <Label id="nIPLabel" for="contractor-nIP">
                    N IP
                  </Label>
                  <AvField id="contractor-nIP" type="text" name="nIP" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="contractor-phone">
                    Phone
                  </Label>
                  <AvField id="contractor-phone" type="string" className="form-control" name="phone" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/contractor" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  contractorEntity: storeState.contractor.entity,
  loading: storeState.contractor.loading,
  updating: storeState.contractor.updating,
  updateSuccess: storeState.contractor.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractorUpdate);
