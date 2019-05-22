import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICompanyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICompanyUpdateState {
  isNew: boolean;
}

export class CompanyUpdate extends React.Component<ICompanyUpdateProps, ICompanyUpdateState> {
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
      const { companyEntity } = this.props;
      const entity = {
        ...companyEntity,
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
    this.props.history.push('/entity/company');
  };

  render() {
    const { companyEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="accountancyApp.company.home.createOrEditLabel">Create or edit a Company</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : companyEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="company-id">ID</Label>
                    <AvInput id="company-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="companyNameLabel" for="company-companyName">
                    Company Name
                  </Label>
                  <AvField id="company-companyName" type="text" name="companyName" />
                </AvGroup>
                <AvGroup>
                  <Label id="shortNameLabel" for="company-shortName">
                    Short Name
                  </Label>
                  <AvField id="company-shortName" type="text" name="shortName" />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="company-name">
                    Name
                  </Label>
                  <AvField id="company-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="surnameLabel" for="company-surname">
                    Surname
                  </Label>
                  <AvField id="company-surname" type="text" name="surname" />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLabel" for="company-address">
                    Address
                  </Label>
                  <AvField id="company-address" type="text" name="address" />
                </AvGroup>
                <AvGroup>
                  <Label id="postalCodeLabel" for="company-postalCode">
                    Postal Code
                  </Label>
                  <AvField id="company-postalCode" type="text" name="postalCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="company-city">
                    City
                  </Label>
                  <AvField id="company-city" type="text" name="city" />
                </AvGroup>
                <AvGroup>
                  <Label id="nIPLabel" for="company-nIP">
                    N IP
                  </Label>
                  <AvField id="company-nIP" type="text" name="nIP" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="company-phone">
                    Phone
                  </Label>
                  <AvField id="company-phone" type="string" className="form-control" name="phone" />
                </AvGroup>
                <AvGroup>
                  <Label id="formOfTaxationLabel" for="company-formOfTaxation">
                    Form Of Taxation
                  </Label>
                  <AvField id="company-formOfTaxation" type="text" name="formOfTaxation" />
                </AvGroup>
                <AvGroup>
                  <Label id="vATpayerLabel" check>
                    <AvInput id="company-vATpayer" type="checkbox" className="form-control" name="vATpayer" />V A Tpayer
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="zUSeasyStartLabel" check>
                    <AvInput id="company-zUSeasyStart" type="checkbox" className="form-control" name="zUSeasyStart" />Z U Seasy Start
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="zUSmallLabel" check>
                    <AvInput id="company-zUSmall" type="checkbox" className="form-control" name="zUSmall" />Z U Small
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="zUSdiseaseLabel" check>
                    <AvInput id="company-zUSdisease" type="checkbox" className="form-control" name="zUSdisease" />Z U Sdisease
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="isZUSpayerLabel" check>
                    <AvInput id="company-isZUSpayer" type="checkbox" className="form-control" name="isZUSpayer" />
                    Is ZU Spayer
                  </Label>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/company" replace color="info">
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
  companyEntity: storeState.company.entity,
  loading: storeState.company.loading,
  updating: storeState.company.updating,
  updateSuccess: storeState.company.updateSuccess
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
)(CompanyUpdate);
