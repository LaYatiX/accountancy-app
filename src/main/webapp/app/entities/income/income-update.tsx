import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMonthSumUp } from 'app/shared/model/month-sum-up.model';
import { getEntities as getMonthSumUps } from 'app/entities/month-sum-up/month-sum-up.reducer';
import { getEntity, updateEntity, createEntity, reset } from './income.reducer';
import { IIncome } from 'app/shared/model/income.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIncomeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IIncomeUpdateState {
  isNew: boolean;
  monthSumUpId: string;
}

export class IncomeUpdate extends React.Component<IIncomeUpdateProps, IIncomeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      monthSumUpId: '0',
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

    this.props.getMonthSumUps();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { incomeEntity } = this.props;
      const entity = {
        ...incomeEntity,
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
    this.props.history.push('/entity/income');
  };

  render() {
    const { incomeEntity, monthSumUps, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="accountancyApp.income.home.createOrEditLabel">Create or edit a Income</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : incomeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="income-id">ID</Label>
                    <AvInput id="income-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dateLabel" for="income-date">
                    Date
                  </Label>
                  <AvField id="income-date" type="date" className="form-control" name="date" />
                </AvGroup>
                <AvGroup>
                  <Label for="income-monthSumUp">Month Sum Up</Label>
                  <AvInput id="income-monthSumUp" type="select" className="form-control" name="monthSumUp.id">
                    <option value="" key="0" />
                    {monthSumUps
                      ? monthSumUps.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/income" replace color="info">
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
  monthSumUps: storeState.monthSumUp.entities,
  incomeEntity: storeState.income.entity,
  loading: storeState.income.loading,
  updating: storeState.income.updating,
  updateSuccess: storeState.income.updateSuccess
});

const mapDispatchToProps = {
  getMonthSumUps,
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
)(IncomeUpdate);
