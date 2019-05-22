import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './month-sum-up.reducer';
import { IMonthSumUp } from 'app/shared/model/month-sum-up.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMonthSumUpDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MonthSumUpDetail extends React.Component<IMonthSumUpDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { monthSumUpEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            MonthSumUp [<b>{monthSumUpEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="incomeSum">Income Sum</span>
            </dt>
            <dd>{monthSumUpEntity.incomeSum}</dd>
            <dt>
              <span id="expenseSum">Expense Sum</span>
            </dt>
            <dd>{monthSumUpEntity.expenseSum}</dd>
            <dt>
              <span id="socialInsurance">Social Insurance</span>
            </dt>
            <dd>{monthSumUpEntity.socialInsurance}</dd>
            <dt>
              <span id="healthContribution">Health Contribution</span>
            </dt>
            <dd>{monthSumUpEntity.healthContribution}</dd>
            <dt>
              <span id="fundWord">Fund Word</span>
            </dt>
            <dd>{monthSumUpEntity.fundWord}</dd>
            <dt>
              <span id="zUSsum">Z U Ssum</span>
            </dt>
            <dd>{monthSumUpEntity.zUSsum}</dd>
            <dt>
              <span id="incomeTax">Income Tax</span>
            </dt>
            <dd>{monthSumUpEntity.incomeTax}</dd>
            <dt>Company</dt>
            <dd>{monthSumUpEntity.company ? monthSumUpEntity.company.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/month-sum-up" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/month-sum-up/${monthSumUpEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ monthSumUp }: IRootState) => ({
  monthSumUpEntity: monthSumUp.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthSumUpDetail);
