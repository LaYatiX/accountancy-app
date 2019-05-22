import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './month-sum-up.reducer';
import { IMonthSumUp } from 'app/shared/model/month-sum-up.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMonthSumUpProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class MonthSumUp extends React.Component<IMonthSumUpProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { monthSumUpList, match } = this.props;
    return (
      <div>
        <h2 id="month-sum-up-heading">
          Month Sum Ups
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Month Sum Up
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Income Sum</th>
                <th>Expense Sum</th>
                <th>Social Insurance</th>
                <th>Health Contribution</th>
                <th>Fund Word</th>
                <th>Z U Ssum</th>
                <th>Income Tax</th>
                <th>Company</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {monthSumUpList.map((monthSumUp, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${monthSumUp.id}`} color="link" size="sm">
                      {monthSumUp.id}
                    </Button>
                  </td>
                  <td>{monthSumUp.incomeSum}</td>
                  <td>{monthSumUp.expenseSum}</td>
                  <td>{monthSumUp.socialInsurance}</td>
                  <td>{monthSumUp.healthContribution}</td>
                  <td>{monthSumUp.fundWord}</td>
                  <td>{monthSumUp.zUSsum}</td>
                  <td>{monthSumUp.incomeTax}</td>
                  <td>{monthSumUp.company ? <Link to={`company/${monthSumUp.company.id}`}>{monthSumUp.company.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${monthSumUp.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${monthSumUp.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${monthSumUp.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ monthSumUp }: IRootState) => ({
  monthSumUpList: monthSumUp.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthSumUp);
