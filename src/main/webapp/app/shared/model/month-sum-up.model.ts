import { IExpense } from 'app/shared/model/expense.model';
import { IIncome } from 'app/shared/model/income.model';
import { ICompany } from 'app/shared/model/company.model';
import { Moment } from 'moment';

export interface IMonthSumUp {
  id?: number;
  month?: Moment;
  incomeSum?: number;
  expenseSum?: number;
  socialInsurance?: number;
  healthContribution?: number;
  fundWord?: number;
  zUSsum?: number;
  incomeTax?: number;
  expenses?: IExpense;
  incomes?: IIncome;
  company?: ICompany;
}

export const defaultValue: Readonly<IMonthSumUp> = {};
