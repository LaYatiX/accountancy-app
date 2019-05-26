import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faComment, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { getState } from 'app/entities/company/company.reducer';
import { HeaderButton } from 'app/shared/layout/styled-components/styled';
import { number } from 'prop-types';
import { IAppProps } from 'app/app';

export interface IHomeProp extends StateProps, DispatchProps {}
export interface IHomeState {
  monthIncome?: number;
  yearIncome?: number;
  toPay?: number;
  invoices?: number;
}

export class Home extends React.Component<IHomeProp, IHomeState> {
  componentDidMount() {
    this.props.getSession();
  }

  componentWillReceiveProps(nextProps: Readonly<IHomeProp>, nextContext: Readonly<IHomeProp>): void {
    if (nextProps.isAuthenticated && nextProps.workingCompany !== undefined && nextProps.workingCompany !== this.props.workingCompany) {
      const companyInvoices = nextProps.workingCompany.senders || [];
      const monthSumUp = nextProps.workingCompany.monthSumUps || [];

      this.setState(() => ({
        monthIncome: companyInvoices.reduce((previousValue, { totalBrutto }) => previousValue + totalBrutto, 0) || 0,
        yearIncome: companyInvoices.reduce((previousValue, { totalBrutto }) => previousValue + totalBrutto, 0) * 12 || 0,
        toPay: monthSumUp.expenseSum || 0,
        invoices: companyInvoices.length
      }));
    }
  }

  render() {
    const { account, workingCompany } = this.props;
    return (
      <div className={'container-fluid'}>
        <HeaderButton>Pracujesz w kontekście firmy: {workingCompany.companyName}</HeaderButton>
        <Row>
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Miesięczne zarobki</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">40,000 PLN</div>
                  </div>
                  <div className="col-auto">
                    <FontAwesomeIcon icon={faCalendar} size={'2x'} className={'text-gray-300'} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Roczne zarobki</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">215,000 PLN</div>
                  </div>
                  <div className="col-auto">
                    <FontAwesomeIcon icon={faDollarSign} size={'2x'} className={'text-gray-300'} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-danger shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">Pozostało do zapłaty w tym miesiącu</div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">20,000 PLN</div>
                      </div>
                      <div className="col">
                        <div className="progress progress-sm mr-2">
                          <div
                            className="progress-bar bg-danger"
                            role="progressbar"
                            style={{ width: '50%' }}
                            aria-valuenow={50}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <FontAwesomeIcon icon={faDollarSign} size={'2x'} className={'text-gray-300'} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Wystawione faktury</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                  </div>
                  <div className="col-auto">
                    <FontAwesomeIcon icon={faComment} size={'2x'} className={'text-gray-300'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  workingCompany: storeState.company.workingCompany
});

const mapDispatchToProps = { getSession, getState };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
