import { IExpense } from 'app/shared/model/expense.model';
import { IIncome } from 'app/shared/model/income.model';

export interface IEntry {
  id?: number;
  amount?: number;
  description?: string;
  expense?: IExpense;
  income?: IIncome;
}

export const defaultValue: Readonly<IEntry> = {};
