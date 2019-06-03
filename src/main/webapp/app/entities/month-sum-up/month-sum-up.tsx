import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { getEntitiesCompany as getMonthSumUp } from './month-sum-up.reducer';
// tslint:disable-next-line:no-unused-variable
import { KeyboardDatePicker } from '@material-ui/pickers';
import { IIncomeProps } from 'app/entities/income/income';
import { getState } from 'app/entities/company/company.reducer';
import { updateEntity } from 'app/entities/income/income.reducer';
import { IMonthSumUp } from 'app/shared/model/month-sum-up.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faDollarSign, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SumUpCard } from 'app/entities/month-sum-up/sum-up-card';
import { format } from 'date-fns';

// tslint:disable-next-line:no-unused-variable

export interface IMonthSumUpProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IMonthSumUpState {
  date: any;
  monthSumUp?: IMonthSumUp;
}

export class MonthSumUp extends React.Component<IMonthSumUpProps, IMonthSumUpState> {
  constructor(props: Readonly<IIncomeProps>) {
    super(props);
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.state = {
      date: firstDay
    };
  }

  componentDidMount() {
    this.props.getState();
    if (this.props.company) {
      this.props.getMonthSumUp(this.props.company.id, this.state.date);
    }
  }

  componentWillReceiveProps(nextProps: Readonly<IMonthSumUpProps>, nextContext: any): void {
    if (nextProps.monthSumUp !== this.props.monthSumUp) {
      this.setState({
        monthSumUp: nextProps.monthSumUp
      });
    }
    if (nextProps.company !== this.props.company && nextProps.company.id !== 0) {
      this.props.getMonthSumUp(nextProps.company.id, this.state.date);
    }
  }

  render() {
    const { monthSumUp, company } = this.props;
    const { date } = this.state;

    const handleDateChange = a => {
      this.setState(
        () => ({
          date: a
        }),
        () => this.props.getMonthSumUp(this.props.company.id, this.state.date)
      );
    };

    const monthIncome =
      (monthSumUp &&
        monthSumUp.incomes &&
        monthSumUp.incomes.entries.reduce(
          (previousValue, { amount, invoice }) => previousValue + (invoice !== null ? invoice.totalBrutto : amount),
          0
        )) ||
      0;
    const monthExpences =
      (monthSumUp &&
        monthSumUp.expenses &&
        monthSumUp.expenses.entries.reduce(
          (previousValue, { amount, invoice }) => previousValue + (invoice !== null ? invoice.totalBrutto : amount),
          0
        )) ||
      0;

    let tax = 0;
    if (company.formOfTaxation === 'LINEAR') {
      const diffrence = monthIncome - monthExpences;
      const step2 = diffrence - monthSumUp.socialInsurance;
      const step3 = step2 * 0.19;
      const step4 = step3 - (monthSumUp.healthContribution > 275.51 ? 275.51 : monthSumUp.healthContribution);
      tax = step4 > 0 ? step4 : 0;
    }
    if (company.formOfTaxation === 'COMMON') {
      const diffrence = monthIncome - monthExpences;
      const step2 = diffrence - monthSumUp.socialInsurance;
      let step3 = step2 * 0.18;
      if (diffrence > 85.528) {
        const subStep1 = 85.528 - diffrence;
        step3 += subStep1 * 0.32;
      }
      const step4 = step3 - (monthSumUp.healthContribution > 275.51 ? 275.51 : monthSumUp.healthContribution);
      tax = step4 > 0 ? step4 : 0;
    }
    if (company.formOfTaxation === 'LUPSUM') {
      if (monthSumUp && monthSumUp.incomes && monthSumUp.incomes.entries) {
        const income23 =
          monthSumUp.incomes.entries
            .filter(value => value.invoice !== null && value.invoice.products !== null)
            .reduce(
              (previousValue, { invoice }) =>
                previousValue +
                (invoice && invoice.products.filter(value => value.vAT === 23, [])).reduce(
                  (previousValue1, { priceBrutto }) => previousValue1 + priceBrutto,
                  0
                ),
              0
            ) || 0;
        const income8 =
          monthSumUp.incomes.entries
            .filter(value => value.invoice !== null && value.invoice.products !== null)
            .reduce(
              (previousValue, { invoice }) =>
                previousValue +
                (invoice && invoice.products.filter(value => value.vAT === 8, [])).reduce(
                  (previousValue1, { priceBrutto }) => previousValue1 + priceBrutto,
                  0
                ),
              0
            ) || 0;
        const income5 =
          monthSumUp.incomes.entries
            .filter(value => value.invoice !== null && value.invoice.products !== null)
            .reduce(
              (previousValue, { invoice }) =>
                previousValue +
                (invoice && invoice.products.filter(value => value.vAT === 5, [])).reduce(
                  (previousValue1, { priceBrutto }) => previousValue1 + priceBrutto,
                  0
                ),
              0
            ) || 0;
        const income0 =
          monthSumUp.incomes.entries
            .filter(value => value.invoice !== null && value.invoice.products !== null)
            .reduce(
              (previousValue, { invoice }) =>
                previousValue +
                (invoice && invoice.products.filter(value => value.vAT === 0, [])).reduce(
                  (previousValue1, { priceBrutto }) => previousValue1 + priceBrutto,
                  0
                ),
              0
            ) || 0;

        const incomesSum = income0 + income5 + income8 + income23;

        const ratioInsuracne23 = income23 - (monthSumUp.socialInsurance * income23) / incomesSum;
        const ratioInsuracne8 = income23 - (monthSumUp.socialInsurance * income8) / incomesSum;
        const ratioInsuracne5 = income23 - (monthSumUp.socialInsurance * income5) / incomesSum;
        const ratioInsuracne0 = income23 - (monthSumUp.socialInsurance * income0) / incomesSum;

        const tax23 = ratioInsuracne23 * 0.23;
        const tax8 = ratioInsuracne8 * 0.8;
        const tax5 = ratioInsuracne5 * 0.5;
        const tax0 = ratioInsuracne0;

        tax = monthIncome * 0.175;
        const taxSum = tax23 + tax8 + tax5 + tax0 - (monthSumUp.healthContribution > 275.51 ? 275.51 : monthSumUp.healthContribution);
      }
    }
    return (
      <div>
        <KeyboardDatePicker
          autoOk
          variant="inline"
          openTo="month"
          views={['year', 'month']}
          label="Miesiąc rozliczenia"
          format="MM/yyyy"
          value={date}
          onChange={handleDateChange}
        />
        <h2 id="month-sum-up-heading">Rozlicz okres</h2>

        <h4 id="month-sum-up-heading">Bilans otwarcia</h4>
        <Row>
          <Col md="6">
            <SumUpCard
              monthSumUp={monthSumUp}
              icon={faCalendar}
              color={'primary'}
              heading={'Miesięczne przychody'}
              text={monthIncome > 0 ? monthIncome.toFixed(2) : 'Brak przychdów'}
            />
          </Col>
          <Col md="6">
            <SumUpCard
              monthSumUp={monthSumUp}
              icon={faCalendar}
              color={'info'}
              heading={'Miesięczne koszty'}
              text={monthExpences > 0 ? monthExpences.toFixed(2) : 'Brak kosztów'}
            />
          </Col>
        </Row>
        <p />
        <h4 id="month-sum-up-heading">Zapłacone składki ZUS</h4>
        <Row>
          <Col md="3">
            <SumUpCard
              monthSumUp={monthSumUp}
              icon={faPlus}
              color={'info'}
              heading={'Ubezpieczenie społeczne'}
              text={monthSumUp.socialInsurance}
            />
          </Col>
          <Col md="3">
            <SumUpCard
              monthSumUp={monthSumUp}
              icon={faPlus}
              color={'info'}
              heading={'Składka zdrowotna'}
              text={monthSumUp.healthContribution}
            />
          </Col>
          <Col md="3">
            <SumUpCard monthSumUp={monthSumUp} icon={faPlus} color={'info'} heading={'Fundusz pracy'} text={monthSumUp.fundWord} />
          </Col>
          <Col md="3">
            <SumUpCard
              monthSumUp={monthSumUp}
              icon={faCalendar}
              color={'danger'}
              heading={`Składki za ${monthSumUp.month}`}
              text={monthSumUp.zUSsum}
            />
          </Col>
        </Row>
        <p />
        <h4 id="month-sum-up-heading">Zaliczka na podatek dochodowy</h4>
        <Row>
          <Col md="4">
            <SumUpCard monthSumUp={monthSumUp} icon={faPlus} color={'primary'} heading={'Przychody'} text={monthIncome.toFixed(2)} />
          </Col>
          <Col md="4">
            <SumUpCard monthSumUp={monthSumUp} icon={faPlus} color={'primary'} heading={'Koszty'} text={monthExpences.toFixed(2)} />
          </Col>
          <Col md="4">
            <SumUpCard monthSumUp={monthSumUp} icon={faDollarSign} color={'danger'} heading={'Podatek dochodowy'} text={tax.toFixed(2)} />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ monthSumUp, company }: IRootState) => ({
  monthSumUp: monthSumUp.entity,
  company: company.workingCompany,
  loading: company.loading
});

const mapDispatchToProps = {
  getMonthSumUp,
  getState,
  updateEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthSumUp);
