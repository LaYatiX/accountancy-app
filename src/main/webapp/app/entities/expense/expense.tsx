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
import { updateEntity } from 'app/entities/expense/expense.reducer';
import { IExpense } from 'app/shared/model/expense.model';
import { FlexRight, InlineFlex, Loading, PointerIcon } from 'app/shared/layout/styled-components/styled';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NonVatIncomeItem } from 'app/entities/income/non-vat-income-item';

export interface IExpenseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IExpenseState {
  date: any;
  expense: IExpense;
}

export class Expense extends React.Component<IExpenseProps, IExpenseState> {
  constructor(props: Readonly<IExpenseProps>) {
    super(props);
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.state = {
      date: firstDay,
      expense: {
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

  componentWillReceiveProps(nextProps: Readonly<IExpenseProps>, nextContext: any): void {
    if (nextProps.monthSumUp !== this.props.monthSumUp) {
      this.setState({
        expense: nextProps.monthSumUp.expenses || { entries: [] }
      });
    }
    if (nextProps.company !== this.props.company && nextProps.company.id !== 0) {
      this.props.getMonthSumUp(nextProps.company.id, this.state.date);
    }
  }

  addProduct() {
    this.setState(prevState => {
      const expensecp = prevState.expense;
      expensecp.entries = Array.from(
        prevState.expense.entries.concat([
          { id: expensecp.entries.reduce((a, { id }) => (id > a ? id : a), 0) + 1, amount: 0, description: '', transient: true }
        ])
      );
      return {
        expense: expensecp
      };
    });
  }

  render() {
    const {
      company,
      loading,
      monthSumUp: { expenses },
      updateEntity
    } = this.props;
    const { date, expense } = this.state;

    const handleDateChange = a => {
      this.setState(
        () => ({
          date: a,
          expense: expenses || { entries: [] }
        }),
        () => this.props.getMonthSumUp(this.props.company.id, this.state.date)
      );
    };

    const updateNonVatItem = (item, toDelete) => {
      if (toDelete) {
        this.setState(prevState => ({
          expense: {
            ...prevState.expense,
            entries: prevState.expense.entries.filter(el => el.id !== item.id)
          }
        }));
      } else {
        this.setState(prevState => ({
          expense: {
            ...prevState.expense,
            entries: expense.entries.map(el => (el.id === item.id ? item : el))
          }
        }));
      }
    };

    const itemsNonVat =
      expense &&
      expense.entries
        .filter(el => el.invoice === undefined || el.invoice === null)
        .map(value => {
          return <NonVatIncomeItem entry={value} updateHandler={updateNonVatItem} key={value.id} />;
        });

    const addProduct = () => {
      this.addProduct();
    };

    const saveEntries = () => {
      this.state.expense.entries.forEach(el => {
        if (el.invoice === undefined && el.transient) {
          el.id = null;
          return el;
        } else return el;
      });
      updateEntity({ ...this.props.monthSumUp.expenses, ...this.state.expense, monthSumUp: { id: this.props.monthSumUp.id } });
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
        <h2 id="expense-heading">Koszty za miesiąc {format(date, 'MM/yyyy')}</h2>
        <h6>Firma: {company.companyName}</h6>
        {loading ? (
          <Loading />
        ) : (
          <>
            <p />
            <h4>
              Lista przychodów <PointerIcon icon={faPlus} onClick={addProduct} />
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
)(Expense);
