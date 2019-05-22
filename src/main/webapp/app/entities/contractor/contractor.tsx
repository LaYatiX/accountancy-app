import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './contractor.reducer';
import { IContractor } from 'app/shared/model/contractor.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContractorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Contractor extends React.Component<IContractorProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { contractorList, match } = this.props;
    return (
      <div>
        <h2 id="contractor-heading">
          Contractors
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Contractor
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Company Name</th>
                <th>Short Name</th>
                <th>Name</th>
                <th>Postal Code</th>
                <th>City</th>
                <th>N IP</th>
                <th>Phone</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {contractorList.map((contractor, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${contractor.id}`} color="link" size="sm">
                      {contractor.id}
                    </Button>
                  </td>
                  <td>{contractor.companyName}</td>
                  <td>{contractor.shortName}</td>
                  <td>{contractor.name}</td>
                  <td>{contractor.postalCode}</td>
                  <td>{contractor.city}</td>
                  <td>{contractor.nIP}</td>
                  <td>{contractor.phone}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${contractor.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${contractor.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${contractor.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ contractor }: IRootState) => ({
  contractorList: contractor.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contractor);
