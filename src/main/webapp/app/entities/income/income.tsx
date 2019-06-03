/* tslint:disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Alert, Button, Col, Row, Table } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
// tslint:disable-next-line:no-unused-variable
import { KeyboardDatePicker } from '@material-ui/pickers';
import { format } from 'date-fns';
import { getState } from 'app/entities/company/company.reducer';
import { getEntitiesCompany as getMonthSumUp } from 'app/entities/month-sum-up/month-sum-up.reducer';
import { updateEntity } from 'app/entities/income/income.reducer';
import { IIncome } from 'app/shared/model/income.model';
import { FlexRight, InlineFlex, Loading, PointerIcon } from 'app/shared/layout/styled-components/styled';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { IncomeItem } from 'app/entities/income/income-item';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NonVatIncomeItem } from 'app/entities/income/non-vat-income-item';

// tslint:disable-next-line:no-unused-variable

export interface IIncomeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IIncomeState {
  date: any;
  income: IIncome;
}

//.filter((inc) => inc.date == (format(new Date(a.getFullYear(), a.getMonth(), 1), 'yyyy-MM-dd').toString()))[0]
export class Income extends React.Component<IIncomeProps, IIncomeState> {
  constructor(props: Readonly<IIncomeProps>) {
    super(props);
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.state = {
      date: firstDay,
      income: {
        entries: []
      }
    };
  }

  componentDidMount() {
    this.props.getState();
    if (this.props.company) {
      this.props.getMonthSumUp(this.props.company.id, this.state.date);
    }
  }

  componentWillReceiveProps(nextProps: Readonly<IIncomeProps>, nextContext: any): void {
    if (nextProps.monthSumUp !== this.props.monthSumUp) {
      this.setState({
        income: nextProps.monthSumUp.incomes || { entries: [] }
      });
    }
    if (nextProps.company !== this.props.company && nextProps.company.id !== 0) {
      this.props.getMonthSumUp(nextProps.company.id, this.state.date);
    }
  }

  addProduct() {
    this.setState(prevState => {
      const incomecp = prevState.income;
      incomecp.entries = Array.from(
        prevState.income.entries.concat([
          { id: incomecp.entries.reduce((a, { id }) => (id > a ? id : a), 0) + 1, amount: 0, description: '', transient: true }
        ])
      );
      return {
        income: incomecp
      };
    });
  }

  render() {
    const {
      company,
      loading,
      monthSumUp: { incomes },
      updateEntity
    } = this.props;
    const { date, income } = this.state;

    const handleDateChange = a => {
      this.setState(
        () => ({
          date: a,
          income: incomes || { entries: [] }
        }),
        () => this.props.getMonthSumUp(this.props.company.id, this.state.date)
      );
    };

    const items =
      income &&
      income.entries
        .filter(el => el.invoice !== undefined && el.invoice !== null)
        .map(value => {
          return <IncomeItem entry={value} key={value.id} />;
        });
    //
    const updateNonVatItem = (item, toDelete) => {
      if (toDelete) {
        this.setState(prevState => ({
          income: {
            ...prevState.income,
            entries: prevState.income.entries.filter(el => el.id !== item.id)
          }
        }));
      } else {
        this.setState(prevState => ({
          income: {
            ...prevState.income,
            entries: income.entries.map(el => (el.id === item.id ? item : el))
          }
        }));
      }
    };

    const itemsNonVat =
      income &&
      income.entries
        .filter(el => el.invoice === undefined || el.invoice === null)
        .map(value => {
          return <NonVatIncomeItem entry={value} updateHandler={updateNonVatItem} key={value.id} />;
        });

    const addProduct = () => {
      this.addProduct();
    };

    const saveEntries = () => {
      this.state.income.entries.forEach(el => {
        if (el.invoice === undefined && el.transient) {
          el.id = null;
          return el;
        } else return el;
      });
      updateEntity({ ...this.state.income, monthSumUp: { id: this.props.monthSumUp.id } });
    };

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
        <p />
        <h2 id="income-heading">Przychody za miesiąc {format(date, 'MM/yyyy')}</h2>
        <h6>Firma: {company.companyName}</h6>
        {loading ? (
          <Loading />
        ) : (
          <>
            <p />
            <p />
            <InlineFlex>
              <h4>Przychody zafakturowane</h4>&nbsp;&nbsp;
              <Button tag={Link} to={`/entity/invoice/new`} color="primary" size="sm">
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </InlineFlex>
            {items && items.length > 0 ? (
              <Row>
                <Col md="12">
                  <Row>
                    <Col md="2">Data</Col>
                    <Col md="2">Nazwa faktury</Col>
                    <Col md="2">Kontrahent</Col>
                    <Col md="2">Przychód</Col>
                    <Col md="2">VAT</Col>
                    <Col md="2">Brutto</Col>
                  </Row>
                </Col>
                <Col md="12">
                  <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {items}
                  </ReactCSSTransitionGroup>
                </Col>
              </Row>
            ) : (
              <Alert color="warning">Brak wystawionych faktur w wybranym okresie</Alert>
            )}
            <p />
            <h4>
              Przychody niezafakturowane <PointerIcon icon={faPlus} onClick={addProduct} />
            </h4>
            {itemsNonVat && itemsNonVat.length > 0 ? (
              <Row>
                <Col md="12">
                  <Row>
                    <Col md="7">Opis zdarzenia gospodarczego</Col>
                    <Col md="4">Kwota</Col>
                    <Col md="1" />
                  </Row>
                </Col>
                <Col md="12">
                  <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {itemsNonVat}
                  </ReactCSSTransitionGroup>
                </Col>
              </Row>
            ) : (
              <Alert color="warning">Brak dodatkowych przychodów w wybranym okresie</Alert>
            )}
            <Row>
              <Col md="12">
                <p />
                <FlexRight>
                  <Button onClick={saveEntries} color="primary" size="sm">
                    Zapisz
                  </Button>
                </FlexRight>
              </Col>
            </Row>
          </>
        )}
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
)(Income);
