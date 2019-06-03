import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './company.reducer';
import { HeaderButton, Loading } from 'app/shared/layout/styled-components/styled';
import { Form } from 'react-bootstrap';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyList } from 'app/entities/company/companyList';

export interface ICompanyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}
export interface ICompanyState {
  companyList: ICompany[];
}

export class Company extends React.Component<ICompanyProps, ICompanyState> {
  constructor(props: Readonly<ICompanyProps>) {
    super(props);
    this.state = {
      companyList: []
    };
  }

  componentDidMount() {
    this.props.getEntities();
  }

  componentWillReceiveProps(nextProps: Readonly<ICompanyProps>, nextContext: any): void {
    if (nextProps.companyList !== this.props.companyList) {
      this.setState({
        companyList: Array.from(nextProps.companyList)
      });
    }
  }

  render() {
    const { match, loading } = this.props;
    const { companyList } = this.state;

    const searchHandler = e => {
      const searchText = e.target.value;
      const list = Array.from(this.props.companyList);
      this.setState(() => ({
        companyList:
          searchText && list.length > 0 ? list.filter(value => value.companyName.toLowerCase().includes(searchText.toLowerCase())) : list
      }));
    };

    return (
      <div>
        <HeaderButton id="company-heading">
          Firmy
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Dodaj nową firmę współracującą
          </Link>
        </HeaderButton>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Wyszukaj firmę współpracującą</Form.Label>
            <Form.Control type="text" placeholder="Wyszukaj firmę współpracującą" onChange={searchHandler} />
          </Form.Group>
        </Form>

        {loading ? <Loading /> : <CompanyList companies={companyList} match={match} />}
      </div>
    );
  }
}

const mapStateToProps = ({ company }: IRootState) => ({
  companyList: company.entities,
  loading: company.loading
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
