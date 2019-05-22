import React from 'react';
import { connect } from 'react-redux';

import './login.scss';
import { IRootState } from 'app/shared/reducers';
import { logout } from 'app/shared/reducers/authentication';
import { Redirect } from 'react-router';

export interface ILogoutProps extends StateProps, DispatchProps {
  idToken: string;
  logoutUrl: string;
}

export interface ILoginState {
  loaded: boolean;
}

export class Logout extends React.Component<ILogoutProps, ILoginState> {
  state: ILoginState = {
    loaded: true
  };

  componentDidMount() {
    this.props.logout();
  }

  componentDidUpdate() {
    this.setState({}, () => ({ loaded: true }));
  }

  render() {
    const logoutUrl = this.props.logoutUrl;
    const { loaded } = this.state;

    return <>{loaded && <Redirect to={'/'} />}</>;
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  logoutUrl: storeState.authentication.logoutUrl,
  idToken: storeState.authentication.idToken,
  redirect: false
});

const mapDispatchToProps = { logout };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
