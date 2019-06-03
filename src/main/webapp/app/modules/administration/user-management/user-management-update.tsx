import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getUser, getRoles, updateUser, createUser, reset } from './user-management.reducer';
import { IRootState } from 'app/shared/reducers';
import { EditOrUpdate, Loading } from 'app/shared/layout/styled-components/styled';

export interface IUserManagementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {}

export interface IUserManagementUpdateState {
  isNew: boolean;
}

export class UserManagementUpdate extends React.Component<IUserManagementUpdateProps, IUserManagementUpdateState> {
  state: IUserManagementUpdateState = {
    isNew: !this.props.match.params || !this.props.match.params.login
  };

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getUser(this.props.match.params.login);
    }
    this.props.getRoles();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  saveUser = (event, values) => {
    if (this.state.isNew) {
      this.props.createUser(values);
    } else {
      this.props.updateUser(values);
    }
    this.handleClose();
  };

  handleClose = () => {
    this.props.history.push('/admin/user-management');
  };

  render() {
    const isInvalid = false;
    const { user, loading, updating, roles } = this.props;
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h1>
              <EditOrUpdate isNew={this.state.isNew} />
              &nbsp; użytkownika
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <Loading />
            ) : (
              <AvForm onValidSubmit={this.saveUser}>
                {user.id ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvField type="text" className="form-control" name="id" required readOnly value={user.id} />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label for="login">Login</Label>
                  <AvField
                    type="text"
                    className="form-control"
                    name="login"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: 'Your username is required.'
                      },
                      pattern: {
                        value: '^[_.@A-Za-z0-9-]*$',
                        errorMessage: 'Your username can only contain letters and digits.'
                      },
                      minLength: {
                        value: 1,
                        errorMessage: 'Your username is required to be at least 1 character.'
                      },
                      maxLength: {
                        value: 50,
                        errorMessage: 'Your username cannot be longer than 50 characters.'
                      }
                    }}
                    value={user.login}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="firstName">Imię</Label>
                  <AvField
                    type="text"
                    className="form-control"
                    name="firstName"
                    validate={{
                      maxLength: {
                        value: 50,
                        errorMessage: 'This field cannot be longer than 50 characters.'
                      }
                    }}
                    value={user.firstName}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="lastName">Nazwisko</Label>
                  <AvField
                    type="text"
                    className="form-control"
                    name="lastName"
                    validate={{
                      maxLength: {
                        value: 50,
                        errorMessage: 'This field cannot be longer than 50 characters.'
                      }
                    }}
                    value={user.lastName}
                  />
                  <AvFeedback>Pole nie może być dłuższe niż 50 znaków</AvFeedback>
                </AvGroup>
                <AvGroup>
                  <AvField
                    name="email"
                    label="Email"
                    placeholder={'Twój email'}
                    type="email"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: 'Email jest wymagany'
                      },
                      email: {
                        errorMessage: 'Nieprawidłowy mail'
                      },
                      minLength: {
                        value: 5,
                        errorMessage: 'Mail wymaga min 5 znaków'
                      },
                      maxLength: {
                        value: 254,
                        errorMessage: 'Mail nie może być dłuższy niż 50 znaków'
                      }
                    }}
                    value={user.email}
                  />
                </AvGroup>
                <AvGroup check>
                  <Label>
                    <AvInput type="checkbox" name="activated" value={user.activated} /> Aktywowano
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="authorities">Language Key</Label>
                  <AvInput type="select" className="form-control" name="authorities" value={user.authorities} multiple>
                    {roles.map(role => (
                      <option value={role} key={role}>
                        {role}
                      </option>
                    ))}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} to="/admin/user-management" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Wróć</span>
                </Button>
                &nbsp;
                <Button color="primary" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Zapisz
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
  user: storeState.userManagement.user,
  roles: storeState.userManagement.authorities,
  loading: storeState.userManagement.loading,
  updating: storeState.userManagement.updating
});

const mapDispatchToProps = { getUser, getRoles, updateUser, createUser, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementUpdate);
