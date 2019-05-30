import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Col, Label, Row } from 'reactstrap';
import { AvFeedback, AvField, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable

import { createEntity, getEntity, getState, reset, updateEntity } from './company.reducer';
// tslint:disable-next-line:no-unused-variable
import { EditOrUpdate, Loading } from 'app/shared/layout/styled-components/styled';
import { CompanyUpdateForm } from 'app/entities/company/company-update-form';

export interface ICompanyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICompanyUpdateState {
  isNew: boolean;
  isWorking: boolean;
}

export class CompanyUpdate extends React.Component<ICompanyUpdateProps, ICompanyUpdateState> {
  constructor(props) {
    super(props);
    const isWorkingCompanyMode = /working/.test(this.props.match.url);
    this.state = {
      isWorking: isWorkingCompanyMode,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
    // if (this.props.workingCompany.id !== 0 && nextProps.workingCompany !== this.props.workingCompany) {
    //   window.location.reload();
    // }
  }

  componentDidMount() {
    if (this.state.isNew && !this.state.isWorking) {
      // this.props.reset();
    } else if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    } else if (this.state.isWorking) {
      this.props.getState();
    }
  }

  componentWillReceiveProps(nextProps: Readonly<ICompanyUpdateProps>, nextContext: any): void {}

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { companyEntity } = this.props;
      const entity = {
        ...companyEntity,
        ...values
      };

      if (this.state.isNew && !this.state.isWorking) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/invoice');
  };

  render() {
    const { companyEntity, loading, updating, workingCompany } = this.props;
    const { isNew, isWorking } = this.state;

    return (
      <div>
        {isWorking}
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="accountancyApp.company.home.createOrEditLabel">
              <EditOrUpdate isNew={isNew && !isWorking} /> firmę
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <Loading />
            ) : (
              <CompanyUpdateForm
                company={isNew && !isWorking ? {} : isWorking ? workingCompany : companyEntity}
                onSubmit={this.saveEntity}
                disabled={updating}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ company }) => ({
  companyEntity: company.entity,
  workingCompany: company.workingCompany,
  loading: company.loading,
  updating: company.updating,
  updateSuccess: company.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  getState,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyUpdate);
