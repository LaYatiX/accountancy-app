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
import { getEntity, updateEntity, createEntity, reset } from './expense.reducer';
import { IExpense } from 'app/shared/model/expense.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IExpenseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IExpenseUpdateState {
  isNew: boolean;
  monthSumUpId: string;
}

export class ExpenseUpdate extends React.Component<IExpenseUpdateProps, IExpenseUpdateState> {
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
      const { expenseEntity } = this.props;
      const entity = {
        ...expenseEntity,
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
    this.props.history.push('/entity/expense');
  };

  render() {
    const { expenseEntity, monthSumUps, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="accountancyApp.expense.home.createOrEditLabel">Create or edit a Expense</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : expenseEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="expense-id">ID</Label>
                    <AvInput id="expense-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dateLabel" for="expense-date">
                    Date
                  </Label>
                  <AvField id="expense-date" type="date" className="form-control" name="date" />
                </AvGroup>
                <AvGroup>
                  <Label for="expense-monthSumUp">Month Sum Up</Label>
                  <AvInput id="expense-monthSumUp" type="select" className="form-control" name="monthSumUp.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/expense" replace color="info">
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
  expenseEntity: storeState.expense.entity,
  loading: storeState.expense.loading,
  updating: storeState.expense.updating,
  updateSuccess: storeState.expense.updateSuccess
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
)(ExpenseUpdate);
