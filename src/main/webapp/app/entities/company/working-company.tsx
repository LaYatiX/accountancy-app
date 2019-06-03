import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Col, Label, Row } from 'reactstrap';
import { AvFeedback, AvField, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { getState, setWorkingCompany, updateEntity } from './company.reducer';
// tslint:disable-next-line:no-unused-variable
import { EditOrUpdate, Loading } from 'app/shared/layout/styled-components/styled';
import { CompanyUpdateForm } from 'app/entities/company/company-update-form';

// tslint:disable-next-line:no-unused-variable

export interface IWorkingCompanyProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

// export interface ICompanyUpdateState {
// }

export class WorkingCompany extends React.Component<IWorkingCompanyProps> {
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
    // if (this.props.workingCompany.id !== 0 && nextProps.workingCompany !== this.props.workingCompany) {
    //   window.location.reload();
    // }
  }

  componentDidMount() {
    this.props.getState();
  }

  componentWillReceiveProps(nextProps: Readonly<IWorkingCompanyProps>, nextContext: any): void {}

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { workingCompany } = this.props;
      const entity = {
        ...workingCompany,
        ...values
      };
      this.props.setWorkingCompany(workingCompany.id);
      this.props.updateEntity(entity);
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/invoice');
  };

  render() {
    const { loading, updating, workingCompany } = this.props;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="accountancyApp.company.home.createOrEditLabel">
              <EditOrUpdate isNew={false} /> firmę
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? <Loading /> : <CompanyUpdateForm company={workingCompany} onSubmit={this.saveEntity} disabled={updating} />}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ company }) => ({
  workingCompany: company.workingCompany,
  loading: company.loading,
  updating: company.updating,
  updateSuccess: company.updateSuccess
});

const mapDispatchToProps = {
  updateEntity,
  getState,
  setWorkingCompany
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkingCompany);
