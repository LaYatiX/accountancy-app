import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Company extends React.Component<ICompanyProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { companyList, match } = this.props;
    return (
      <div>
        <h2 id="company-heading">
          Companies
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Company
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
                <th>Surname</th>
                <th>Address</th>
                <th>Postal Code</th>
                <th>City</th>
                <th>N IP</th>
                <th>Phone</th>
                <th>Form Of Taxation</th>
                <th>V A Tpayer</th>
                <th>Z U Seasy Start</th>
                <th>Z U Small</th>
                <th>Z U Sdisease</th>
                <th>Is ZU Spayer</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {companyList.map((company, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${company.id}`} color="link" size="sm">
                      {company.id}
                    </Button>
                  </td>
                  <td>{company.companyName}</td>
                  <td>{company.shortName}</td>
                  <td>{company.name}</td>
                  <td>{company.surname}</td>
                  <td>{company.address}</td>
                  <td>{company.postalCode}</td>
                  <td>{company.city}</td>
                  <td>{company.nIP}</td>
                  <td>{company.phone}</td>
                  <td>{company.formOfTaxation}</td>
                  <td>{company.vATpayer ? 'true' : 'false'}</td>
                  <td>{company.zUSeasyStart ? 'true' : 'false'}</td>
                  <td>{company.zUSmall ? 'true' : 'false'}</td>
                  <td>{company.zUSdisease ? 'true' : 'false'}</td>
                  <td>{company.isZUSpayer ? 'true' : 'false'}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${company.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${company.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${company.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ company }: IRootState) => ({
  companyList: company.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);