import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { getEntity, updateEntity, createEntity, reset } from './month-sum-up.reducer';
import { IMonthSumUp } from 'app/shared/model/month-sum-up.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMonthSumUpUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMonthSumUpUpdateState {
  isNew: boolean;
  companyId: string;
}

export class MonthSumUpUpdate extends React.Component<IMonthSumUpUpdateProps, IMonthSumUpUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      companyId: '0',
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

    this.props.getCompanies();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { monthSumUpEntity } = this.props;
      const entity = {
        ...monthSumUpEntity,
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
    this.props.history.push('/entity/month-sum-up');
  };

  render() {
    const { monthSumUpEntity, companies, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="accountancyApp.monthSumUp.home.createOrEditLabel">Create or edit a MonthSumUp</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : monthSumUpEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="month-sum-up-id">ID</Label>
                    <AvInput id="month-sum-up-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="incomeSumLabel" for="month-sum-up-incomeSum">
                    Income Sum
                  </Label>
                  <AvField id="month-sum-up-incomeSum" type="string" className="form-control" name="incomeSum" />
                </AvGroup>
                <AvGroup>
                  <Label id="expenseSumLabel" for="month-sum-up-expenseSum">
                    Expense Sum
                  </Label>
                  <AvField id="month-sum-up-expenseSum" type="string" className="form-control" name="expenseSum" />
                </AvGroup>
                <AvGroup>
                  <Label id="socialInsuranceLabel" for="month-sum-up-socialInsurance">
                    Social Insurance
                  </Label>
                  <AvField id="month-sum-up-socialInsurance" type="string" className="form-control" name="socialInsurance" />
                </AvGroup>
                <AvGroup>
                  <Label id="healthContributionLabel" for="month-sum-up-healthContribution">
                    Health Contribution
                  </Label>
                  <AvField id="month-sum-up-healthContribution" type="string" className="form-control" name="healthContribution" />
                </AvGroup>
                <AvGroup>
                  <Label id="fundWordLabel" for="month-sum-up-fundWord">
                    Fund Word
                  </Label>
                  <AvField id="month-sum-up-fundWord" type="string" className="form-control" name="fundWord" />
                </AvGroup>
                <AvGroup>
                  <Label id="zUSsumLabel" for="month-sum-up-zUSsum">
                    Z U Ssum
                  </Label>
                  <AvField id="month-sum-up-zUSsum" type="string" className="form-control" name="zUSsum" />
                </AvGroup>
                <AvGroup>
                  <Label id="incomeTaxLabel" for="month-sum-up-incomeTax">
                    Income Tax
                  </Label>
                  <AvField id="month-sum-up-incomeTax" type="string" className="form-control" name="incomeTax" />
                </AvGroup>
                <AvGroup>
                  <Label for="month-sum-up-company">Company</Label>
                  <AvInput id="month-sum-up-company" type="select" className="form-control" name="company.id">
                    <option value="" key="0" />
                    {companies
                      ? companies.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/month-sum-up" replace color="info">
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
  companies: storeState.company.entities,
  monthSumUpEntity: storeState.monthSumUp.entity,
  loading: storeState.monthSumUp.loading,
  updating: storeState.monthSumUp.updating,
  updateSuccess: storeState.monthSumUp.updateSuccess
});

const mapDispatchToProps = {
  getCompanies,
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
)(MonthSumUpUpdate);
