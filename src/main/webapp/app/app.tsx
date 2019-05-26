import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { hot } from 'react-hot-loader';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getEntities as getCompanies, setWorkingCompany } from 'app/entities/company/company.reducer';
import { getProfile } from 'app/shared/reducers/application-profile';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import Loadable from 'react-loadable';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import { AccountRoutes } from 'app/routes';
import SideNav from 'app/shared/layout/menus/side-nav';
import { Flex, Loading, VerticalSpacer } from 'app/shared/layout/styled-components/styled';
import AccountRoutesContainer from 'app/modules/login/account-routes-container';

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export interface IAppProps extends StateProps, DispatchProps {}
export interface IAppState {
  loaded: boolean;
}

// tslint:disable:space-in-parens
const MainRoutes = Loadable({
  loader: () => import(/* webpackChunkName: "mainroutes" */ 'app/routes'),
  loading: () => <Loading />
});

export class App extends React.Component<IAppProps, IAppState> {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.props.getSession();
    this.props.getProfile();
    this.props.getCompanies();
    this.setState(() => ({ loaded: true }));
  }

  componentWillReceiveProps(nextProps: Readonly<IAppProps>, nextContext: any): void {
    if (this.props.workingCompany && this.props.workingCompany.id === 0 && this.props.isAuthenticated && nextProps.companies.length > 0) {
      this.props.setWorkingCompany(nextProps.companies[0].id);
    }
    if (nextProps.isAuthenticated && nextProps.isAuthenticated !== this.props.isAuthenticated) {
      this.props.getCompanies();
    }
  }

  handleCompanyChange = (companyId: number) => {
    this.props.setWorkingCompany(companyId);
  };

  render() {
    return (
      <Router basename={baseHref}>
        <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
        {this.props.isAuthenticated && (
          <Flex>
            <SideNav />
            <div className="app-container">
              <ErrorBoundary>
                <Header
                  isAuthenticated={this.props.isAuthenticated}
                  isAdmin={this.props.isAdmin}
                  ribbonEnv={this.props.ribbonEnv}
                  isInProduction={this.props.isInProduction}
                  isSwaggerEnabled={this.props.isSwaggerEnabled}
                  user={this.props.user}
                  companies={this.props.companies}
                  workingCompany={this.props.workingCompany}
                  handleCompanyChange={this.handleCompanyChange}
                />
              </ErrorBoundary>
              <div className="container-fluid view-container" id="app-view-container">
                <Card className="jh-card">
                  <ErrorBoundary>
                    <MainRoutes />
                  </ErrorBoundary>
                </Card>
              </div>
              <VerticalSpacer />
              <Footer />
            </div>
          </Flex>
        )}
        {!this.props.isAuthenticated && (
          <ErrorBoundary>
            <AccountRoutesContainer>
              <AccountRoutes />
            </AccountRoutesContainer>
          </ErrorBoundary>
        )}
        {/*{!this.state.loaded && <Spinner animation="border" variant="primary" />}*/}
      </Router>
    );
  }
}

const mapStateToProps = ({ authentication, applicationProfile, company }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled,
  companies: company.entities,
  workingCompany: company.workingCompany,
  user: authentication.account
});

const mapDispatchToProps = { getSession, getProfile, getCompanies, setWorkingCompany };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(module)(App));
