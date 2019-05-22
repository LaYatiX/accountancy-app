import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IExpense } from 'app/shared/model/expense.model';
import { getEntities as getExpenses } from 'app/entities/expense/expense.reducer';
import { IIncome } from 'app/shared/model/income.model';
import { getEntities as getIncomes } from 'app/entities/income/income.reducer';
import { getEntity, updateEntity, createEntity, reset } from './entry.reducer';
import { IEntry } from 'app/shared/model/entry.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEntryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEntryUpdateState {
  isNew: boolean;
  expenseId: string;
  incomeId: string;
}

export class EntryUpdate extends React.Component<IEntryUpdateProps, IEntryUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      expenseId: '0',
      incomeId: '0',
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

    this.props.getExpenses();
    this.props.getIncomes();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { entryEntity } = this.props;
      const entity = {
        ...entryEntity,
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
    this.props.history.push('/entity/entry');
  };

  render() {
    const { entryEntity, expenses, incomes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="accountancyApp.entry.home.createOrEditLabel">Create or edit a Entry</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : entryEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="entry-id">ID</Label>
                    <AvInput id="entry-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="amountLabel" for="entry-amount">
                    Amount
                  </Label>
                  <AvField id="entry-amount" type="string" className="form-control" name="amount" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="entry-description">
                    Description
                  </Label>
                  <AvField id="entry-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label for="entry-expense">Expense</Label>
                  <AvInput id="entry-expense" type="select" className="form-control" name="expense.id">
                    <option value="" key="0" />
                    {expenses
                      ? expenses.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="entry-income">Income</Label>
                  <AvInput id="entry-income" type="select" className="form-control" name="income.id">
                    <option value="" key="0" />
                    {incomes
                      ? incomes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/entry" replace color="info">
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
  expenses: storeState.expense.entities,
  incomes: storeState.income.entities,
  entryEntity: storeState.entry.entity,
  loading: storeState.entry.loading,
  updating: storeState.entry.updating,
  updateSuccess: storeState.entry.updateSuccess
});

const mapDispatchToProps = {
  getExpenses,
  getIncomes,
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
)(EntryUpdate);
