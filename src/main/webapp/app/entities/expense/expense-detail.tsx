import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './expense.reducer';
import { IExpense } from 'app/shared/model/expense.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExpenseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ExpenseDetail extends React.Component<IExpenseDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { expenseEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Expense [<b>{expenseEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="date">Date</span>
            </dt>
            <dd>
              <TextFormat value={expenseEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>Month Sum Up</dt>
            <dd>{expenseEntity.monthSumUp ? expenseEntity.monthSumUp.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/expense" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/expense/${expenseEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ expense }: IRootState) => ({
  expenseEntity: expense.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseDetail);
