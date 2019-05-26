import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './contractor.reducer';
import { ButtonBar, EqualHeightColumns, HeaderButton, Loading, VerticalSpacer } from 'app/shared/layout/styled-components/styled';
import { Card, Form, ListGroup } from 'react-bootstrap';
import { IContractor } from 'app/shared/model/contractor.model';

// tslint:disable-next-line:no-unused-variable

export interface IContractorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}
export interface IContractorState {
  contractorList: IContractor[];
}

export class Contractor extends React.Component<IContractorProps, IContractorState> {
  constructor(props: Readonly<IContractorProps>) {
    super(props);
    this.state = {
      contractorList: []
    };
  }

  componentDidMount() {
    this.props.getEntities();
  }

  componentWillReceiveProps(nextProps: Readonly<IContractorProps>, nextContext: any): void {
    if (nextProps.contractorList !== this.props.contractorList) {
      this.setState({
        contractorList: Array.from(nextProps.contractorList)
      });
    }
  }

  render() {
    const { match, loading } = this.props;
    const { contractorList } = this.state;

    const searchHandler = e => {
      const searchText = e.target.value;
      const list = Array.from(this.props.contractorList);
      this.setState(() => ({
        contractorList:
          searchText && list.length > 0 ? list.filter(value => value.companyName.toLowerCase().includes(searchText.toLowerCase())) : list
      }));
    };

    const items = contractorList.map((contractor, i) => (
      <Card className="border-left-primary" key={contractor.id}>
        <Card.Body>
          <Card.Title>{contractor.companyName}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>Krótka nazwa - {contractor.shortName}</ListGroup.Item>
            <ListGroup.Item>Adres - {contractor.name}</ListGroup.Item>
            <ListGroup.Item>Kod pocztowy {contractor.postalCode}</ListGroup.Item>
            <ListGroup.Item>Miasto - {contractor.city}</ListGroup.Item>
            <ListGroup.Item>NIP {contractor.nIP}</ListGroup.Item>
            <ListGroup.Item>Telefon kontaktowy - {contractor.phone}</ListGroup.Item>
          </ListGroup>
          <VerticalSpacer />
          <ButtonBar className="flex-btn-group-container">
            <Button tag={Link} to={`${match.url}/${contractor.id}/edit`} color="primary" size="sm" style={{ flex: '25' }}>
              <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edytuj</span>
            </Button>
            <Button tag={Link} to={`${match.url}/${contractor.id}/delete`} color="danger" size="sm">
              <FontAwesomeIcon icon="trash" />{' '}
            </Button>
          </ButtonBar>
        </Card.Body>
      </Card>
    ));

    return (
      <div>
        <HeaderButton id="contractor-heading">
          Kontrahenci
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Dodaj nowego kontrahenta
          </Link>
        </HeaderButton>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Wyszukaj produkt</Form.Label>
            <Form.Control type="text" placeholder="Wyszukaj kontrahentów" onChange={searchHandler} />
          </Form.Group>
        </Form>

        {loading ? (
          <Loading />
        ) : (
          <ReactCSSTransitionGroup
            component={EqualHeightColumns}
            transitionName="simple-fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {items}
          </ReactCSSTransitionGroup>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ contractor }: IRootState) => ({
  contractorList: contractor.entities,
  loading: contractor.loading
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
